import { CreateBusiness, GetAllBusiness } from "~/lib/bussiness/application";
import { BusinessRepository, LocationRepository } from "~/lib/bussiness/domain";
import { InMemoryBusinessRepository } from "~/lib/bussiness/infrastructure/repositories/business-in-memory-repository";
import { InMemoryLocationRepository } from "~/lib/bussiness/infrastructure/repositories/location-in-memory-repository";

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
  email: "info@business1.com",
  idRole: "BUSINESS",
  idPlan: "FREE",
  status: "OPEN",
  location: "Bogotá",
  providerData: "AUTHGOOGLE",
};

describe("Business/application/get-all", () => {
  let repository: BusinessRepository;
  let locationRepository: LocationRepository;
  let createBusiness: CreateBusiness;
  let getAllBusiness: GetAllBusiness;

  beforeEach(async () => {
    repository = new InMemoryBusinessRepository();
    locationRepository = new InMemoryLocationRepository();
    createBusiness = new CreateBusiness(repository, locationRepository);
    getAllBusiness = new GetAllBusiness(repository);

    await createBusiness.handler(Business1);
    await createBusiness.handler(Business2);
  });

  it("should get all business", async () => {
    const business = await getAllBusiness.handler({
      page: 1,
      limit: 10,
    });

    expect(business).toHaveLength(2);
  });

  it("should get 1 business", async () => {
    const business = await getAllBusiness.handler({
      page: 2,
      limit: 1,
    });

    expect(business).toHaveLength(1);
  });
});
