import { CreateBusiness, EditBusiness } from "~/lib/bussiness/application";
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
  email: "info@business1.com",
  idRole: "BUSINESS",
  idPlan: "FREE",
  status: "OPEN",
  location: "Bogotá",
  providerData: "AUTHGOOGLE",
};

describe("Business/application/edit-business", () => {
  let repository: BusinessRepository;
  let locationRepository: LocationRepository;
  let createBusiness: CreateBusiness;
  let editBusiness: EditBusiness;
  let businessId: string;

  beforeEach(async () => {
    repository = new InMemoryBusinessRepository();
    locationRepository = new InMemoryLocationRepository();
    createBusiness = new CreateBusiness(repository, locationRepository);
    editBusiness = new EditBusiness(repository, locationRepository);
    businessId = (await createBusiness.handler(Business1)).bussinessId;
  });

  it("should edit a business", async () => {
    const edit = {
      businessId,
      name: "Business 2",
      password: "$uperPassword555",
      location: "Medellín",
      idPlan: "BASIC",
      score: 5,
      picture: "https://worldvectorlogo.com/es/logo/expressjs",
      status: "CLOSED",
    };

    const edited = await editBusiness.handler(edit);

    expect(edited.name).toBe("Business 2");
    expect(edited.location).toBe("Medellín");
    expect(edited.idPlan).toBe("BASIC");
    expect(edited.score).toBe(5);
    expect(edited.picture).toBe(
      "https://worldvectorlogo.com/es/logo/expressjs"
    );
  });

  it("should throw an error when location not exists", async () => {
    const edit = {
      businessId,
      location: "Any location",
    };

    await expect(editBusiness.handler(edit)).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw an error when businessId not found", async () => {
    const edit = {
      businessId: "id-not-found",
      name: "Business 2",
    };

    await expect(editBusiness.handler(edit)).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw an error when password is provided and provider isn't 'AUTH", async () => {
    const businessId = (await createBusiness.handler(Business2)).bussinessId;

    const edit = {
      businessId,
      password: "$uperPassword555",
    };

    await expect(editBusiness.handler(edit)).rejects.toBeInstanceOf(HttpError);
  });
});
