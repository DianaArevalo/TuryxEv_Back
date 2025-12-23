import {
  City,
  LocationHotelId,
  Location,
  LocationBusinessId,
  LocationId,
  CityName,
  CityId,
  LocationAddress,
  LocationNotFoundError,
  CityDepartment,
  CityCountry,
  LocationLatitude,
  LocationLongitude,
} from "../../domain";
import { LocationRepositoryPort } from "../../domain/ports";
import {
  ICityDocument,
  ILocationDocument,
  CitySchema,
  LocationSchema,
} from "../schemas";

import { HttpError } from "../../../../lib/Shared/domain";
import { mongoose as mg } from "../../../Shared/Infraestructure/External";

export class LocationRepositoryMongoAdapter implements LocationRepositoryPort {
  async getValidCities(): Promise<City[]> {
    try {
      const records = await CitySchema.find();
      return records.map((record) => this.createCityEntity(record));
    } catch {
      throw new HttpError("Error fetching valid cities", 500);
    }
  }

  async getLocationByHotel(hotel: LocationHotelId): Promise<Location> {
    try {
      const record = await LocationSchema.findOne({ hotelId: hotel.value });
      if (!record) throw new LocationNotFoundError();

      return this.createLocationEntity(record);
    } catch (error) {
      if (error instanceof LocationNotFoundError) throw error;

      throw new HttpError("Error fetching location by hotel", 500);
    }
  }

  async getLocationByBusiness(business: LocationBusinessId): Promise<Location> {
    try {
      const record = await LocationSchema.findOne({
        businessId: business.value,
      });
      if (!record) throw new LocationNotFoundError();

      return this.createLocationEntity(record);
    } catch (error) {
      if (error instanceof LocationNotFoundError) throw error;

      throw new HttpError("Error fetching location by business", 500);
    }
  }

  async getOneLocation(locationId: LocationId): Promise<Location | null> {
  try {
    const record = await LocationSchema.findById(locationId.value);
    return record ? this.createLocationEntity(record) : null;
  } catch {
    throw new HttpError("Error fetching location", 500);
  }
}


  async getOneCityByName(cityName: CityName): Promise<City | null> {
    try {
      const record = await CitySchema.findOne({ name: cityName.value });
      return record ? this.createCityEntity(record) : null;
    } catch {
      throw new HttpError("Error fetching city by name", 500);
    }
  }

  async isValidCity(cityName: CityName): Promise<boolean> {
    try {
      const record = await CitySchema.findOne({ name: cityName.value });
      return !!record;
    } catch {
      throw new HttpError("Error validating city", 500);
    }
  }

  async create(location: Location): Promise<Location> {
  try {
    const record = await LocationSchema.create({
      city: new mg.Types.ObjectId(location.city.value),
      address: location.address.value,
      lat: location.locationLat.value,
      lng: location.locationLng.value,
      hotelId: location.hotelId
        ? new mg.Types.ObjectId(location.hotelId.value)
        : undefined,
      businessId: location.businessId
        ? new mg.Types.ObjectId(location.businessId.value)
        : undefined,
    });

    return this.createLocationEntity(record);
  } catch (error) {
    //console.log("REAL ERROR:", error); 
    throw new HttpError("Error creating location", 500);
  }
}


  async createCity(cityName: CityName): Promise<City> {
    try {
      const existing = await CitySchema.findOne({ name: cityName.value });
      if (existing) throw new HttpError("City already exists", 409);

      const record = await CitySchema.create({
        name: cityName.value,
        department: "Undefined",
        country: "Undefined",
      });
      return this.createCityEntity(record);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError("Error creating city", 500);
    }
  }

  async update(location: Location): Promise<Location> {
    try {
      
      const record = await LocationSchema.findByIdAndUpdate(
        location.locationId.value,
        {
          city: location.city.value,
          address: location.address.value,
        },
        { new: true }
      ).lean();

      if (!record) throw new LocationNotFoundError();
      return this.createLocationEntity(record);
    } catch (error) {
      if (error instanceof LocationNotFoundError) throw error;
      throw new HttpError("Error updating location", 500);
    }
  }

  private createCityEntity(record: ICityDocument) {
    return new City({
      cityId: new CityId(String(record._id)),
      name: new CityName(record.name),
      department: new CityDepartment(record.department),
      country: new CityCountry(record.country),
    });
  }

  private createLocationEntity(record: ILocationDocument) {
    return new Location({
      locationId: new LocationId(String(record._id)),
      city: new CityId(record.city.toString()),
      address: new LocationAddress(record.address),
      locationLat: new LocationLatitude(record.lat),
      locationLng: new LocationLongitude(record.lng),
      businessId: record.businessId
        ? new LocationBusinessId(record.businessId)
        : undefined,
      hotelId: record.hotelId ? new LocationHotelId(record.hotelId) : undefined,
    });
  }
}
