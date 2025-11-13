import { UpdateLocationUseCase } from "./update-location";
import {
  LocationRepositoryPort,
  LocationNotFoundError,
  City,
  LocationLatitude,
  LocationLongitude,
} from "../../../domain";
import { LocationId, CityName, LocationAddress, CityId, Location } from "../../../domain";
import { HttpError } from "~/lib/Shared/domain";

describe("UpdateLocationUseCase - Unit", () => {
  let repository: jest.Mocked<LocationRepositoryPort>;
  let useCase: UpdateLocationUseCase;
  let mockLocationEntity: Location;

  beforeEach(() => {
    // Crear mock del repositorio
    const partialRepo: Partial<jest.Mocked<LocationRepositoryPort>> = {
      getOneLocation: jest.fn(),
      isValidCity: jest.fn(),
      getOneCityByName: jest.fn(),
      update: jest.fn(),
    };
    repository = partialRepo as jest.Mocked<LocationRepositoryPort>;

    // Crear una entidad Location válida usando value objects
    mockLocationEntity = new Location({
      locationId: LocationId.create("loc123"),
      city: CityId.create("old-city-id"),
      address: LocationAddress.create("Old Address"),
      locationLat: new LocationLatitude(10.1),
      locationLng: new LocationLongitude(20.2),
    });

    useCase = new UpdateLocationUseCase(repository);
  });

  test("should update address when only address is provided", async () => {
    repository.getOneLocation.mockResolvedValue(mockLocationEntity);

    await useCase.execute({
      locationId: LocationId.create("loc123").value,
      address: LocationAddress.create("New Address").value,
    });

    expect(repository.getOneLocation).toHaveBeenCalledWith(
      expect.any(LocationId)
    );
    expect(mockLocationEntity.address.value).toBe("New Address");
    expect(repository.update).toHaveBeenCalledWith(mockLocationEntity);
  });

  test("should update city when cityName is provided and valid", async () => {
    repository.getOneLocation.mockResolvedValue(mockLocationEntity);
    repository.isValidCity.mockResolvedValue(true);

    // Mock de City
    const mockCity: Partial<City> = {
      cityId: CityId.create("new-city-id"),
    };
    repository.getOneCityByName.mockResolvedValue(mockCity as City);

    await useCase.execute({
      locationId: LocationId.create("loc123").value,
      cityName: CityName.create("Bogotá").value,
    });

    expect(repository.isValidCity).toHaveBeenCalledWith(expect.any(CityName));
    expect(repository.getOneCityByName).toHaveBeenCalledWith(
      expect.any(CityName)
    );
    expect(mockLocationEntity.city.value).toBe("new-city-id");
    expect(repository.update).toHaveBeenCalledWith(mockLocationEntity);
  });

  test("should throw when location does not exist", async () => {
    repository.getOneLocation.mockResolvedValue(null);

    await expect(
      useCase.execute({
        locationId: LocationId.create("loc123").value,
        address: LocationAddress.create("New Address").value,
      })
    ).rejects.toThrow(HttpError);
  });

  test("should throw when invalid cityName", async () => {
    repository.getOneLocation.mockResolvedValue(mockLocationEntity);
    repository.isValidCity.mockResolvedValue(false);

    await expect(
      useCase.execute({
        locationId: LocationId.create("loc123").value,
        cityName: CityName.create("InvalidCity").value,
      })
    ).rejects.toThrow(HttpError);
  });

  test("should throw when cityName is valid but getOneCityByName returns null", async () => {
    repository.getOneLocation.mockResolvedValue(mockLocationEntity);
    repository.isValidCity.mockResolvedValue(true);
    repository.getOneCityByName.mockResolvedValue(null);

    await expect(
      useCase.execute({
        locationId: LocationId.create("loc123").value,
        cityName: CityName.create("Medellín").value,
      })
    ).rejects.toThrow(HttpError);
  });
});
