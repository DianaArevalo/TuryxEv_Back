import {
  City,
  CityId,
  CityName,
  Location,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
  LocationNotFoundError,
  LocationRepositoryPort,
} from '../../domain';
import { LocationAlreadyExistsError } from '../../domain';

export class LocationRepositoryInMemoryAdapter
  implements LocationRepositoryPort
{
  cities: City[] = [];
  locations: Location[] = [];

  constructor() {
    ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'].forEach(
      (value, index) =>
        this.cities.push(
          new City({
            cityId: CityId.create(index.toString()),
            name: CityName.create(value),
          }),
        ),
    );
  }

  getValidCities(): Promise<City[]> {
    return Promise.resolve(this.cities);
  }

  getLocationByHotel(hotel: LocationHotelId): Promise<Location> {
    const location = this.locations.find(
      (location) => location.hotelId?.value === hotel.value,
    );

    if (!location) throw new LocationNotFoundError();
    return Promise.resolve(location);
  }

  getLocationByBusiness(business: LocationBusinessId): Promise<Location> {
    const location = this.locations.find(
      (location) => location.businessId?.value === business.value,
    );

    if (!location) throw new LocationNotFoundError();
    return Promise.resolve(location);
  }

  getOneLocation(locationId: LocationId): Promise<Location | null> {
    const location = this.locations.find(
      (location) => location.locationId.value === locationId.value,
    );

    return Promise.resolve(location || null);
  }

  getOneCity(cityId: CityId): Promise<City | null> {
    const city = this.cities.find((city) => city.cityId.value === cityId.value);
    return Promise.resolve(city || null);
  }

  getOneCityByName(cityName: CityName): Promise<City | null> {
    const city = this.cities.find(
      (city) => city.name.value.toLowerCase() === cityName.value.toLowerCase(),
    );
    return Promise.resolve(city || null);
  }

  async isValidCity(cityName: CityName): Promise<boolean> {
    const city = await this.getOneCityByName(cityName);
    return Promise.resolve(city ? true : false);
  }

  create(location: Location): Promise<Location> {
    location.locationId = new LocationId(location.address.value);

    if (location.businessId) {
      const record = this.locations.find(
        (lc) => lc.businessId?.value === location.businessId?.value,
      );

      if (record) throw new LocationAlreadyExistsError();
    }
    if (location.hotelId) {
      const record = this.locations.find(
        (lc) => lc.hotelId?.value === location.hotelId?.value,
      );
      if (record) throw new LocationAlreadyExistsError();
    }

    this.locations.push(location);

    return Promise.resolve(location);
  }

  async createCity(cityName: CityName): Promise<City> {
    let city = await this.getOneCityByName(cityName);

    if (!city) {
      city = new City({
        cityId: new CityId(cityName.value),
        name: cityName,
      });

      this.cities.push(city);
    }

    return Promise.resolve(city);
  }

  update(location: Location): Promise<Location> {
    const idx = this.locations.findIndex(
      (lc) => lc.locationId.value === location.locationId.value,
    );

    if (idx === -1) throw new LocationNotFoundError();

    this.locations[idx] = location;

    return Promise.resolve(location);
  }
}
