import { BusinessLocationServicePort } from "~/lib/business/domain/ports/driving/business-location-service-port";
import { BusinessRepositoryPort } from "../../../../../lib/business/domain";
import { EditBusinessUseCase } from "./edit-business";
import { HttpError } from "~/lib/Shared/domain";

let locationService: jest.Mocked<BusinessLocationServicePort>;

const mockBusiness = () => ({
  bussinessId: { value: "biz-123" },
  name: { value: "Business" },
  email: { value: "new@business.com" },
  providerData: { value: "AUTH" },
  idPlan: { value: "FREE" },
  score: { value: 1 },
  status: { value: "OPEN" },
  picture: undefined,
  password: undefined,

  toPrivateResponse: () => ({
    bussinessId: "biz-123",
    name: "Business",
    email: "new@business.com",
    status: "OPEN",
  }),
});

describe("EditBusinessUseCase", () => {
  let repository: jest.Mocked<BusinessRepositoryPort>;
  let edit: EditBusinessUseCase;

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

    locationService = {
      updateLocation: jest.fn().mockResolvedValue(undefined),
    } as jest.Mocked<BusinessLocationServicePort>;

    edit = new EditBusinessUseCase(repository, locationService);
  });

  it("should edit a business", async () => {
    const business = mockBusiness();

    repository.getOneById.mockResolvedValue(business as any);
    repository.edit.mockImplementation(async (b) => b);

    const result = await edit.execute({
      businessId: "biz-123",
      name: "Business",
      idPlan: "FREE",
      status: "OPEN",
      password: "BusinessPa$$w0rd",
      location: {
        locationId: "loc-123",
        cityName: "Bogotá",
        address: "Some address",
      },
      picture: "https://expressjs.com/images/favicon.png",
    });

    expect(repository.edit).toHaveBeenCalled();
    expect(result.bussinessId).toBe("biz-123");
  });

  it("should edit business successfully", async () => {
    const business = mockBusiness();

    repository.getOneById.mockResolvedValue(business as any);
    repository.edit.mockImplementation(async (b) => b);

    const result = await edit.execute({
      businessId: "biz-123",
      name: "Business Updated",
      password: "NewPassword123!",
      idPlan: "BASIC",
      score: 3,
      status: "CLOSED",
      picture: "https://image.png",
      location: {
        locationId: "loc-1",
        cityName: "Medellín",
        address: "Nueva dirección",
      },
    });

    expect(repository.edit).toHaveBeenCalled();
    expect(locationService.updateLocation).toHaveBeenCalled();
    expect(result.bussinessId).toBe("biz-123");
  });

  it("should edit business with minimal data", async () => {
    const business = mockBusiness();

    repository.getOneById.mockResolvedValue(business as any);
    repository.edit.mockImplementation(async (b) => b);

    const result = await edit.execute({
      businessId: "biz-123",
    });

    expect(repository.edit).toHaveBeenCalled();
    expect(result.bussinessId).toBe("biz-123");
  });

  it("should throw error when updating password with OAuth provider", async () => {
    const business = {
      ...mockBusiness(),
      providerData: { value: "AUTHGOOGLE" },
    };

    repository.getOneById.mockResolvedValue(business as any);

    await expect(
      edit.execute({
        businessId: "biz-123",
        password: "InvalidPassword!",
      })
    ).rejects.toThrow(HttpError);

    expect(repository.edit).not.toHaveBeenCalled();
  });

  it("should throw BusinessNotFoundError when business does not exist", async () => {
    repository.getOneById.mockResolvedValue(null);

    await expect(
      edit.execute({
        businessId: "not-found",
      })
    ).rejects.toThrow(HttpError);
  });
});
