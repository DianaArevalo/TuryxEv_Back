import { HttpError } from "../../../../../lib/Shared/domain";
import { BusinessRepositoryPort } from "../../../../../lib/business/domain";
import { CreateBusinessUseCase } from "./create-business";

describe("CreateBusinessUseCase", () => {
  let repository: jest.Mocked<BusinessRepositoryPort>;
  let create: CreateBusinessUseCase;

  beforeEach(() => {
    repository = {
      getAll: jest.fn(),
      getOneByEmail: jest.fn(),
      getOneById: jest.fn(),
      create: jest.fn(),
      edit: jest.fn(),
      softDelete: jest.fn(),
      getByPlan: jest.fn(),
      getByRole: jest.fn(),
      getByStatus: jest.fn(),
      getByProvider: jest.fn(),
    } as jest.Mocked<BusinessRepositoryPort>;

    create = new CreateBusinessUseCase(repository);
  });

  it("should create a business successfully", async () => {
    repository.getOneByEmail.mockResolvedValue(null);

    repository.create.mockImplementation(async (business) => business);

    const result = await create.execute({
      name: "Business",
      email: "new@business.com",
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      password: "BusinessPa$$w0rd",
      locationId: "loc-123",
      picture: "https://expressjs.com/images/favicon.png",
      providerData: "AUTH",
    });
    
    expect(repository.create).toHaveBeenCalled();

    expect(result.name).toBe("Business");
    expect(result.email).toBe("new@business.com");
    expect(result.status).toBe("OPEN");
  });

  it("should create a business without optional fields", async () => {
    repository.getOneByEmail.mockResolvedValue(null);
    repository.create.mockImplementation(async (business) => business);

    const result = await create.execute({
      name: "Business 2",
      email: "new2@business.com",
      idRole: "BUSINESS",
      status: "OPEN",
      locationId: "loc-456",
      providerData: "AUTHGOOGLE",
    });

    expect(result.picture).toBeUndefined();
  });

  it("should throw ValidationError when password is missing and provider is AUTH", async () => {
    repository.getOneByEmail.mockResolvedValue(null);

    await expect(
      create.execute({
        name: "Business",
        email: "new@business.com",
        idRole: "BUSINESS",
        status: "OPEN",
        locationId: "loc-789",
        providerData: "AUTH",
      })
    ).rejects.toThrow(HttpError);

    expect(repository.create).not.toHaveBeenCalled();
  });

  
});
