import { NotFoundError } from '../../../../lib/shared/domain';

export class UserNotFoundError extends NotFoundError {
  constructor(message: string = 'User not found') {
    super(message);
  }
}
