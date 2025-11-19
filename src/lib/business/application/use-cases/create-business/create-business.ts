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
  };
  picture?: string;
  providerData: string;
}

export class CreateBusinessUseCase
  implements UseCase<CreateBusinessDTO, BusinessPrivateResponse>
{
  constructor(
    private readonly repository: BusinessRepositoryPort,
    private readonly locationService: LocationServicePort,
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

    const locationCreated = await this.locationService.create(
      location,
      created.bussinessId,
    );

    business.location = locationCreated;

    await this.repository.edit(business);

    return created.toPrivateResponse();
  }
}
