import {
  LocationAddress,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
} from './value-objects';
import { CityId } from '../city/value-objects';

interface LocationI {
  locationId: LocationId;
  city: CityId;
  address: LocationAddress;
  hotelId?: LocationHotelId;
  businessId?: LocationBusinessId;
}

export interface LocationResponse {
  id: string;
  city: string;
  address: string;
  hotelId: string | undefined;
  businessId: string | undefined;
}

export class Location implements LocationI {
  locationId: LocationId;
  city: CityId;
  address: LocationAddress;
  hotelId?: LocationHotelId;
  businessId?: LocationBusinessId;

  constructor(attr: LocationI) {
    this.locationId = attr.locationId;
    this.city = attr.city;
    this.address = attr.address;
    this.hotelId = attr.hotelId;
    this.businessId = attr.businessId;
  }

  toResponse(): LocationResponse {
    return {
      id: this.locationId.value,
      city: this.city.value,
      address: this.address.value,
      hotelId: this.hotelId?.value,
      businessId: this.businessId?.value,
    };
  }
}
