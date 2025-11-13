<<<<<<< HEAD:src/lib/bussiness/application/create-business/create-business.ts
import { ValidationError } from "../../../Shared/domain/exeptions";
=======
>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/bussiness/application/use-cases/create-business/create-business.ts
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
<<<<<<< HEAD:src/lib/bussiness/application/create-business/create-business.ts
  LocationRepository,
} from "../../domain";
=======
  LocationServicePort,
} from '~/lib/bussiness/domain';
import { UseCase } from '~/lib/Shared/application/usecase';
import { ProviderDataE, ValidationError } from '~/lib/Shared/domain';
>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/bussiness/application/use-cases/create-business/create-business.ts

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
<<<<<<< HEAD:src/lib/bussiness/application/create-business/create-business.ts
    private readonly repository: BusinessRepository,
    private readonly locationRepository: LocationRepository
=======
    private readonly repository: BusinessRepositoryPort,
    private readonly locationService: LocationServicePort,
>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/bussiness/application/use-cases/create-business/create-business.ts
  ) {}

  async execute(props: CreateBusinessDTO): Promise<BusinessPrivateResponse> {
    const createdAt = BusinessCreatedAt.now();
    const location = BusinessLocation.create(props.location);

<<<<<<< HEAD:src/lib/bussiness/application/create-business/create-business.ts
    if (!props.password && props.providerData === "AUTH")
      throw new ValidationError("Password is required.");

    if (!(await this.locationRepository.isValidLocation(location)))
      throw new ValidationError("Location is invalid");

=======
    if (!props.password && props.providerData === ProviderDataE.AUTH)
      throw new ValidationError('Password is required.');

>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/bussiness/application/use-cases/create-business/create-business.ts
    const business = new Business({
      bussinessId: new BusinessId(""),
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
      idPlan: BusinessPlan.create(props.idPlan || "FREE"),
      status: BusinessStatus.create(props.status),
      providerData: BusinessProviderData.create(props.providerData),
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
