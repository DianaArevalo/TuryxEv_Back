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
  BusinessRole,
  BusinessScore,
  BusinessStatus,
  BusinessUpdatedAt,
} from "../../domain";
import { BusinessRepository } from "../../domain/repositories/business-repository";

interface CreateBusinessHandlerProps {
  name: string;
  email: string;
  password: string;
  location: string;
  picture?: string;
}

export class CreateBusiness {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: CreateBusinessHandlerProps) {
    const createdAt = BusinessCreatedAt.now();

    const business = new Business({
      bussinessId: new BusinessId(""),
      name: BusinessName.create(props.name),
      email: BusinessEmail.create(props.email),
      password: BusinessPassword.create(props.password),
      location: BusinessLocation.create(props.location),
      picture: props.picture ? new BusinessPicture(props.picture) : undefined,
      score: BusinessScore.create(0),
      createdAt: createdAt,
      updatedAt: BusinessUpdatedAt.now(createdAt),
      idRole: BusinessRole.create("BUSINESS"),
      idPlan: BusinessPlan.create("BASIC"),
      status: BusinessStatus.create("OPEN"),
      providerData: BusinessProviderData.create("AUTH"),
    });

    await this.repository.create(business);
  }
}
