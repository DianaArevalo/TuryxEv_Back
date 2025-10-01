export class HttpError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
