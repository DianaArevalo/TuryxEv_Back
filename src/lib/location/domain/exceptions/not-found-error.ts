import { NotFoundError } from '../../../shared/domain';

export class LocationNotFoundError extends NotFoundError {
  constructor(message = 'Location not found') {
    super(message);
  }
}
