import {
  BusinessPrivateResponse,
  BusinessPublicResponse,
  BusinessServicePort,
  EditBusinessProps,
} from '../../domain';
import { 
  CreateBusinessDTO,
  CreateBusinessUseCase, 
  EditBusinessDTO, 
  EditBusinessUseCase, 
  GetBusinessesDTO, 
  GetBusinessesUseCase, 
  GetOneBusinessDTO, 
  GetOneBusinessUseCase, 
  SoftDeleteBusinessDTO, 
  SoftDeleteBusinessUseCase } from '../use-cases';

export interface BusinessServiceUseCases {
  createBusinessUseCase: CreateBusinessUseCase;
  editBusinessUseCase: EditBusinessUseCase;
  getBusinessesUseCase: GetBusinessesUseCase;
  getOneBusinessUseCase: GetOneBusinessUseCase;
  softDeleteBusinessUseCase: SoftDeleteBusinessUseCase;
}

export class BusinessServiceAdapter implements BusinessServicePort {
  constructor(private readonly useCases: BusinessServiceUseCases) {}

 create(props: CreateBusinessDTO) {
    return this.useCases.createBusinessUseCase.execute(props);
  }

  edit(props: EditBusinessDTO) {
    return this.useCases.editBusinessUseCase.execute(props);
  }

  getAll(props: GetBusinessesDTO = {}) {
    return this.useCases.getBusinessesUseCase.execute(props);
  }

  getOneById(id: GetOneBusinessDTO) {
    return this.useCases.getOneBusinessUseCase.execute(id);
  }

  softDelete(id: SoftDeleteBusinessDTO) {
    return this.useCases.softDeleteBusinessUseCase.execute(id);
  }

}
