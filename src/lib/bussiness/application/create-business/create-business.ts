import { ValidationError } from "../../../Shared/domain/exeptions";
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
  BusinessProviderData,
  BusinessRepository,
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
  LocationRepository,
} from "../../domain";

interface CreateBusinessHandlerProps {
  name: string;
  email: string;
  idRole: string;
  idPlan?: string;
  status: string;
  password?: string;
  location: string;
  picture?: string;
  providerData: string;
}

export class CreateBusiness {
  constructor(
    private readonly repository: BusinessRepository,
    private readonly locationRepository: LocationRepository
  ) {}

  async handler(props: CreateBusinessHandlerProps) {
    const createdAt = BusinessCreatedAt.now();
    const location = BusinessLocation.create(props.location);

    if (!props.password && props.providerData === "AUTH")
      throw new ValidationError("Password is required.");

    if (!(await this.locationRepository.isValidLocation(location)))
      throw new ValidationError("Location is invalid");

    const business = new Business({
      bussinessId: new BusinessId(""),
      name: BusinessName.create(props.name),
      email: BusinessEmail.create(props.email),
      password: props.password
        ? BusinessPassword.create(props.password)
        : undefined,
      location: BusinessLocation.create(props.location),
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

    return created.toPrivateResponse();
  }
}
