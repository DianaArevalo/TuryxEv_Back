import { UserCreate, UserSoftDelete } from "~/lib/User/application";
import { UserRepository } from "~/lib/User/domain/repositories";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";
   


describe("application/UserSoftDelete", () => {
    let repository: UserRepository;
    let createUser: UserCreate;
    let softDelete: UserSoftDelete;
    let createdUsers: any[] = []

    const User1 = {
        name: "User1",
        email: "user1@gmail.com",
        password: "$ecretPassword123!",
        ProviderData: "AUTH",
    };

    const User2 = {
        name: "User2",
        email: "user2@gmail.com",
        password: "$ecretPassword1234!",
        ProviderData: "AUTH",
    };

    beforeEach( async () => {
        repository = new InMemoryUserRepository();
        createUser = new UserCreate(repository);
        softDelete = new UserSoftDelete(repository);

        const u1 = await createUser.handler(User1);
        const u2 = await createUser.handler(User2);

        createdUsers =[ u1, u2]
    });


    it("should set status to FALSE after soft delete", async () => {
          // Tomamos el id real generado al crear User1
        const userId = createdUsers[0].idUser;

        // Llamamos al handler para hacer soft delete
        const deletedUser = await softDelete.handler({ id: userId });

        // Verificamos que el status ahora es false
        expect(deletedUser.status).toBe(false);

        // También podemos verificar directamente en el repo
        const userInRepo = await repository.getOneById({ value: userId });
        expect(userInRepo?.status?.value).toBe(false);               
    });
})