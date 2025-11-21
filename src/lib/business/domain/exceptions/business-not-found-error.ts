import { NotFoundError } from '../../../shared/domain';

export class BusinessNotFoundError extends NotFoundError {
  constructor(message: string = 'Business not found') {
    super(message);
  }
}
