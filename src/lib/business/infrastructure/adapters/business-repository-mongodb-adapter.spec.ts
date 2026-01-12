import { connect } from "http2";
import { BusinessRepositoryMongoAdapter } from "./business-repository.mongodb.adapter";
import {
  connectTestDB,
  disconnectTestDB,
} from "~/lib/location/infrastructure/schemas/setup-test-db";
import {
  CitySchema,
  LocationSchema,
} from "~/lib/location/infrastructure/schemas";
import { BusinessSchema } from "../schemas";
import {
  Business,
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,
  BusinessName,
  BusinessPlan,
  BusinessProviderData,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
} from "../../domain";
import mongoose from "mongoose";
import { LocationId } from "~/lib/location/domain";
import { LimitValueObject, PageValueObject } from "~/lib/Shared/domain";

describe("BusinessRepositoryMongoAdapter - Integration Tests", () => {
  jest.setTimeout(30000);
  let repository: BusinessRepositoryMongoAdapter;

  beforeAll(async () => {
    await connectTestDB();
    repository = new BusinessRepositoryMongoAdapter();
  });

  afterEach(async () => {
    await BusinessSchema.deleteMany({});
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  const createBusinessEntity = () => {
    const createdAt = BusinessCreatedAt.now();

    return new Business({
      bussinessId: new BusinessId(""),
      name: new BusinessName("Test Business"),
      email: new BusinessEmail("test@business.com"),
      score: BusinessScore.create(1),
      createdAt,
      updatedAt: BusinessUpdatedAt.now(createdAt),
      idRole: BusinessRole.create("BUSINESS"),
      idPlan: BusinessPlan.create("FREE"),
      status: BusinessStatus.create("OPEN"),
      providerData: BusinessProviderData.create("AUTH"),
      locationId: new LocationId(new mongoose.Types.ObjectId().toHexString()),
    });
  };

  // ---------------- CREATE ----------------
  test("create() should persist and return Business entity", async () => {
    const business = createBusinessEntity();

    const created = await repository.create(business);

    expect(created).toBeInstanceOf(Business);
    expect(created.bussinessId.value).toBeDefined();

    const dbRecord = await BusinessSchema.findOne({
      email: "test@business.com",
    });

    expect(dbRecord).not.toBeNull();
    expect(dbRecord?.name).toBe("Test Business");
  });

  test("create() should throw error on Mongo failure", async () => {
    jest
      .spyOn(BusinessSchema, "create")
      .mockRejectedValueOnce(new Error("Mongo fail"));

    await expect(repository.create(createBusinessEntity())).rejects.toThrow();

    jest.restoreAllMocks();
  });

  // ---------------- GET ONE ----------------
  test("getOneByEmail() should return Business entity", async () => {
    const created = await repository.create(createBusinessEntity());

    const found = await repository.getOneByEmail(
      new BusinessEmail("test@business.com")
    );

    expect(found).not.toBeNull();
    expect(found?.bussinessId.value).toBe(created.bussinessId.value);
  });

  test("getOneById() should return Business entity", async () => {
    const created = await repository.create(createBusinessEntity());

    const found = await repository.getOneById(created.bussinessId);

    expect(found).not.toBeNull();
    expect(found?.email.value).toBe("test@business.com");
  });

  test("getOneByEmail() should return null if not found", async () => {
    const result = await repository.getOneByEmail(
      new BusinessEmail("no@exists.com")
    );

    expect(result).toBeNull();
  });

  // ---------------- GET ALL ----------------
  test("getAll() should return paginated businesses", async () => {
    await repository.create(createBusinessEntity());
    await repository.create(
      new Business({
        ...createBusinessEntity(),
        email: new BusinessEmail("second@business.com"),
        name: new BusinessName("Second Business"),
      })
    );

    const result = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10)
    );

    expect(result.length).toBe(2);
    expect(result[0]).toBeInstanceOf(Business);
  });

  // ---------------- EDIT ----------------
  test("edit() should update an existing business", async () => {
    const created = await repository.create(createBusinessEntity());
     const createdAt = BusinessCreatedAt.now();

    const updatedBusiness = new Business({
      ...created,
      name: new BusinessName("Updated Name"),
      updatedAt: BusinessUpdatedAt.now(createdAt),
    });

    const updated = await repository.edit(updatedBusiness);

    expect(updated.name.value).toBe("Updated Name");

    const dbRecord = await BusinessSchema.findById(created.bussinessId.value);
    expect(dbRecord?.name).toBe("Updated Name");
  });

  test("edit() should throw error if business does not exist", async () => {
    const fakeBusiness = new Business({
      ...createBusinessEntity(),
      bussinessId: new BusinessId(new mongoose.Types.ObjectId().toHexString()),
    });

    await expect(repository.edit(fakeBusiness)).rejects.toThrow(
      "Business not found"
    );
  });

  // ---------------- SOFT DELETE ----------------
  test("softDelete() should set status to BLOCKED", async () => {
    const created = await repository.create(createBusinessEntity());

    await repository.softDelete(created.bussinessId);

    const dbRecord = await BusinessSchema.findById(created.bussinessId.value);
    expect(dbRecord?.status).toBe(2);
  });
});
