import {
  CreateBusiness,
  GetOneBusinessByEmail,
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

describe("Business/application/get-one-business-by-email", () => {
  let repository: BusinessRepository;
  let locationRepository: LocationRepository;
  let createBusiness: CreateBusiness;
  let getOneByEmail: GetOneBusinessByEmail;

  beforeEach(async () => {
    repository = new InMemoryBusinessRepository();
    locationRepository = new InMemoryLocationRepository();
    createBusiness = new CreateBusiness(repository, locationRepository);
    getOneByEmail = new GetOneBusinessByEmail(repository);

    await createBusiness.handler(Business1);
    await createBusiness.handler(Business2);
  });

  it("should get one business by email", async () => {
    const business = await getOneByEmail.handler({
      email: "info@business2.com",
    });

    expect(business).toBeTruthy();
  });

  it("should throw error when email is not found", async () => {
    await expect(
      getOneByEmail.handler({
        email: "info@business3.com",
      })
    ).rejects.toBeInstanceOf(HttpError);
  });
});
