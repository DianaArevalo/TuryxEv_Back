import { EditBusinessProps, ForBusinessEdit } from "../../domain";

export class EditBusiness {
  constructor(private readonly editBusiness: ForBusinessEdit) {}

  async handler(props: EditBusinessProps) {
    await this.editBusiness.edit(props);
  }
}
