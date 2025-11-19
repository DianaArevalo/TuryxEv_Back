import { ValidationError } from '../../../../lib/Shared/domain/exeptions';
import {
  CityRepository,
  HotelId,
  HotelLocation,
  HotelName,
  HotelPassword,
  HotelPlan,
  HotelPlanT,
  HotelRepository,
  HotelScore,
  HotelStatus,
  HotelStatusT,
} from '../../domain';
import { HotelPicture } from '../../domain/entities/Hotel/value-objects/HotelPicture';

interface HotelEditHandlerProps {
  hotelId: string;
  name?: string;
  password?: string;
  location?: string;
  plan?: string;
  status?: string;
  score?: string;
  picture?: string;
  freePlanEnd?: Date;
  updatedAt?: Date;
}

export class HotelEdit {
  constructor(
    private readonly repository: HotelRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async handler(props: HotelEditHandlerProps) {
    //que exista un idHotel

    const hotel = await this.repository.getOneById(new HotelId(props.hotelId));
    if (!hotel) throw new ValidationError('Hotel not found');

    //validar ubicacion
    if (
      props.location &&
      !(await this.cityRepository.isValidCity(
        HotelLocation.create(props.location),
      ))
    )
      throw new ValidationError('The city is not valid');

    //cambio ubicacion
    if (props.location) hotel.location = HotelLocation.create(props.location);

    //nombre, cambiar nombre
    if (props.name && props.name !== hotel.name.value)
      hotel.name = HotelName.create(props.name);

    //password, cambiar password

    if (props.password) {
      if (hotel.providerData.value !== 'AUTH') {
        throw new ValidationError(
          "Can't update password when you sign in with an external provider",
        );
      }

      if (props.password !== hotel.password?.value) {
        hotel.password = HotelPassword.create(props.password);
      }
    }

    //plan, cambiar plan
    if (props.plan && props.plan !== hotel.plan.value)
      hotel.plan = HotelPlan.create(props.plan as HotelPlanT);

    //status, cambiar status
    if (props.status && props.status !== hotel.status.getValue())
      hotel.status = HotelStatus.create(props.status as HotelStatusT);

    //score, cambiar score
    if (props.score && props.score !== hotel.score.value.toString())
      hotel.score = HotelScore.create(parseFloat(props.score));

    //picture, cambiar picture
    if (props.picture) hotel.picture = new HotelPicture(props.picture);

    await this.repository.edit(hotel);
    return hotel.toResponse();
  }
}
