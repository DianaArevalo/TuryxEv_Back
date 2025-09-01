import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserGetOneById } from "../../User/application/UserGetOneById/UserGetOneById";
import { UserEdit } from "../../User/application/UserEdit/UserEdit";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { InMemoryUserRepository } from "../../User/infrastructure/InMemoryUserRepository";
import { MongoUserRepository } from "../../User/infrastructure/MongoUserRepository";
import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";

const userRepository = new MongoUserRepository();

export const ServiceContainer = {
    user: {
        getAll: new UserGetAll(userRepository),
        create: new UserCreate(userRepository),
        getOneById: new UserGetOneById(userRepository),
        edit: new UserEdit(userRepository),
        delete: new UserDelete(userRepository)
    }
}