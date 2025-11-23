import {
  Hotel,
  HotelEmail,
  HotelId,
  HotelNotFoundError,
  HotelRepositoryPort,
  HotelResponse,
} from '~/lib/hotel/domain';
import { UseCase } from '~/lib/shared/application';
import { HttpError } from '~/lib/shared/domain';

export interface GetOneHotelDTO {
  id?: string;
  email?: string;
}

export class GetOneHotelUseCase
  implements UseCase<GetOneHotelDTO, HotelResponse>
{
  constructor(private readonly repository: HotelRepositoryPort) {}

  async execute(props: GetOneHotelDTO) {
    if ((!props.id && !props.email) || (props.id && props.email))
      throw new HttpError('Either id or email must be provided.', 400);

    let result: Hotel | null = null;

    if (props.email)
      result = await this.repository.getOneByEmail(
        HotelEmail.create(props.email),
      );

    if (props.id)
      result = await this.repository.getOneById(new HotelId(props.id));

    if (!result) throw new HotelNotFoundError();

    return result.toResponse();
  }
}
