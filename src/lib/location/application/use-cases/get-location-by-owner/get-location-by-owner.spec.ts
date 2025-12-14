import { LocationRepositoryPort, LocationResponse } from "~/lib/location/domain";
import { GetLocationByOwnerUseCase } from "./get-location-by-owner";

describe("GetLocationByOwnerUseCase - Unit", () => {
  let repository: jest.Mocked<LocationRepositoryPort>;
  let useCase: GetLocationByOwnerUseCase;

  let hotelResponse: LocationResponse;
  let businessResponse: LocationResponse;

  beforeEach(() => {
    // Inicializar mocks del repositorio
    const partialRepo: Partial<jest.Mocked<LocationRepositoryPort>> = {
      getLocationByHotel: jest.fn(),
      getLocationByBusiness: jest.fn(),
    };
    repository = partialRepo as jest.Mocked<LocationRepositoryPort>;

    useCase = new GetLocationByOwnerUseCase(repository);

    // Datos reutilizables
    hotelResponse = {
      id: "1",
      address: "Hotel Address",
      city: "Medellín",
      lat: 10,
      lng: 20,
      ownerType: "HOTEL",
      ownerId: "h1",
      hotelId: "h1",
      businessId: undefined,
    };

    businessResponse = {
      id: "2",
      address: "Business Address",
      city: "Bogotá",
      lat: 5,
      lng: 6,
      ownerType: "BUSINESS",
      ownerId: "b1",
      hotelId: undefined,
      businessId: "b1",
    };
  });

  test("should get location by HOTEL id", async () => {
    const mockEntity = { toResponse: () => hotelResponse };
    repository.getLocationByHotel.mockResolvedValue(mockEntity as any);

    const result = await useCase.execute({
      ownerId: "h1",
      ownerType: "HOTEL",
    });

    expect(result).toEqual(hotelResponse);
  });

  test("should get location by BUSINESS id", async () => {
    const mockEntity = { toResponse: () => businessResponse };
    repository.getLocationByBusiness.mockResolvedValue(mockEntity as any);

    const result = await useCase.execute({
      ownerId: "b1",
      ownerType: "BUSINESS",
    });

    expect(result).toEqual(businessResponse);
  });
});
