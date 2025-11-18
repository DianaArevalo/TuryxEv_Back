import { BusinessPrivateResponse } from '../../entities';

export interface EditBusinessProps {
  businessId: string;
  status?: string;
}

export interface BusinessServicePort {
  edit(props: EditBusinessProps): Promise<BusinessPrivateResponse>;
}
