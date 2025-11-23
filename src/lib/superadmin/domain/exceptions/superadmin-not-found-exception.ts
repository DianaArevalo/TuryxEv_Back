import { NotFoundError } from '~/lib/shared/domain';

export class SuperAdminNotFoundError extends NotFoundError {
  constructor(message = 'Super admin not found') {
    super(message);
  }
}
