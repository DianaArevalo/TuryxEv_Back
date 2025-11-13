import { LocationServicePort } from '../../domain';
import {
  CreateLocationDTO,
  CreateLocationResponse,
  CreateLocationUseCase,
  EditLocationDTO,
  EditLocationUseCase,
} from '../use-cases';

interface LocationAdapterProps {
  createLocationUseCase: CreateLocationUseCase;
  editLocationUseCase: EditLocationUseCase;
}

export class LocationServiceAdapter implements LocationServicePort {
  constructor(private readonly params: LocationAdapterProps) {}

  createLocation(props: CreateLocationDTO): Promise<CreateLocationResponse> {
    return this.params.createLocationUseCase.execute(props);
  }

  editLocation(props: EditLocationDTO) {
    return this.params.editLocationUseCase.execute(props);
  }
}
