import { ValidationError } from "../../../../lib/Shared/domain/exeptions";
import {
  CityRepository,
  Hotel,
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
  ProviderData,
  ProviderDataT,
} from "../../domain";
import { HotelPicture } from "../../domain/entities/Hotel/value-objects/HotelPicture";

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
    private readonly cityRepository: CityRepository
  ) {}

  async handler(props: HotelEditHandlerProps) {
    //que exista un idHotel

    const hotel = await this.repository.getOneById(new HotelId(props.hotelId));
    if (!hotel) throw new ValidationError("Hotel not found");

    //validar ubicacion
    if (
      props.location &&
      !(await this.cityRepository.isValidCity(
        await HotelLocation.create(props.location)
      ))
    )
      throw new ValidationError("The city is not valid");

    //cambio ubicacion
    if (props.location)
      hotel.location = (await HotelLocation.create(
        props.location
      )) as HotelLocation;

    //nombre, cambiar nombre
    if (props.name && props.name !== hotel.name.value)
      hotel.name = HotelName.create(props.name) as HotelName;

    //password, cambiar password

    if (props.password) {
      if (hotel.providerData !== ("AUTH" as unknown as ProviderData)) {
        throw new ValidationError(
          "Can't update password when you sign in with an external provider"
        );
      }

      if (props.password !== hotel.password?.value) {
        hotel.password = HotelPassword.create(props.password) as HotelPassword;
      }
    }

    //plan, cambiar plan
    if (props.plan && props.plan !== hotel.plan.value)
      hotel.plan = HotelPlan.create(props.plan as HotelPlanT) as HotelPlan;

    //status, cambiar status
    if (props.status && props.status !== hotel.status.getValue())
      hotel.status = HotelStatus.create(
        props.status as HotelStatusT
      ) as HotelStatus;

    //score, cambiar score
    if (props.score && props.score !== hotel.score.value.toString())
      hotel.score = HotelScore.create(parseFloat(props.score)) as HotelScore;

    //picture, cambiar picture
    if (props.picture) hotel.picture = new HotelPicture(props.picture);

    await this.repository.edit(hotel);
    return hotel.toResponse();
  }
}
