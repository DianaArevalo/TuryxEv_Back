import {
  BusinessEmail,
  BusinessId,
  BusinessNotFoundError,
  BusinessPublicResponse,
  BusinessRepositoryPort,
} from '~/lib/bussiness/domain';
import { UseCase } from '~/lib/Shared/application/usecase';
import { HttpError } from '~/lib/Shared/domain';

export interface GetOneBusinessDTO {
  id?: string;
  email?: string;
}

export class GetOneBusinessUseCase
  implements UseCase<GetOneBusinessDTO, BusinessPublicResponse>
{
  constructor(private readonly repository: BusinessRepositoryPort) {}

  async execute(props: GetOneBusinessDTO) {
    if (!props.id && !props.email)
      throw new HttpError('Either id or email must be provided.', 400);

    let result = null;

    if (props.id) {
      result = await this.repository.getOneById(new BusinessId(props.id));
    } else if (props.email) {
      result = await this.repository.getOneByEmail(
        BusinessEmail.create(props.email),
      );
    }

    if (!result) throw new BusinessNotFoundError();

    return result.toPublicResponse();
  }
}
