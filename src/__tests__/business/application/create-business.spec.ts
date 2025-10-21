import { CreateBusiness } from "~/lib/bussiness/application";
import { BusinessRepository, LocationRepository } from "~/lib/bussiness/domain";
import { InMemoryBusinessRepository } from "~/lib/bussiness/infrastructure/repositories/business-in-memory-repository";
import { InMemoryLocationRepository } from "~/lib/bussiness/infrastructure/repositories/location-in-memory-repository";
import { Limit, Page } from "~/lib/Shared/domain";
import { HttpError } from "~/lib/Shared/domain/exeptions";

describe("Business/application/create-business", () => {
  let repository: BusinessRepository;
  let locationRepository: LocationRepository;
  let createBusiness: CreateBusiness;

  beforeEach(() => {
    repository = new InMemoryBusinessRepository();
    locationRepository = new InMemoryLocationRepository();
    createBusiness = new CreateBusiness(repository, locationRepository);
  });

  it("should create a business and persist it", async () => {
    const props = {
      name: "Business 1",
      email: "info@business1.com",
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      password: "$uperPassword159",
      location: "Bogotá",
      providerData: "AUTH",
    };

    await createBusiness.handler(props);

    const businesess = await repository.getAll(new Page(1), new Limit(10));

    expect(businesess).toHaveLength(1);
  });

  it("should create a business when password is not provided", async () => {
    const props = {
      name: "Business 1",
      email: "info@business1.com",
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      location: "Bogotá",
      providerData: "AUTHGOOGLE",
    };

    await createBusiness.handler(props);

    const businesess = await repository.getAll(new Page(1), new Limit(10));

    expect(businesess).toHaveLength(1);
  });

  it("should create a business when picture is provided", async () => {
    const props = {
      name: "Business 1",
      email: "info@business1.com",
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      password: "$uperPassword159",
      location: "Bogotá",
      picture: "https://worldvectorlogo.com/es/logo/expressjs",
      providerData: "AUTH",
    };

    await createBusiness.handler(props);

    const businesess = await repository.getAll(new Page(1), new Limit(10));

    expect(businesess).toHaveLength(1);
  });

  it("should create business when plan is not provided", async () => {
    const props = {
      name: "Business 1",
      email: "info@business1.com",
      idRole: "BUSINESS",
      status: "OPEN",
      password: "$uperPassword159",
      location: "Bogotá",
      providerData: "AUTH",
    };

    const business = await createBusiness.handler(props);

    expect(business.idPlan).toBe("FREE");

    const businesess = await repository.getAll(new Page(1), new Limit(10));

    expect(businesess).toHaveLength(1);
  });

  it("should throw an error when a password is not provided and providerData is from 'AUTH'", async () => {
    const props = {
      name: "Business 1",
      email: "info@business1.com",
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      location: "Bogotá",
      providerData: "AUTH",
    };

    await expect(createBusiness.handler(props)).rejects.toBeInstanceOf(
      HttpError
    );
  });

  it("should throw an error when location is invalid", async () => {
    const props = {
      name: "Business 1",
      email: "info@business1.com",
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      password: "$uperPassword159",
      location: "Any location",
      providerData: "AUTH",
    };

    await expect(createBusiness.handler(props)).rejects.toBeInstanceOf(
      HttpError
    );
  });
});
