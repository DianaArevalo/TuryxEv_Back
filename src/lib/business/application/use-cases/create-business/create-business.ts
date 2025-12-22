import { LocationId } from '../../../../../lib/location/domain';
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
 
} from '../../../../../lib/business/domain';
import { BusinessLocationServicePort } from '../../../../../lib/business/domain/ports/driving/business-location-service-port';
import { UseCase } from '../../../../../lib/Shared/application/usecase';
import { ValidationError } from '../../../../../lib/Shared/domain';


export interface CreateBusinessDTO {
  name: string;
  email: string;
  idRole: string;
  idPlan?: string;
  status: string;
  password?: string;

  locationId: string; // 👈 SOLO referencia

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
  const providerData = BusinessProviderData.create(props.providerData);

  if (!props.password && providerData.value === 'AUTH') {
    throw new ValidationError(
      'Password is required when providerData is AUTH.',
    );
  }

  const business = new Business({
    bussinessId: new BusinessId(''),
    name: BusinessName.create(props.name),
    email: BusinessEmail.create(props.email),
    password: props.password
      ? BusinessPassword.create(props.password)
      : undefined,
    picture: props.picture ? new BusinessPicture(props.picture) : undefined,
    score: BusinessScore.create(1),
    createdAt,
    updatedAt: BusinessUpdatedAt.now(createdAt),
    idRole: BusinessRole.create(props.idRole),
    idPlan: BusinessPlan.create(props.idPlan || 'FREE'),
    status: BusinessStatus.create(props.status),
    providerData,
    locationId: new LocationId(props.locationId), // 👈 AQUÍ
  });

  return (await this.repository.create(business)).toPrivateResponse();
}


}