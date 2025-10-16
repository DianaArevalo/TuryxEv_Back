import {
  BusinessId,
  BusinessNotFoundError,
  BusinessRepository,
} from "../../domain";

interface GetOneBusinessByIdHandlerProps {
  id: string;
}

export class GetOneBusinessById {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: GetOneBusinessByIdHandlerProps) {
    const result = await this.repository.getOneById(new BusinessId(props.id));

    if (!result) throw new BusinessNotFoundError();

    return result.toPublicResponse();
  }
}
