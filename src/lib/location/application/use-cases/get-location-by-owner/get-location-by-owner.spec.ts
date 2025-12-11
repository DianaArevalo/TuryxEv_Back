import { GetLocationByOwnerUseCase } from "./get-location-by-owner";
import { HttpError} from "../../../../Shared/domain";
import { LocationRepositoryPort, LocationResponse } from "../../../domain";


// 👇 Puedes ajustar paths si difieren en tu estructura

describe("GetLocationByOwnerUseCase - Unit", () => {
  let repository: jest.Mocked<LocationRepositoryPort>;
  let useCase: GetLocationByOwnerUseCase;

  beforeEach(() => {
    repository = {
      getLocationByHotel: jest.fn(),
      getLocationByBusiness: jest.fn(),
     
    } as unknown as jest.Mocked<LocationRepositoryPort>;

    useCase = new GetLocationByOwnerUseCase(repository);
  });

  test("should get location by HOTEL id", async () => {
    const mockResponse: LocationResponse = {
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

    // simulamos .toResponse() devolviendo mockResponse
    const mockEntity = { toResponse: () => mockResponse };

    repository.getLocationByHotel.mockResolvedValue(mockEntity as any);

    const result = await useCase.execute({
      ownerId: "h1",
      ownerType: "HOTEL",
    });

    expect(repository.getLocationByHotel).toHaveBeenCalledTimes(1);
    expect(repository.getLocationByHotel).toHaveBeenCalledWith(
      expect.anything() // LocationHotelId("h1")
    );

    expect(result).toEqual(mockResponse);
  });

  test("should get location by BUSINESS id", async () => {
    const mockResponse: LocationResponse = {
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

    // simulamos .toResponse()
    const mockEntity = { toResponse: () => mockResponse };

    repository.getLocationByBusiness.mockResolvedValue(mockEntity as any);

    const result = await useCase.execute({
      ownerId: "b1",
      ownerType: "BUSINESS",
    });

    expect(repository.getLocationByBusiness).toHaveBeenCalledTimes(1);
    expect(repository.getLocationByBusiness).toHaveBeenCalledWith(
      expect.anything() // LocationBusinessId("b1")
    );

    expect(result).toEqual(mockResponse);
  });

  test("should throw ValidationError for invalid ownerType", async () => {
    await expect(
      useCase.execute({
        ownerId: "123",
        ownerType: "INVALID",
      })
    ).rejects.toThrow(HttpError);
  });
});
