import { EditBusinessProps, ForBusinessEdit } from '../../domain';

export class SuperAdminEditBusiness {
  constructor(private readonly editBusiness: ForBusinessEdit) {}

  async handler(props: EditBusinessProps) {
    await this.editBusiness.edit(props);
  }
}
