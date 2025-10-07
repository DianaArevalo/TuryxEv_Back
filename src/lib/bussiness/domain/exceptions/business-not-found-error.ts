import { NotFoundError } from "~/lib/Shared/domain/exeptions";

export class BusinessNotFoundError extends NotFoundError {
  constructor(message: string = "Business not found") {
    super(message);
  }
}
