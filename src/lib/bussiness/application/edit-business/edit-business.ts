import {
  BusinessId,
  BusinessLocation,
  BusinessName,
  BusinessNotFoundError,
  BusinessPicture,
  BusinessRepository,
} from "../../domain";

interface EditBusinessHandlerProps {
  businessId: string;
  name?: string;
  location?: string;
  picture?: string;
}

export class EditBusiness {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: EditBusinessHandlerProps) {
    const business = await this.repository.getOneById(
      new BusinessId(props.businessId)
    );

    if (!business) throw new BusinessNotFoundError();

    if (props.name && props.name !== business.name.value)
      business.name = BusinessName.create(props.name);

    if (props.location)
      business.location = BusinessLocation.create(props.location);

    if (props.picture) business.picture = new BusinessPicture(props.picture);

    await this.repository.edit(business);
  }
}
