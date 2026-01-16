import { CityCountry, CityDepartment, CityId, CityName } from "./value-objects";

interface CityI {
  cityId: CityId;
  name: CityName;
  department: CityDepartment;
  country: CityCountry;
}

export interface CityResponse {
  id: string;
  name: string;
  department: string;
  country: string;
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

  toResponse(): CityResponse {
    return {
      id: this.cityId.value,
      name: this.name.value,
      department: this.department.value,
      country: this.country.value,
    };
  }
}
