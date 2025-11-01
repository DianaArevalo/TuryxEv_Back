import { HotelEdit } from "../../../../Hotel/application";
import { CityRepository, HotelRepository } from "../../../../Hotel/domain";
import {
  ForEditHotel,
  EditProps,
} from "../../../domain/ports/driver/for-edit-hotel";

export class EditHotelAdapter implements ForEditHotel {
  constructor(
    private readonly repository: HotelRepository,
    private readonly cityRepository: CityRepository
  ) {}

  async edit(props: EditProps): Promise<void> {
    const edit = new HotelEdit(this.repository, this.cityRepository);
    await edit.handler(props);
  }
}
