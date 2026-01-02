import { SoftDeleteBusinessUseCase } from "./soft-delete-business";
import { BusinessRepositoryPort } from "../../../../../lib/business/domain";
import { BusinessId } from "../../../../../lib/business/domain";

describe("SoftDeleteBusinessUseCase", () => {
  let repository: jest.Mocked<BusinessRepositoryPort>;
  let softDeleteBusiness: SoftDeleteBusinessUseCase;

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

    softDeleteBusiness = new SoftDeleteBusinessUseCase(repository);
  });

  it("should call repository.softDelete with BusinessId", async () => {
    const businessId = "biz-123";

    repository.softDelete.mockResolvedValue(undefined);

    await softDeleteBusiness.execute({ id: businessId });

    expect(repository.softDelete).toHaveBeenCalledTimes(1);
    expect(repository.softDelete).toHaveBeenCalledWith(expect.any(BusinessId));

    const calledWith = repository.softDelete.mock.calls[0][0];
    expect(calledWith.value).toBe(businessId);
  });
});
