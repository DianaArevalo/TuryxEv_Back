import { HotelId, HotelRepository } from '../../domain';
import { HotelNotFoundError } from '../../domain/exceptions/HotelNotFoundError';

interface HotelGetOneByIdProps {
  id: string;
}

export class HotelGetOneById {
  constructor(private readonly repository: HotelRepository) {}

  async handler(props: HotelGetOneByIdProps) {
    const result = await this.repository.getOneById(new HotelId(props.id));

    if (!result) throw new HotelNotFoundError();

    return result.toResponse();
  }
}
