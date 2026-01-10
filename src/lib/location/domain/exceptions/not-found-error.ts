import { HttpError } from '../../../Shared/domain';

export class LocationNotFoundError extends HttpError {
  constructor(message = 'Location not found') {
    super(message, 404);
  }
}
