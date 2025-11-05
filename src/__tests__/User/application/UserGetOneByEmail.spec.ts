import { HttpError } from "~/lib/Shared/domain";
import { UserCreate, UserGetOneByEmail } from "~/lib/User/application";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository"

describe("application/UserGetOneByEmail", () => {
    let repository: InMemoryUserRepository;
    let userCreate: UserCreate;
    let userGetOneByEmail: UserGetOneByEmail;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        userCreate = new UserCreate(repository);
        userGetOneByEmail = new UserGetOneByEmail(repository);
    });

    it("should return an existing user", async ()=> {
        const createdUser = await userCreate.handler({
            name: "Test User2",
            email: "testuser2@example.com",            
            providerData: "AUTHGOOGLE",
        });

        const user = await userGetOneByEmail.handler({
            email: createdUser.email,
        });

        expect(user).toHaveProperty("idUser", createdUser.idUser!);
        expect(user).toHaveProperty("name", createdUser.name);
        expect(user).toHaveProperty("email", createdUser.email);
        expect(user).toHaveProperty("providerData", createdUser.providerData);
    });

    it("should throw UserNotFoundError if user does not exist", async () => {
        try {
            await userGetOneByEmail.handler({ email: "non-email-existing"});
        } catch (err) {
            expect(err).toBeInstanceOf(HttpError)            
        }
    })
})