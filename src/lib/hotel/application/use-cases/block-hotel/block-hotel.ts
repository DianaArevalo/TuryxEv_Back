import { HotelId, HotelRepositoryPort, HotelStatus } from '~/lib/hotel/domain';
import { UseCase } from '~/lib/shared/application';

export interface BlockHotelDTO {
  id: string;
}

export class BlockHotelUseCase implements UseCase<BlockHotelDTO> {
  constructor(private readonly repository: HotelRepositoryPort) {}

  async execute(props: BlockHotelDTO): Promise<void> {
    const hotelId = new HotelId(props.id);
    const status = HotelStatus.create('BLOCKED');

    await this.repository.updateStatus(hotelId, status);

    console.info(
      'The hotel has been blocked and is under verification for account desactivation, with no monetary refund',
    );
  }
}
