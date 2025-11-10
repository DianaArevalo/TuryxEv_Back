import { EditProps, ForEditHotel } from '.././../../Hotel/domain/ports';

export class SuperAdminEditHotel {
  constructor(private readonly editHotel: ForEditHotel) {}

  async handler(props: EditProps) {
    await this.editHotel.edit(props);
  }
}
