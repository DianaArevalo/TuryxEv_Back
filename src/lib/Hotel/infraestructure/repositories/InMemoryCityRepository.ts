import { CityRepository, Hotel, HotelLocation } from "../../domain";

export class InMemoryCityRepository implements CityRepository {
  private readonly allowedCities = ["Bogotá", "Medellín", "Cali"];

   createCity(city: string): HotelLocation {
    // Si no existe, lo creamos (por ahora simplemente devolvemos el string)
    if (!this.allowedCities.includes(city)) {
      this.allowedCities.push(city);
    }
    return new HotelLocation(city);
  }


  async isValidCity(city: HotelLocation): Promise<boolean> {
    return this.allowedCities.includes(city.getValue());
  }

 

  async getValidCities(): Promise<HotelLocation[]> {
      return this.allowedCities.map((city) => new HotelLocation(city));
  }
}
