import { BusinessServicePort } from '~/lib/business/domain';
import {
  EditBusinessProps,
  SuperAdminBusinessServicePort,
} from '~/lib/superadmin/domain';

export class SuperAdminBusinessServiceAdapter
  implements SuperAdminBusinessServicePort
{
  constructor(private readonly businessService: BusinessServicePort) {}

  async edit(props: EditBusinessProps): Promise<void> {
    await this.businessService.edit(props);
  }
}
