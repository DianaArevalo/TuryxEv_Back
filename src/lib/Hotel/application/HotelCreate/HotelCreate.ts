import { ProviderData, ProviderDataT } from '../../../../lib/Shared/domain';
import { ValidationError } from '../../../../lib/Shared/domain/exeptions';
import {
  CityRepository,
  Hotel,
  HotelCreatedAt,
  HotelEmail,
  HotelFreePlanEnd,
  HotelName,
  HotelPassword,
  HotelPlan,
  HotelPlanT,
  HotelRepository,
  HotelRole,
  HotelRoleT,
  HotelScore,
  HotelStatus,
  HotelStatusT,
  HotelUpdatedAt,
} from '../../domain';
import { HotelPicture } from '../../domain/entities/Hotel/value-objects/HotelPicture';

export interface HotelCreateHandlerProps {
  name: string;
  email: string;
  idRole: string;
  idPlan: string;
  status: string;
  password?: string;
  location: string;
  picture?: string;
  score?: string;
  freePlanExpiresAt?: Date;
  providerData?: string;
}

export class HotelCreate {
  constructor(
    private readonly repository: HotelRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async handler(props: HotelCreateHandlerProps) {
    const createdAt = HotelCreatedAt.now();
    const city = this.cityRepository.createCity(props.location);

    if (!(await this.cityRepository.isValidCity(city)))
      throw new ValidationError('The city is not valid');

    if (!props.password && props.providerData === 'AUTH') {
      throw new ValidationError(
        'Password is required when providerData is AUTH',
      );
    }

    let freePlanExpiresAt: Date | undefined = undefined;
    if (props.idPlan === 'FREE') {
      freePlanExpiresAt = new Date(
        createdAt.value.getTime() + 15 * 24 * 60 * 60 * 1000,
      );
      console.info(`The plan expire: ${freePlanExpiresAt.toISOString()}`);
    }

    const tempHotel = new Hotel({
      name: HotelName.create(props.name),
      email: HotelEmail.create(props.email),
      password: props.password
        ? HotelPassword.create(props.password)
        : undefined,
      location: city,
      picture: props.picture ? new HotelPicture(props.picture) : undefined,
      score: HotelScore.create(1),
      createdAt: createdAt,
      updatedAt: HotelUpdatedAt.now(createdAt),
      role: HotelRole.create(props.idRole as HotelRoleT),
      plan: HotelPlan.create((props.idPlan as HotelPlanT) || 'FREE'),
      status: HotelStatus.create(props.status as HotelStatusT),
      freePlanEnd: props.freePlanExpiresAt
        ? new HotelFreePlanEnd(props.freePlanExpiresAt)
        : HotelFreePlanEnd.create(new Date()), // 15 días desde hoy

      providerData: ProviderData.create(props.providerData as ProviderDataT),
    });

    const createdHotelId = await this.repository.create(tempHotel);

    if (!createdHotelId) {
      throw new ValidationError('Hotel creation failed, no ID returned');
    }

    return createdHotelId.toResponse();
  }
}
