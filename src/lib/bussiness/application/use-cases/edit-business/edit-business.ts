import {
  BusinessId,
  BusinessLocation,
  BusinessName,
  BusinessNotFoundError,
  BusinessPassword,
  BusinessPicture,
  BusinessPlan,
  BusinessPrivateResponse,
  BusinessRepositoryPort,
  BusinessScore,
  BusinessStatus,
  LocationServicePort,
} from '~/lib/bussiness/domain';
import { UseCase } from '~/lib/Shared/application/usecase';
import { ValidationError } from '~/lib/Shared/domain';

export interface EditBusinessDTO {
  businessId: string;
  name?: string;
  password?: string;
  location?: {
    locationId: string;
    cityName: string;
    address: string;
  };
  idPlan?: string;
  score?: number;
  status?: string;
  picture?: string;
}

export class EditBusinessUseCase
  implements UseCase<EditBusinessDTO, BusinessPrivateResponse>
{
  constructor(
    private readonly repository: BusinessRepositoryPort,
    private readonly locationService: LocationServicePort,
  ) {}

  async execute(props: EditBusinessDTO): Promise<BusinessPrivateResponse> {
    const business = await this.repository.getOneById(
      new BusinessId(props.businessId),
    );

    if (!business) throw new BusinessNotFoundError();

    if (props.name && props.name !== business.name.value)
      business.name = BusinessName.create(props.name);

    if (props.password && business.providerData.value === 'AUTH')
      business.password = BusinessPassword.create(props.password);
    else if (props.password)
      throw new ValidationError(
        "Can't update password when you signed with OAuth provider",
      );

    if (props.location)
      await this.locationService.edit(new BusinessLocation(props.location));

    if (props.idPlan && props.idPlan !== business.idPlan.value)
      business.idPlan = BusinessPlan.create(props.idPlan);

    if (props.score && props.score !== business.score.value)
      business.score = BusinessScore.create(props.score);

    if (props.status && props.status !== business.status.value)
      business.status = BusinessStatus.create(props.status);

    if (props.picture) business.picture = new BusinessPicture(props.picture);

    const edited = await this.repository.edit(business);

    return {
      ...edited.toPrivateResponse(),
      location: props.location ? props.location : edited.location?.value,
    };
  }
}
