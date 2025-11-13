import {
  BusinessPrivateResponse,
  BusinessServicePort,
  EditBusinessProps,
} from '../../domain';
import { EditBusinessUseCase } from '../use-cases';

export interface BusinessServiceUseCases {
  editBusinessUseCase: EditBusinessUseCase;
}

export class BusinessServiceAdapter implements BusinessServicePort {
  constructor(private readonly useCases: BusinessServiceUseCases) {}

  edit(props: EditBusinessProps): Promise<BusinessPrivateResponse> {
    return this.useCases.editBusinessUseCase.execute(props);
  }
}
