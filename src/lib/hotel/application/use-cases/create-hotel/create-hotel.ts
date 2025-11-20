import {
  Hotel,
  HotelCreatedAt,
  HotelEmail,
  HotelFreePlanEnd,
  HotelLocation,
  HotelName,
  HotelPassword,
  HotelPicture,
  HotelPlan,
  HotelProviderData,
  HotelRepositoryPort,
  HotelResponse,
  HotelRole,
  HotelScore,
  HotelStatus,
  HotelUpdatedAt,
  LocationServicePort,
} from '~/lib/hotel/domain';
import { UseCase } from '~/lib/Shared/application/usecase';
import { ValidationError } from '~/lib/Shared/domain';

export interface CreateHotelDTO {
  name: string;
  email: string;
  role: string;
  plan: string;
  status: string;
  password?: string;
  location: {
    cityName: string;
    address: string;
  };
  picture?: string;
  score?: string;
  freePlanExpiresAt?: Date;
  providerData: string;
}

export class CreateHotelUseCase
  implements UseCase<CreateHotelDTO, HotelResponse>
{
  constructor(
    private readonly repository: HotelRepositoryPort,
    private readonly locationService: LocationServicePort,
  ) {}

  async execute(props: CreateHotelDTO): Promise<HotelResponse> {
    const createdAt = HotelCreatedAt.now();
    const location = HotelLocation.create(props.location);
    const providerData = HotelProviderData.create(props.providerData);

    if (!props.password && providerData.value === 'AUTH')
      throw new ValidationError(
        'Password is required when providerData is AUTH.',
      );

    const hotel = new Hotel({
      name: HotelName.create(props.name),
      email: HotelEmail.create(props.email),
      password: props.password
        ? HotelPassword.create(props.password)
        : undefined,
      picture: props.picture ? new HotelPicture(props.picture) : undefined,
      score: HotelScore.create(1),
      createdAt,
      updatedAt: HotelUpdatedAt.now(createdAt),
      role: HotelRole.create(props.role),
      plan: HotelPlan.create(props.plan),
      status: HotelStatus.create(props.status),
      freePlanEnd: props.freePlanExpiresAt
        ? new HotelFreePlanEnd(props.freePlanExpiresAt)
        : HotelFreePlanEnd.create(createdAt.value), // 15 days after today
      providerData: HotelProviderData.create(props.providerData),
    });

    const created = await this.repository.create(hotel);

    const locationCreated = await this.locationService.create(
      location,
      created.hotelId!, // Always poblated, because repository.create should give an ID.
    );

    hotel.location = locationCreated;

    await this.repository.edit(hotel);

    return created.toResponse();
  }
}
