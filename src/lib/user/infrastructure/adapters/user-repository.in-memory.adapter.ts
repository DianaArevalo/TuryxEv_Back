import {
  UserRepositoryPort,
  User,
  UserStatus,
  UserPassword,
  UserId,
  UserEmail,
  UserNotFoundError,
} from '../../domain';

import { PageValueObject, LimitValueObject } from '~/lib/shared/domain';
import { Hasher } from '~/lib/shared/infrastructure';

export class UserRepositoryInMemoryAdapter implements UserRepositoryPort {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    user.idUser = new UserId(user.name.value);
    if (!user.status) user.status = new UserStatus(true);

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

  getAll(page: PageValueObject, limit: LimitValueObject): Promise<User[]> {
    const offSet = (page.value - 1) * limit.value;
    return Promise.resolve(this.users.slice(offSet, offSet + limit.value));
  }

  getByStatus(
    page: PageValueObject,
    limit: LimitValueObject,
    isActive: UserStatus,
  ): Promise<User[]> {
    const offSet = (page.value - 1) * limit.value;

    const filtered = this.users.filter(
      (user) => user.status.value === isActive.value,
    );

    const paginated = filtered.slice(offSet, offSet + limit.value);

    return Promise.resolve(paginated);
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
}
