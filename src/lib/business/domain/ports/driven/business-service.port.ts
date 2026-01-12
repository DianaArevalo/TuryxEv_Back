import { CreateBusinessDTO, EditBusinessDTO, GetBusinessesDTO, GetOneBusinessDTO, SoftDeleteBusinessDTO } from '~/lib/business/application';
import { BusinessPrivateResponse, BusinessPublicResponse } from '../../entities';

export interface EditBusinessProps {
  businessId: string;
  status?: string;
}

export interface BusinessServicePort {
 create(props: CreateBusinessDTO): Promise<BusinessPrivateResponse>;
  edit(props: EditBusinessDTO): Promise<BusinessPrivateResponse>;
  getAll(props: GetBusinessesDTO): Promise<BusinessPublicResponse[]>;
  getOneById(id: GetOneBusinessDTO): Promise<BusinessPublicResponse>;
  softDelete(id: SoftDeleteBusinessDTO): Promise<void>;
}
