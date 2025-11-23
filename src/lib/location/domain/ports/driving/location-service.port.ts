import {
  CreateLocationDTO,
  CreateLocationResponse,
  EditLocationDTO,
} from '../../../application/use-cases';

import { LocationValueObjectI } from '~/lib/shared/domain';

export interface LocationServicePort {
  createLocation(props: CreateLocationDTO): Promise<CreateLocationResponse>;
  editLocation(props: EditLocationDTO): Promise<void>;
  getPopulatedLocationById(id: string): Promise<LocationValueObjectI>;
}
