import { LocationServicePort } from '../../domain';
import {
  CreateLocationDTO,
  CreateLocationResponse,
  CreateLocationUseCase,
  EditLocationDTO,
  EditLocationUseCase,
  GetPopulatedLocationByIdUseCase,
} from '../use-cases';

import { LocationValueObjectI } from '~/lib/shared/domain';

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
