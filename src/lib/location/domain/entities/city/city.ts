import { CityId, CityName } from './value-objects';

interface CityI {
  cityId: CityId;
  name: CityName;
}

export interface CityResponse {
  id: string;
  name: string;
}

export class City implements CityI {
  cityId: CityId;
  name: CityName;

  constructor(attr: CityI) {
    this.cityId = attr.cityId;
    this.name = attr.name;
  }

  toResponse(): CityResponse {
    return {
      id: this.cityId.value,
      name: this.name.value,
    };
  }
}
