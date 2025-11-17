import { NotFoundError } from '../../../Shared/domain';

export class LocationNotFoundError extends NotFoundError {
  constructor(message = 'Location not found') {
    super(message);
  }
}
