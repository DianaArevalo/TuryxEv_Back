import { GetValidCitiesUseCase } from "./get-valid-citites";
import { LocationRepositoryPort, CityResponse } from "../../../domain";

describe("GetValidCitiesUseCase - Unit", () => {
  let repository: jest.Mocked<LocationRepositoryPort>;
  let useCase: GetValidCitiesUseCase;
  let mockCitiesResponse: CityResponse[];
  let mockEntities: { toResponse: () => CityResponse }[];

  beforeEach(() => {
    repository = {
      getValidCities: jest.fn(),
    } as unknown as jest.Mocked<LocationRepositoryPort>;

    useCase = new GetValidCitiesUseCase(repository);

    mockCitiesResponse = [
      {
        id: "1",
        name: "Bogotá",
        department: "Cundinamarca",
        country: "Colombia",
      },
      {
        id: "2",
        name: "Medellín",
        department: "Antioquia",
        country: "Colombia",
      },
    ];

    mockEntities = mockCitiesResponse.map((city) => ({
      toResponse: () => city,
    }));
  });

  test("should return a list of CityResponse", async () => {
    repository.getValidCities.mockResolvedValue(mockEntities as any);

    const result = await useCase.execute();

    expect(repository.getValidCities).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCitiesResponse);
  });
});
