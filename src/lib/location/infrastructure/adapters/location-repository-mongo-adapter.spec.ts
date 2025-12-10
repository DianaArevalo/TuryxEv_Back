import {
  City,
  LocationAddress,
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

  test("getOneCityByName() should return null when not found", async () => {
    const city = await repository.getOneCityByName(new CityName("NoExiste"));
    expect(city).toBeNull();
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
});
