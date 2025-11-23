import { HttpError } from '../../../shared/domain';

export class LocationAlreadyExistsError extends HttpError {
  constructor(message = 'Location already exists') {
    super(message, 409);
  }
}
