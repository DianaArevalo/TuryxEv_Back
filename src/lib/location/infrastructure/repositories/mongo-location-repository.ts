import {
  City,
  CityId,
  CityName,
  Location,
  LocationAddress,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
  LocationNotFoundError,
  LocationRepository,
} from "../../domain";
import CitySchema from "../models/city-model";
import LocationSchema from "../models/location-model";

export class MongoLocationRepository implements LocationRepository {
  async getValidCities(): Promise<City[]> {
    const records = await CitySchema.find();
    return records.map((record) => this.createCityEntity(record));
  }

  async getLocationByHotel(hotel: LocationHotelId): Promise<Location> {
    const record = await LocationSchema.findOne({ hotelId: hotel.value });

    if (!record)
      throw new LocationNotFoundError("Location not found for hotel");

    return this.createLocationEntity(record);
  }

  async getLocationByBusiness(business: LocationBusinessId): Promise<Location> {
    const record = await LocationSchema.findOne({ businessId: business.value });

    if (!record)
      throw new LocationNotFoundError("Location not found for business");

    return this.createLocationEntity(record);
  }

  async getOneLocation(locationId: LocationId): Promise<Location | null> {
    const record = await LocationSchema.findOne({ id: locationId.value });
    if (!record) return null;
    return this.createLocationEntity(record);
  }

  async getOneCityByName(cityName: CityName): Promise<City | null> {
    const record = await CitySchema.findOne({ name: cityName.value });
    if (!record) return null;
    return this.createCityEntity(record);
  }

  async isValidCity(cityName: CityName): Promise<boolean> {
    const record = await CitySchema.findOne({ name: cityName.value });
    if (!record) return false;
    return true;
  }

  async create(location: Location): Promise<Location> {
    const record = await LocationSchema.create({
      city: location.city.value,
      address: location.address.value,
      hotelId: location.hotelId?.value,
      businessId: location.businessId?.value,
    });

    return this.createLocationEntity(record);
  }

  async update(location: Location): Promise<Location> {
    const record = await LocationSchema.findByIdAndUpdate(
      location.city.value,
      {
        city: location.city.value,
        address: location.address.value,
      },
      { new: true }
    ).lean();

    if (!record) throw new LocationNotFoundError();

    return this.createLocationEntity(record);
  }

  private createCityEntity(record: any) {
    return new City({
      cityId: new CityId(String(record._id)),
      name: new CityName(record.name),
    });
  }

  private createLocationEntity(record: any) {
    return new Location({
      locationId: new LocationId(String(record._id)),
      city: new CityId(String(record.city)),
      address: new LocationAddress(record.address),
      businessId: record.businessId
        ? new LocationBusinessId(record.businessId)
        : undefined,
      hotelId: record.hotelId ? new LocationHotelId(record.hotelId) : undefined,
    });
  }
}
