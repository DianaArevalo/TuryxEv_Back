import { NotFoundError } from '../../../shared/domain/exeptions';

export class HotelNotFoundError extends NotFoundError {
  constructor(message: string = 'Hotel not found') {
    super(message);
  }
}
