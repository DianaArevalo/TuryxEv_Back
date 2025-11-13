import { NotFoundError } from '../../../Shared/domain';

export class BusinessNotFoundError extends NotFoundError {
  constructor(message: string = 'Business not found') {
    super(message);
  }
}
