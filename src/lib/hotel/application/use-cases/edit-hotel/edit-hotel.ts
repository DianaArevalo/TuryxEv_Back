import {
  HotelId,
  HotelLocation,
  HotelName,
  HotelNotFoundError,
  HotelPassword,
  HotelPicture,
  HotelPlan,
  HotelRepositoryPort,
  HotelResponse,
  HotelScore,
  HotelStatus,
  LocationServicePort,
} from '~/lib/hotel/domain';
import { UseCase } from '~/lib/shared/application';
import { ValidationError } from '~/lib/shared/domain';

export interface EditHotelDTO {
  hotelId: string;
  name?: string;
  password?: string;
  location?: {
    locationId: string;
    cityName: string;
    address: string;
    lat: number;
    lng: number;
  };
  plan?: string;
  status?: string;
  score?: number;
  picture?: string;
  freePlanEnd?: Date;
}

export class EditHotelUseCase implements UseCase<EditHotelDTO, HotelResponse> {
  constructor(
    private readonly repository: HotelRepositoryPort,
    private readonly locationService: LocationServicePort,
  ) {}

  async execute(props: EditHotelDTO): Promise<HotelResponse> {
    //que exista un idHotel

    const hotel = await this.repository.getOneById(new HotelId(props.hotelId));
    if (!hotel) throw new HotelNotFoundError();

    if (props.location) {
      const newLocation = new HotelLocation(props.location);
      await this.locationService.edit(newLocation);
      hotel.location = newLocation;
    }

    //nombre, cambiar nombre
    if (props.name && props.name !== hotel.name.value)
      hotel.name = HotelName.create(props.name);

    //password, cambiar password
    if (props.password) {
      if (hotel.providerData.value !== 'AUTH')
        throw new ValidationError(
          "Can't update password when you sign in with an external provider",
        );

      if (props.password !== hotel.password?.value)
        hotel.password = HotelPassword.create(props.password);
    }

    //plan, cambiar plan
    if (props.plan && props.plan !== hotel.plan.value)
      hotel.plan = HotelPlan.create(props.plan);

    //status, cambiar status
    if (props.status && props.status !== hotel.status.value)
      hotel.status = HotelStatus.create(props.status);

    //score, cambiar score
    if (props.score && props.score !== hotel.score.value)
      hotel.score = HotelScore.create(props.score);

    //picture, cambiar picture
    if (props.picture) hotel.picture = new HotelPicture(props.picture);

    await this.repository.edit(hotel);

    return hotel.toResponse();
  }
}
