import { CityId } from "../city/value-objects";
import {
  LocationAddress,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
  LocationLatitude,
  LocationLongitude,
} from "./value-objects";

interface LocationI {
  locationId: LocationId;
  city: CityId;
  address: LocationAddress;
  locationLat: LocationLatitude;
  locationLng: LocationLongitude;
  hotelId?: LocationHotelId;
  businessId?: LocationBusinessId;
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
}
