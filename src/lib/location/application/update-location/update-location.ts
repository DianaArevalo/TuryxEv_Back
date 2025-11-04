import {
  CityName,
  LocationAddress,
  LocationId,
  LocationNotFoundError,
  LocationRepository,
} from "../../domain";
import { CreateCity } from "../create-city/create-city";

interface UpdatelocationHandlerProps {
  locationId: string;
  cityName?: string;
  address?: string;
}

export class UpdateLocation {
  constructor(private readonly repository: LocationRepository) {}

  async handler(props: UpdatelocationHandlerProps) {
    const result = await this.repository.getOneLocation(
      new LocationId(props.locationId)
    );

    if (!result) throw new LocationNotFoundError();

    if (props.cityName) {
      const isValidCity = await this.repository.isValidCity(
        new CityName(props.cityName)
      );

      if (!isValidCity) throw new LocationNotFoundError();

      const city = await this.repository.getOneCityByName(
        new CityName(props.cityName)
      );

      if (!city) throw new LocationNotFoundError();

      result.city = city.cityId;
    }

    if (props.address) {
      result.address = LocationAddress.create(props.address);
    }

    await this.repository.update(result);
  }
}
