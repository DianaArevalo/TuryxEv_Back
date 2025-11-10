import { CityName, LocationRepository } from '../../domain';

interface CreateCityHandlerProps {
  name: string;
}

export class CreateCity {
  constructor(private readonly repository: LocationRepository) {}

  async handler(props: CreateCityHandlerProps) {
    return await this.repository.createCity(CityName.create(props.name));
  }
}
