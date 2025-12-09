import {
  LocationAddress,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
  LocationLatitude,
  LocationLongitude,
} from './value-objects';
import { CityId } from '../city/value-objects';

interface LocationI {
  locationId: LocationId;
  city: CityId;
  address: LocationAddress;
  locationLat: LocationLatitude;
  locationLng: LocationLongitude;
  hotelId?: LocationHotelId;
  businessId?: LocationBusinessId;
}

export interface LocationResponse {
  id: string;
  city: string;
  address: string;
  locationLat: number;
  locationLng: number;
  hotelId: string | undefined;
  businessId: string | undefined;
}

export class Location implements LocationI {
  locationId: LocationId;
  city: CityId;
  address: LocationAddress;
  locationLat: LocationLatitude;
  locationLng: LocationLongitude;
  hotelId?: LocationHotelId;
  businessId?: LocationBusinessId;

  constructor(attr: LocationI) {
    this.locationId = attr.locationId;
    this.city = attr.city;
    this.address = attr.address;
    this.locationLat = attr.locationLat;
    this.locationLng = attr.locationLng;
    this.hotelId = attr.hotelId;
    this.businessId = attr.businessId;
  }

  toResponse(): LocationResponse {
    return {
      id: this.locationId.value,
      city: this.city.value,
      address: this.address.value,
      locationLat: this.locationLat.value,
      locationLng: this.locationLat.value,
      hotelId: this.hotelId?.value,
      businessId: this.businessId?.value,
    };
  }
}
