import { CityRepository, HotelLocation } from '../../domain';

export class InMemoryCityRepository implements CityRepository {
  private readonly allowedCities = ['Bogotá', 'Medellín', 'Cali'];

  createCity(city: string): HotelLocation {
    // Si no existe, lo creamos (por ahora simplemente devolvemos el string)
    if (!this.allowedCities.includes(city)) {
      this.allowedCities.push(city);
    }
    return new HotelLocation(city);
  }

  isValidCity(city: HotelLocation): Promise<boolean> {
    return Promise.resolve(this.allowedCities.includes(city.getValue()));
  }

  getValidCities(): Promise<HotelLocation[]> {
    return Promise.resolve(
      this.allowedCities.map((city) => new HotelLocation(city)),
    );
  }
}
