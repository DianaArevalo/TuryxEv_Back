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
} from '../../domain';
import { LocationAlreadyExistsError } from '../../domain/exceptions/already-exists-error';
import { LocationRepositoryPort } from '../../domain/ports';
import {
  ICityDocument,
  ILocationDocument,
  CitySchema,
  LocationSchema,
} from '../schemas';

import { HttpError } from '~/lib/Shared/domain';
import { mongoose as mg } from '~/lib/Shared/Infraestructure/External';

export class LocationRepositoryMongoAdapter implements LocationRepositoryPort {
  async getValidCities(): Promise<City[]> {
    try {
      const records = await CitySchema.find();
      return records.map((record) => this.createCityEntity(record));
    } catch {
      throw new HttpError('Error fetching valid cities', 500);
    }
  }

  async getLocationByHotel(hotel: LocationHotelId): Promise<Location> {
    try {
      const record = await LocationSchema.findOne({ hotelId: hotel.value });
      if (!record) throw new LocationNotFoundError();

      return this.createLocationEntity(record);
    } catch (error) {
      if (error instanceof LocationNotFoundError) throw error;

      throw new HttpError('Error fetching location by hotel', 500);
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

      throw new HttpError('Error fetching location by business', 500);
    }
  }

  async getOneLocation(locationId: LocationId): Promise<Location | null> {
    try {
      const record = await LocationSchema.findOne({ id: locationId.value });

      return record ? this.createLocationEntity(record) : null;
    } catch {
      throw new HttpError('Error fetching location', 500);
    }
  }

  async getOneCity(cityId: CityId): Promise<City | null> {
    try {
      const record = await CitySchema.findOne({ id: cityId.value });
      return record ? this.createCityEntity(record) : null;
    } catch {
      throw new HttpError('Error fetching city by name', 500);
    }
  }

  async getOneCityByName(cityName: CityName): Promise<City | null> {
    try {
      const record = await CitySchema.findOne({ name: cityName.value });
      return record ? this.createCityEntity(record) : null;
    } catch {
      throw new HttpError('Error fetching city by name', 500);
    }
  }

  async isValidCity(cityName: CityName): Promise<boolean> {
    try {
      const record = await CitySchema.findOne({ name: cityName.value });
      return !!record;
    } catch {
      throw new HttpError('Error validating city', 500);
    }
  }

  async create(location: Location): Promise<Location> {
    try {
      const validCity = await CitySchema.findById(location.city.value);
      if (!validCity) {
        throw new HttpError('Invalid city', 400);
      }

      if (location.businessId) {
        const exists = await LocationSchema.findOne({
          businessId: location.businessId.value,
        });
        if (exists) throw new LocationAlreadyExistsError();
      }

      if (location.hotelId) {
        const exists = await LocationSchema.findOne({
          hotelId: location.hotelId.value,
        });
        if (exists) throw new LocationAlreadyExistsError();
      }

      const record = await LocationSchema.create({
        city: new mg.Types.ObjectId(location.city.value),
        address: location.address.value,
        hotelId: new mg.Types.ObjectId(location.hotelId?.value),
        businessId: new mg.Types.ObjectId(location.businessId?.value),
      });

      return this.createLocationEntity(record);
    } catch (error) {
      if (error instanceof LocationAlreadyExistsError) throw error;
      throw new HttpError('Error creating location', 500);
    }
  }

  async createCity(cityName: CityName): Promise<City> {
    try {
      let record = await CitySchema.findOne({ name: cityName.value });

      if (!record) record = await CitySchema.create({ name: cityName.value });

      return this.createCityEntity(record);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError('Error creating city', 500);
    }
  }

  async update(location: Location): Promise<Location> {
    try {
      const record = await LocationSchema.findByIdAndUpdate(
        location.locationId.value,
        {
          city: new mg.Types.ObjectId(location.city.value),
          address: location.address.value,
        },
        { new: true },
      );

      if (!record) throw new LocationNotFoundError();

      return this.createLocationEntity(record);
    } catch (error) {
      if (error instanceof LocationNotFoundError) throw error;
      throw new HttpError('Error updating location', 500);
    }
  }

  private createCityEntity(record: ICityDocument) {
    return new City({
      cityId: new CityId(String(record._id)),
      name: new CityName(record.name),
    });
  }

  private createLocationEntity(record: ILocationDocument) {
    return new Location({
      locationId: new LocationId(String(record._id)),
      city: new CityId(record.city.toString()),
      address: new LocationAddress(record.address),
      businessId: record.businessId
        ? new LocationBusinessId(record.businessId)
        : undefined,
      hotelId: record.hotelId ? new LocationHotelId(record.hotelId) : undefined,
    });
  }
}
