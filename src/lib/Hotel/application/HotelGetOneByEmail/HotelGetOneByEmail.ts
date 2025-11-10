import { HotelEmail, HotelRepository } from '../../domain';
import { HotelNotFoundError } from '../../domain/exceptions/HotelNotFoundError';

interface HotelGetOnByEmailProps {
  email: string;
}

export class HotelGetOnByEmail {
  constructor(private readonly repository: HotelRepository) {}

  async handler(props: HotelGetOnByEmailProps) {
    const result = await this.repository.getOneByEmail(
      HotelEmail.create(props.email),
    );

    if (!result) throw new HotelNotFoundError();

    return result.toResponse();
  }
}
