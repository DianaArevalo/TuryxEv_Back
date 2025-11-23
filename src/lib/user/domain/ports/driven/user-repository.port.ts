import { User, UserEmail, UserId, UserStatus } from '../../entities';

import { LimitValueObject, PageValueObject } from '~/lib/shared/domain';

export interface UserRepositoryPort {
  create(user: User): Promise<User>;
  getAll(page: PageValueObject, limit: LimitValueObject): Promise<User[]>;
  getByStatus(
    page: PageValueObject,
    limit: LimitValueObject,
    isActive: UserStatus,
  ): Promise<User[]>;
  getOneById(id: UserId): Promise<User | null>;
  getOneByEmail(email: UserEmail): Promise<User | null>;
  edit(user: User): Promise<User>;
  softDelete(id: UserId): Promise<void>;
}
