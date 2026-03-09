import { HotelResponse, HotelServicePort } from '../../domain';
import { EditHotelDTO, EditHotelUseCase } from '../use-cases';

export interface HotelServiceUseCases {
  editHotelUseCase: EditHotelUseCase;
}

export class HotelServiceAdapter implements HotelServicePort {
  constructor(private readonly useCases: HotelServiceUseCases) {}

  edit(props: EditHotelDTO): Promise<HotelResponse> {
    return this.useCases.editHotelUseCase.execute(props);
  }
}
