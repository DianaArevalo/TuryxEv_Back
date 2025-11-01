import { HttpError } from "../../../Shared/domain/exeptions";

export class SuperAdminNotFoundError extends HttpError {
  constructor(message = "Super admin not found") {
    super(message, 404);
  }
}
