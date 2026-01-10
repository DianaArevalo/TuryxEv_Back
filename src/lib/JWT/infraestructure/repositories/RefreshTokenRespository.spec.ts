import { connectTestDB, disconnectTestDB } from "~/lib/Shared/Infraestructure/setup-test-db";
import { RefreshTokenRepository } from "./RefreshTokenRepository";
import { RefreshTokenModel } from "../models/refresh-token-model";

describe("RefreshTokenRepository – Integration Tests", () => {
  jest.setTimeout(30000);

  let repository: RefreshTokenRepository;

  beforeAll(async () => {
    await connectTestDB();
    repository = new RefreshTokenRepository();
  });

  afterEach(async () => {
    await RefreshTokenModel.deleteMany({});
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

})