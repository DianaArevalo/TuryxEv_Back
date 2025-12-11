import {
  City,
  LocationAddress,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
  LocationLatitude,
  LocationLongitude,
} from "../../domain/entities";
import { CityId, CityName } from "../../domain/entities/city/value-objects";
import { CitySchema, LocationSchema } from "../schemas";
import { connectTestDB, disconnectTestDB } from "../schemas/setup-test-db";
import { LocationRepositoryMongoAdapter } from "./location-repository.mongo.adapter";
import { Location } from "../../domain/entities/location/location";
import mongoose from "mongoose";
import { HttpError } from "~/lib/Shared/domain";

describe("LocationRepositoryMongoAdapter - Integration Tests", () => {
  jest.setTimeout(30000);
  let repository: LocationRepositoryMongoAdapter;

  beforeAll(async () => {
    await connectTestDB();
    repository = new LocationRepositoryMongoAdapter();
  });

  afterEach(async () => {
    await CitySchema.deleteMany({});
    await LocationSchema.deleteMany({});
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  test("createCity() should create and return a City entity", async () => {
    const cityName = new CityName("Medellín");

    const created = await repository.createCity(cityName);

    expect(created).toBeInstanceOf(City);
    expect(created.name.value).toBe("Medellín");

    const dbRecord = await CitySchema.findOne({ name: "Medellín" });
    expect(dbRecord).not.toBeNull();
  });

  test("createCity() catch should throw HttpError on unexpected DB error", async () => {
  jest.spyOn(CitySchema, "findOne").mockRejectedValueOnce(new Error("DB error"));

  await expect(repository.createCity(new CityName("Med")))
    .rejects
    .toThrow("Error creating city");

  jest.restoreAllMocks();
});


  test("getValidCities() should return a list of City entities", async () => {
    await CitySchema.create({
      name: "Bogotá",
      department: "Cundinamarca",
      country: "Colombia",
    });

    const result = await repository.getValidCities();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toBeInstanceOf(City);
    expect(result[0].name.value).toBe("Bogotá");
  });

  test("getValidCities() should return empty array when no cities exist", async () => {
    await CitySchema.deleteMany({});
    const cities = await repository.getValidCities();
    expect(cities).toEqual([]);
  });

  test("getValidCities() catch should throw HttpError on DB error", async () => {
    jest.spyOn(CitySchema, "find").mockRejectedValueOnce(new Error("DB fail"));

    await expect(repository.getValidCities()).rejects.toThrow(
      "Error fetching valid cities"
    );

    jest.restoreAllMocks();
  });

  test("create() should create and return a Location entity", async () => {
    const city = await CitySchema.create({
      name: "Cali",
      department: "Valle del Cauca",
      country: "Colombia",
    });

    const location = new Location({
      locationId: new LocationId("68f67207b0ad2a4097713774"),
      city: new CityId(String(city._id)),
      address: new LocationAddress("Calle 123"),
      locationLat: new LocationLatitude(6.25184),
      locationLng: new LocationLongitude(-75.56359),
      hotelId: new LocationHotelId(new mongoose.Types.ObjectId().toHexString()),
    });

    const created = await repository.create(location);

    expect(created).toBeInstanceOf(Location);
    expect(created.address.value).toBe("Calle 123");

    const dbRecord = await LocationSchema.findOne({ address: "Calle 123" });
    expect(dbRecord).not.toBeNull();
  });

  test("getLocationByHotel() should return a Location entity", async () => {
    const city = await CitySchema.create({
      name: "Cartagena",
      department: "Bolívar",
      country: "Colombia",
    });

    const hotelId = new mongoose.Types.ObjectId();
    const saved = await LocationSchema.create({
      city: city._id,
      address: "Centro histórico",
      lat: 10.0,
      lng: -75.0,
      hotelId,
    });

    const result = await repository.getLocationByHotel(
      new LocationHotelId(hotelId.toHexString())
    );

    expect(result).toBeInstanceOf(Location);
    expect(result.address.value).toBe("Centro histórico");
    expect(result.locationLat.value).toBe(10.0);
  });

  test("getLocationByHotel() catch should throw HttpError on unexpected DB error", async () => {
  jest.spyOn(LocationSchema, "findOne").mockRejectedValueOnce(new Error("DB fail"));

  const hotel = new LocationHotelId(new mongoose.Types.ObjectId().toString());

  await expect(repository.getLocationByHotel(hotel))
    .rejects
    .toThrow("Error fetching location by hotel");

  jest.restoreAllMocks();
});


  test("getLocationByBusiness() should return a Location entity", async () => {
    const city = await CitySchema.create({
      name: "Medellin",
      department: "Antioquía",
      country: "Colombia",
    });

    const businessId = new mongoose.Types.ObjectId();
    const saved = await LocationSchema.create({
      city: city._id,
      address: "Parque de los Pies Descalzos",
      lat: 6.244716,
      lng: -75.57477,
      businessId,
    });

    const result = await repository.getLocationByBusiness(
      new LocationBusinessId(businessId.toHexString())
    );

    expect(result).toBeInstanceOf(Location);
    expect(result.address.value).toBe("Parque de los Pies Descalzos");
    expect(result.locationLat.value).toBe(6.244716);
  });

  test("getLocationByBusiness() catch should throw HttpError on unexpected DB error", async () => {
  jest.spyOn(LocationSchema, "findOne").mockRejectedValueOnce(new Error("DB fail"));

  const business = new LocationBusinessId(new mongoose.Types.ObjectId().toString());

  await expect(repository.getLocationByBusiness(business))
    .rejects
    .toThrow("Error fetching location by business");

  jest.restoreAllMocks();
});


  test("getOneCityByName() should return null when not found", async () => {
    const city = await repository.getOneCityByName(new CityName("NoExiste"));
    expect(city).toBeNull();
  });

  test("getOneCityByName() catch should throw HttpError on DB error", async () => {
  jest.spyOn(CitySchema, "findOne").mockRejectedValueOnce(new Error("DB fail"));

  await expect(repository.getOneCityByName(new CityName("Test")))
    .rejects
    .toThrow("Error fetching city by name");

  jest.restoreAllMocks();
});


  test("isValidCity() should return true or false", async () => {
    await CitySchema.create({
      name: "Tunja",
      department: "Boyacá",
      country: "Colombia",
    });

    const exists = await repository.isValidCity(new CityName("Tunja"));
    const notExists = await repository.isValidCity(new CityName("Madrid"));

    expect(exists).toBe(true);
    expect(notExists).toBe(false);
  });

  test("isValidCity() catch should throw HttpError on DB error", async () => {
  jest.spyOn(CitySchema, "findOne").mockRejectedValueOnce(new Error("DB fail"));

  await expect(repository.isValidCity(new CityName("Medellín")))
    .rejects
    .toThrow("Error validating city");

  jest.restoreAllMocks();
});


  test("update() should update an existing Location and return the updated entity", async () => {
    const city = await CitySchema.create({
      name: "Envigado",
      department: "Antioquia",
      country: "Colombia",
    });

    // Crear ubicación inicial
    const hotelId = new mongoose.Types.ObjectId();
    const saved = await LocationSchema.create({
      city: city._id,
      address: "Antigua dirección",
      lat: 6.17,
      lng: -75.59,
      hotelId,
    });

    // Crear la entidad Location con nuevos valores
    const locationToUpdate = new Location({
      locationId: new LocationId(String(saved._id)),
      city: new CityId(String(city._id)),
      address: new LocationAddress("Nueva dirección actualizada"),
      locationLat: new LocationLatitude(6.1711),
      locationLng: new LocationLongitude(-75.5911),
      hotelId: new LocationHotelId(hotelId.toHexString()),
    });

    // Ejecutar update()
    const result = await repository.update(locationToUpdate);

    expect(result).toBeInstanceOf(Location);
    expect(result.address.value).toBe("Nueva dirección actualizada");

    const dbRecord = await LocationSchema.findById(saved._id);
    expect(dbRecord?.address).toBe("Nueva dirección actualizada");
  });

  test("update() should throw LocationNotFoundError when record does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    const city = await CitySchema.create({
      name: "Sabaneta",
      department: "Antioquia",
      country: "Colombia",
    });

    const location = new Location({
      locationId: new LocationId(fakeId),
      city: new CityId(String(city._id)),
      address: new LocationAddress("Dirección inexistente"),
      locationLat: new LocationLatitude(6.15),
      locationLng: new LocationLongitude(-75.58),
      hotelId: new LocationHotelId(new mongoose.Types.ObjectId().toHexString()),
    });

    await expect(repository.update(location)).rejects.toThrow(
      "Error updating location"
    );
  });

  test("update() should throw HttpError on unexpected DB errors", async () => {
    const city = await CitySchema.create({
      name: "Itagüí",
      department: "Antioquia",
      country: "Colombia",
    });

    const saved = await LocationSchema.create({
      city: city._id,
      address: "Dirección temporal",
      lat: 6.165,
      lng: -75.61,
    });

    // --- MOCK DEL ERROR DE MONGOOSE (EVITA VALIDACIONES INTERNAS) ---
    jest
      .spyOn(LocationSchema, "findByIdAndUpdate")
      .mockImplementationOnce(() => {
        throw new Error("Mongo explosion");
      });

    const location = new Location({
      locationId: new LocationId(String(saved._id)),
      city: new CityId(String(city._id)),
      address: new LocationAddress("Dirección nueva"),
      locationLat: new LocationLatitude(6.1651),
      locationLng: new LocationLongitude(-75.6111),
      hotelId: new LocationHotelId(new mongoose.Types.ObjectId().toHexString()),
    });

    await expect(repository.update(location)).rejects.toThrow(
      "Error updating location"
    );

    jest.restoreAllMocks();
  });

  test("create() should throw HttpError on unexpected DB error", async () => {
    jest
      .spyOn(LocationSchema, "create")
      .mockRejectedValueOnce(new Error("Mongo fail"));

    const location = new Location({
      locationId: new LocationId(new mongoose.Types.ObjectId().toString()),
      city: new CityId(new mongoose.Types.ObjectId().toString()),
      address: new LocationAddress("Dirección X"),
      locationLat: new LocationLatitude(6.2),
      locationLng: new LocationLongitude(-75.5),
      hotelId: new LocationHotelId(new mongoose.Types.ObjectId().toString()),
    });

    await expect(repository.create(location)).rejects.toThrow(
      "Error creating location"
    );
  });

  test("getOneLocation() should throw HttpError on unexpected DB error", async () => {
    jest
      .spyOn(LocationSchema, "findOne")
      .mockRejectedValueOnce(new Error("Boom DB"));

    const id = new LocationId(new mongoose.Types.ObjectId().toString());

    await expect(repository.getOneLocation(id)).rejects.toThrow(
      "Error fetching location"
    );

    jest.restoreAllMocks();
  });
});
