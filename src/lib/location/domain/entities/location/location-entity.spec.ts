import { CityId } from "../city/value-objects";
import { 
    LocationAddress, 
    LocationBusinessId, 
    LocationHotelId, 
    LocationId, 
    LocationLatitude, 
    LocationLongitude 
} from "./value-objects";
import { Location } from "./location";


describe("Location - Domain Entity", () => {
  let idVO: LocationId;
  let cityIdVO: CityId;
  let addressVO: LocationAddress;
  let latVO: LocationLatitude;
  let lngVO: LocationLongitude;
  let hotelIdVO: LocationHotelId;
  let businessIdVO: LocationBusinessId;

  beforeEach(() => {
    idVO = new LocationId("loc-123");
    cityIdVO = new CityId("city-999");
    addressVO = new LocationAddress("Cra 45 #10-20");
    latVO = new LocationLatitude(6.25184);
    lngVO = new LocationLongitude(-75.56359);
    hotelIdVO = new LocationHotelId("hotel-77");
    businessIdVO = new LocationBusinessId("business-55");
  });

  it("should create a valid Location entity from value objects", () => {
    const location = new Location({
      locationId: idVO,
      city: cityIdVO,
      address: addressVO,
      locationLat: latVO,
      locationLng: lngVO,
      hotelId: hotelIdVO,
      businessId: businessIdVO,
    });

    expect(location).toBeInstanceOf(Location);
    expect(location.locationId.value).toBe("loc-123");
    expect(location.city.value).toBe("city-999");
    expect(location.address.value).toBe("Cra 45 #10-20");
    expect(location.hotelId?.value).toBe("hotel-77");
    expect(location.businessId?.value).toBe("business-55");
  });

  it("should return a correct response object from toResponse()", () => {
  const location = new Location({
    locationId: idVO,
    city: cityIdVO,
    address: addressVO,
    locationLat: latVO,
    locationLng: lngVO,
    hotelId: hotelIdVO,
    businessId: businessIdVO,
  });

  const response = location.toResponse();

  expect(response).toEqual({
    id: "loc-123",
    city: "city-999",
    address: "Cra 45 #10-20",
    hotelId: "hotel-77",
    businessId: "business-55",
    lat: 6.25184,
    lng: -75.56359,
    ownerType: "HOTEL",
    ownerId: "hotel-77",
  });
});


  it("should handle optional hotelId and businessId when they are undefined", () => {
    const location = new Location({
      locationId: idVO,
      city: cityIdVO,
      address: addressVO,
      locationLat: latVO,
      locationLng: lngVO,
      hotelId: undefined,
      businessId: undefined,
    });

    const response = location.toResponse();

    expect(response.hotelId).toBeUndefined();
    expect(response.businessId).toBeUndefined();
  });

  it("should fail if one of the value objects is invalid (mocking invalid VO)", () => {
    const invalidAddress = {
      get value() {
        throw new Error("Invalid address");
      },
    };

    const location = new Location({
      locationId: idVO,
      city: cityIdVO,
      address: invalidAddress as any,
      locationLat: latVO,
      locationLng: lngVO,
      hotelId: hotelIdVO,
      businessId: businessIdVO,
    });

    expect(() => location.toResponse()).toThrow("Invalid address");
  });
});
