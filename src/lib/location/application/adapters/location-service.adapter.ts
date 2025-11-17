import { LocationServicePort } from '../../domain';
import {
  CreateLocationDTO,
  CreateLocationResponse,
  CreateLocationUseCase,
  EditLocationDTO,
  EditLocationUseCase,
} from '../use-cases';
import { GetPopulatedLocationByIdUseCase } from '../use-cases/get-populated-location-by-id/get-populated-location-by-id';

import { LocationValueObjectI } from '~/lib/Shared/domain';

interface LocationAdapterProps {
  createLocationUseCase: CreateLocationUseCase;
  editLocationUseCase: EditLocationUseCase;
  getPopulatedLocationByIdUseCase: GetPopulatedLocationByIdUseCase;
}

export class LocationServiceAdapter implements LocationServicePort {
  constructor(private readonly params: LocationAdapterProps) {}

  createLocation(props: CreateLocationDTO): Promise<CreateLocationResponse> {
    return this.params.createLocationUseCase.execute(props);
  }

  editLocation(props: EditLocationDTO) {
    return this.params.editLocationUseCase.execute(props);
  }

  async getPopulatedLocationById(id: string): Promise<LocationValueObjectI> {
    return await this.params.getPopulatedLocationByIdUseCase.execute({ id });
  }
}
