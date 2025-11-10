import { CityId, CityName } from './value-objects';

interface CityI {
  cityId: CityId;
  name: CityName;
}

export class City implements CityI {
  cityId: CityId;
  name: CityName;

  constructor(attr: CityI) {
    this.cityId = attr.cityId;
    this.name = attr.name;
  }
}
