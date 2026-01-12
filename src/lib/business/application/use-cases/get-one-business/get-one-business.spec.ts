import { GetOneBusinessUseCase } from "./get-one-business";
import {
  BusinessNotFoundError,
  BusinessRepositoryPort,
} from "../../../../../lib/business/domain";
import { HttpError } from "../../../../../lib/Shared/domain";

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

describe("GetOneBusinessUseCase", () => {
  let repository: jest.Mocked<BusinessRepositoryPort>;
  let getOneBusiness: GetOneBusinessUseCase;

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

    getOneBusiness = new GetOneBusinessUseCase(repository);
  });

  it("should throw HttpError when neither id nor email is provided", async () => {
    await expect(getOneBusiness.execute({})).rejects.toThrow(HttpError);
  });

  it("should throw HttpError when both id and email are provided", async () => {
    await expect(
      getOneBusiness.execute({
        id: "biz-1",
        email: "business@test.com",
      })
    ).rejects.toThrow(HttpError);
  });

  it("should return business when id is provided", async () => {
    const business = mockBusiness("biz-1");

    repository.getOneById.mockResolvedValue(business as any);

    const result = await getOneBusiness.execute({
      id: "biz-1",
    });

    expect(repository.getOneById).toHaveBeenCalled();
    expect(result.bussinessId).toBe("biz-1");
    expect(result.email).toBe("business@test.com");
  });

  it("should return business when email is provided", async () => {
    const business = mockBusiness("biz-2");

    repository.getOneByEmail.mockResolvedValue(business as any);

    const result = await getOneBusiness.execute({
      email: "business@test.com",
    });

    expect(repository.getOneByEmail).toHaveBeenCalled();
    expect(result.bussinessId).toBe("biz-2");
  });

  it("should throw BusinessNotFoundError when business does not exist", async () => {
    repository.getOneById.mockResolvedValue(null);

    await expect(
      getOneBusiness.execute({
        id: "non-existent-id",
      })
    ).rejects.toThrow(HttpError);
  });
});
