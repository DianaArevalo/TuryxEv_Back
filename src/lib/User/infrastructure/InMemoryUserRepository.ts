import { Hasher } from "../../Shared/Infraestructure/Hasher";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async create(user: User): Promise<void> {
        user.password = new UserPassword(await Hasher.hash(user.password.value))
        this.users.push(user);
    }

    async getOneById(id: UserId): Promise<User | null> {
        return this.users.find((user) => user.id.value === id.value) || null
    }

    async getAll(): Promise<User[]> {
        return this.users

    }

    async getOneByEmail(email: UserEmail): Promise<User | null> {
        return this.users.find((em) => em.id.value === email.value) || null

    }

    async edit(user: User): Promise<void> {
        const index = this.users.findIndex((u)=> u.id.value === user.id.value);
        user.password = new UserPassword(await Hasher.hash(user.password.value))
        this.users[index] = user
    }

    async delete(id: UserId): Promise<void> {
        this.users = this.users.filter((user) => user.id.value !== id.value)
    }
}