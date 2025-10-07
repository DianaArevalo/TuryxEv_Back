import { ValidationError } from "~/lib/Shared/domain/exeptions";
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
} from "../../domain";

interface CreateBusinessHandlerProps {
  name: string;
  email: string;
  password?: string;
  location: string;
  picture?: string;
  providerData: string;
}

export class CreateBusiness {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: CreateBusinessHandlerProps) {
    const createdAt = BusinessCreatedAt.now();

    if (!props.password && props.providerData === "AUTH")
      throw new ValidationError("Password is required.");

    const business = new Business({
      bussinessId: new BusinessId(""),
      name: BusinessName.create(props.name),
      email: BusinessEmail.create(props.email),
      password: props.password
        ? BusinessPassword.create(props.password)
        : undefined,
      location: BusinessLocation.create(props.location),
      picture: props.picture ? new BusinessPicture(props.picture) : undefined,
      score: BusinessScore.create(0),
      createdAt: createdAt,
      updatedAt: BusinessUpdatedAt.now(createdAt),
      idRole: BusinessRole.create("BUSINESS"),
      idPlan: BusinessPlan.create("BASIC"),
      status: BusinessStatus.create("OPEN"),
      providerData: BusinessProviderData.create(props.providerData),
    });

    await this.repository.create(business);
  }
}
