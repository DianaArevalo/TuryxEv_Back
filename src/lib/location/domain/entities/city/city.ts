import { CityCountry, CityDepartment, CityId, CityName } from "./value-objects";

interface CityI {
  cityId: CityId;
  name: CityName;
  department: CityDepartment;
  country: CityCountry;
}

export class City implements CityI {
  cityId: CityId;
  name: CityName;
  department: CityDepartment;
  country: CityCountry;

  constructor(attr: CityI) {
    this.cityId = attr.cityId;
    this.name = attr.name;
    this.department = attr.department;
    this.country = attr.country;
  }
}
