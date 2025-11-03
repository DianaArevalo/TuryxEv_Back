import {
  LocationAddress,
  LocationBusinessId,
  LocationCity,
  LocationHotelId,
  LocationId,
} from "./value-objects";

interface LocationI {
  locationId: LocationId;
  city: LocationCity;
  address: LocationAddress;
  hotelId?: LocationHotelId;
  businessId?: LocationBusinessId;
}

export class Location implements LocationI {
  locationId: LocationId;
  city: LocationCity;
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
}
