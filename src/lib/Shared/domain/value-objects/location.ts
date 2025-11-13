import { NameValueObject } from './name';

export interface LocationValueObjectI {
  locationId?: string;
  cityId?: string;
  cityName: string;
  address: string;
}

export class LocationValueObject {
  constructor(readonly value: LocationValueObjectI) {}

  static create<T extends typeof LocationValueObject>(
    this: T,
    value: LocationValueObjectI,
  ): InstanceType<T> {
    NameValueObject.create(value.cityName);
    NameValueObject.create(value.address);

    return new LocationValueObject(value);
  }
}
