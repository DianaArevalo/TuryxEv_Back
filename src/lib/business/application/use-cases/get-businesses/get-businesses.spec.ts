import { GetBusinessesUseCase } from "./get-businesses";
import { BusinessRepositoryPort } from "../../../../../lib/business/domain";


const mockBusiness = (id = "biz-1") => ({
  bussinessId: { value: id },
  name: { value: "Business" },
  email: { value: "business@test.com" },
  status: { value: "OPEN" },

  toPublicResponse: () => ({
    bussinessId: id,
    name: "Business",
    email: "business@test.com",
    status: "OPEN",
  }),
});

describe("GetBusinessesUseCase", () => {
  let repository: jest.Mocked<BusinessRepositoryPort>;
  let getBusinesses: GetBusinessesUseCase;

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

    getBusinesses = new GetBusinessesUseCase(repository);

    
  });

  it("should return all businesses when no filters are provided", async () => {
    const businesses = [mockBusiness("1"), mockBusiness("2")];

    repository.getAll.mockResolvedValue(businesses as any);

    const result = await getBusinesses.execute({});

    expect(repository.getAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].bussinessId).toBe("1");
  });

  it("should return businesses filtered by plan", async () => {
    const businesses = [mockBusiness("1")];

    repository.getByPlan.mockResolvedValue(businesses as any);

    const result = await getBusinesses.execute({
      plan: "FREE",
    });

    expect(repository.getByPlan).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should return businesses filtered by providerData", async () => {
    const businesses = [mockBusiness("1")];

    repository.getByProvider.mockResolvedValue(businesses as any);

    const result = await getBusinesses.execute({
      providerData: "AUTH",
    });

    expect(repository.getByProvider).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should return businesses filtered by role", async () => {
    const businesses = [mockBusiness("1")];

    repository.getByRole.mockResolvedValue(businesses as any);

    const result = await getBusinesses.execute({
      role: "BUSINESS",
    });

    expect(repository.getByRole).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should return businesses filtered by status", async () => {
    const businesses = [mockBusiness("1")];

    repository.getByStatus.mockResolvedValue(businesses as any);

    const result = await getBusinesses.execute({
      status: "OPEN",
    });

    expect(repository.getByStatus).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });
});
