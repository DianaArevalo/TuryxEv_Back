import {
  CreateBusiness,
  GetOneBusinessByEmail,
  GetOneBusinessById,
} from "~/lib/bussiness/application";
import { BusinessRepository, LocationRepository } from "~/lib/bussiness/domain";
import { InMemoryBusinessRepository } from "~/lib/bussiness/infrastructure/repositories/business-in-memory-repository";
import { InMemoryLocationRepository } from "~/lib/bussiness/infrastructure/repositories/location-in-memory-repository";
import { HttpError } from "~/lib/Shared/domain/exeptions";

const Business1 = {
  name: "Business 1",
  email: "info@business1.com",
  idRole: "BUSINESS",
  idPlan: "FREE",
  status: "OPEN",
  password: "$uperPassword159",
  location: "Bogotá",
  providerData: "AUTH",
};

const Business2 = {
  name: "Business 2",
  email: "info@business2.com",
  idRole: "STAFF",
  idPlan: "PREMIUM",
  status: "OPEN",
  location: "Bogotá",
  providerData: "AUTHGOOGLE",
};

describe("Business/application/get-one-business-by-id", () => {
  let repository: BusinessRepository;
  let locationRepository: LocationRepository;
  let createBusiness: CreateBusiness;
  let getOneById: GetOneBusinessById;

  beforeEach(async () => {
    repository = new InMemoryBusinessRepository();
    locationRepository = new InMemoryLocationRepository();
    createBusiness = new CreateBusiness(repository, locationRepository);
    getOneById = new GetOneBusinessById(repository);

    await createBusiness.handler(Business1);
    await createBusiness.handler(Business2);
  });

  it("should get one business by id", async () => {
    const business = await getOneById.handler({
      id: "Business 2",
    });

    expect(business).toBeTruthy();
  });

  it("should throw error when id isn't found", async () => {
    await expect(
      getOneById.handler({
        id: "Business 3",
      })
    ).rejects.toBeInstanceOf(HttpError);
  });
});
