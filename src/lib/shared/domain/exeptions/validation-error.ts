import { HttpError } from './http-error';

export class ValidationError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
