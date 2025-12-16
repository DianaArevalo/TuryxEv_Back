import {
  Business,
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,
  BusinessLocation,
  BusinessName,
  BusinessPassword,
  BusinessPicture,
  BusinessPlan,
  BusinessPrivateResponse,
  BusinessProviderData,
  BusinessRepositoryPort,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
  LocationServicePort,
} from '~/lib/business/domain';
import { BusinessLocationServicePort } from '~/lib/business/domain/ports/driving/business-location-service-port';
import { UseCase } from '~/lib/Shared/application/usecase';
import { ValidationError } from '~/lib/Shared/domain';


export interface CreateBusinessDTO {
  name: string;
  email: string;
  idRole: string;
  idPlan?: string;
  status: string;
  password?: string;
  location: {
    cityName: string;
    address: string;
    lat: number;
    lng: number;
  };
  picture?: string;
  providerData: string;
}

export class CreateBusinessUseCase
  implements UseCase<CreateBusinessDTO, BusinessPrivateResponse>
{
  constructor(
    private readonly repository: BusinessRepositoryPort,
    private readonly locationService: BusinessLocationServicePort,
  ) {}

  async execute(props: CreateBusinessDTO): Promise<BusinessPrivateResponse> {
    const createdAt = BusinessCreatedAt.now();
    const location = BusinessLocation.create(props.location);
    const providerData = BusinessProviderData.create(props.providerData);

    if (!props.password && providerData.value === 'AUTH')
      throw new ValidationError(
        'Password is required when providerData is AUTH.',
      );

    const business = new Business({
      bussinessId: new BusinessId(''),
      name: BusinessName.create(props.name),
      email: BusinessEmail.create(props.email),
      password: props.password
        ? BusinessPassword.create(props.password)
        : undefined,
      picture: props.picture ? new BusinessPicture(props.picture) : undefined,
      score: BusinessScore.create(1),
      createdAt: createdAt,
      updatedAt: BusinessUpdatedAt.now(createdAt),
      idRole: BusinessRole.create(props.idRole),
      idPlan: BusinessPlan.create(props.idPlan || 'FREE'),
      status: BusinessStatus.create(props.status),
      providerData,
    });

    const created = await this.repository.create(business);

    await this.locationService.updateLocation(location);

    return created.toPrivateResponse();
  }
}