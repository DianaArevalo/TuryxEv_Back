import {
  CreateLocationDTO,
  CreateLocationResponse,
  EditLocationDTO,
} from '../../../application/use-cases';

export interface LocationServicePort {
  createLocation(props: CreateLocationDTO): Promise<CreateLocationResponse>;
  editLocation(props: EditLocationDTO): Promise<void>;
}
