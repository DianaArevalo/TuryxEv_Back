import { Limit, Page } from '../../../../lib/Shared/domain';
import { User } from '../../domain/entities/User/User';
import {
  UserEmail,
  UserId,
  UserPassword,
  UserStatus,
} from '../../domain/entities/User/value-objects';
import { UserNotFoundError } from '../../domain/exceptions';
import { UserRepository } from '../../domain/repositories';

import { Hasher } from '~/lib/Shared/Infraestructure/Hasher';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    if (!user.status) {
      user.status = new UserStatus(true); // usuario activo por defecto
    }

    if (user.password) {
      const hashed = await Hasher.hash(user.password.value);
      user.password = new UserPassword(hashed);
    }

    this.users.push(user);
    return user;
  }

  getOneById(id: UserId): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.idUser?.value === id.value) || null,
    );
  }

  getAll(page: Page, limit: Limit): Promise<User[]> {
    const offSet = (page.value - 1) * limit.value;
    return Promise.resolve(this.users.slice(offSet, offSet + limit.value));
  }

  getOneByEmail(email: UserEmail): Promise<User | null> {
    return Promise.resolve(
      this.users.find((user) => user.email.value === email.value) || null,
    );
  }

  edit(user: User): Promise<User> {
    const index = this.users.findIndex(
      (u) => u.idUser?.value === user.idUser?.value,
    );
    if (index === -1) throw new UserNotFoundError();

    // Simula la actualización de los campos
    this.users[index] = user;
    return Promise.resolve(user);
  }

  softDelete(id: UserId): Promise<void> {
    const index = this.users.findIndex((u) => u.idUser?.value === id.value);
    if (index === -1) throw new UserNotFoundError();

    const updatedUser = this.users[index];
    updatedUser.status = new UserStatus(false);
    this.users[index] = updatedUser;

    return Promise.resolve();
  }

  getAllByStatus(isActive: UserStatus): Promise<User[]> {
    return Promise.resolve(
      this.users.filter((user) => user.status?.value === isActive.value),
    );
  }
}
