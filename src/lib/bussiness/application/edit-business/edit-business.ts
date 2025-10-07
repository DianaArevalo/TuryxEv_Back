import { ValidationError } from "~/lib/Shared/domain/exeptions";
import {
  BusinessId,
  BusinessLocation,
  BusinessName,
  BusinessNotFoundError,
  BusinessPassword,
  BusinessPicture,
  BusinessPlan,
  BusinessRepository,
  BusinessScore,
  BusinessStatus,
  LocationRepository,
} from "../../domain";

interface EditBusinessHandlerProps {
  businessId: string;
  name?: string;
  password?: string;
  location?: string;
  idPlan?: string;
  score?: number;
  status?: string;
  picture?: string;
}

export class EditBusiness {
  constructor(
    private readonly repository: BusinessRepository,
    private readonly locationRepository: LocationRepository
  ) {}

  async handler(props: EditBusinessHandlerProps) {
    const business = await this.repository.getOneById(
      new BusinessId(props.businessId)
    );

    if (
      props.location &&
      !(await this.locationRepository.isValidLocation(
        BusinessLocation.create(props.location)
      ))
    )
      throw new ValidationError("Location is invalid");

    if (!business) throw new BusinessNotFoundError();

    if (props.name && props.name !== business.name.value)
      business.name = BusinessName.create(props.name);

    if (props.password && business.providerData.value === "AUTH")
      business.name = BusinessPassword.create(props.password);
    else
      throw new ValidationError(
        "Can't update password when you signed with OAuth provider"
      );

    if (props.location)
      business.location = BusinessLocation.create(props.location);

    if (props.idPlan && props.idPlan !== business.idPlan.value)
      business.idPlan = BusinessPlan.create(props.idPlan);

    if (props.score && props.score !== business.score.value)
      business.score = BusinessScore.create(props.score);

    if (props.status && props.status !== business.status.value)
      business.status = BusinessStatus.create(props.status);

    if (props.picture) business.picture = new BusinessPicture(props.picture);

    await this.repository.edit(business);

    return business.toPrivateResponse();
  }
}
