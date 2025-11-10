import { ValidationError } from '../../../../../../lib/Shared/domain/exeptions';

export class HotelLocation {
  private readonly city: string;

  constructor(city: string) {
    this.city = city;
  }

  static create(city: string): HotelLocation {
    if (!city || city.trim().length === 0) {
      throw new ValidationError("The city can't be empty");
    }

    return new HotelLocation(city.trim());
  }

  //listado de ciudades en un menu desplegabe en el frontend

  getValue(): string {
    return this.city;
  }
}
