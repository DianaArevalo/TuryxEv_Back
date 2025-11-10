import { NotFoundError } from '../../../Shared/domain/exeptions';

export class HotelNotFoundError extends NotFoundError {
  constructor(message: string = 'Hotel not found') {
    super(message);
  }
}
