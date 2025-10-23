import { EditBusinessProps, ForBusinessEdit } from "../../../domain";
import { ForEditBusinessAdapter } from ".././../../../bussiness/infrastructure/adapters/driver/for-edit-business-adapter";

export class ForBusinessEditAdapter implements ForBusinessEdit {
  editBusiness: ForEditBusinessAdapter;

  constructor() {
    this.editBusiness = new ForEditBusinessAdapter();
  }

  async edit(props: EditBusinessProps): Promise<void> {
    await this.editBusiness.edit(props);
  }
}
