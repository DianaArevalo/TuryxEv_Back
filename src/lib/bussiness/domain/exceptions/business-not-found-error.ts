import { NotFoundError } from "../../../Shared/domain/exeptions";

export class BusinessNotFoundError extends NotFoundError {
  constructor(message: string = "Business not found") {
    super(message);
  }
}
