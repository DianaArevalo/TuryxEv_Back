import { CityRepository, HotelRepository } from "../../../../Hotel/domain";
import { EditHotelAdapter } from "../../../../Hotel/infraestructure/adapter/driver/edit-hotel-adapter";
import {
  EditHotelProps,
  ForHotelEdit,
} from "../../../domain/ports/driven/for-hotel-edit";

export class ForHotelEditAdapter implements ForHotelEdit {
  editHotel: EditHotelAdapter;

  constructor(
    private readonly hotelRepository: HotelRepository,
    private readonly cityRepository: CityRepository
  ) {
    this.editHotel = new EditHotelAdapter(
      this.hotelRepository,
      this.cityRepository
    );
  }

  async edit(props: EditHotelProps): Promise<void> {
    await this.editHotel.edit(props);
  }
}
