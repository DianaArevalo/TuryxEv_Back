import {
  UserRepositoryPort,
  User,
  UserId,
  UserStatus,
  UserEmail,
  UserNotFoundError,
  UserName,
  UserPicture,
  UserPlan,
  UserRole,
  UserScore,
  UserProviderData,
  UserCreatedAt,
  UserUpdatedAt,
} from '../../domain';
import { UserSchema, IUserDocument } from '../schemas';

import { PageValueObject, LimitValueObject } from '~/lib/shared/domain';
import { Hasher } from '~/lib/shared/infrastructure';

export class UserRepositoryMongoDBAdapter implements UserRepositoryPort {
  async create(user: User): Promise<User> {
    const created = await UserSchema.create({
      name: user.name.value,
      email: user.email.value,
      password: user.password
        ? await Hasher.hash(user.password.value)
        : undefined,
      picture: user.picture ? user.picture.value : undefined,
      plan: user.plan.toPrimitives(),
      role: user.role.toPrimitives(),
      providerData: user.providerData.toPrimitives(),
      status: user.status?.value ?? true,
      score: user.score?.value,
    });

    return this.createUserEntity(created);
  }

  async getOneById(id: UserId): Promise<User | null> {
    const record = await UserSchema.findOne({
      _id: id.value,
    });

    if (!record) return null;

    return this.createUserEntity(record);
  }

  async getAll(
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<User[]> {
    const offSet = (page.value - 1) * limit.value;

    const records = await UserSchema.find().skip(offSet).limit(limit.value);

    return records.map((record) => this.createUserEntity(record));
  }

  async getByStatus(
    page: PageValueObject,
    limit: LimitValueObject,
    isActive: UserStatus,
  ): Promise<User[]> {
    const offSet = (page.value - 1) * limit.value;
    const records = await UserSchema.find({ status: isActive.value })
      .skip(offSet)
      .limit(limit.value);
    return records.map((record) => this.createUserEntity(record));
  }

  async getOneByEmail(email: UserEmail): Promise<User | null> {
    const record = await UserSchema.findOne({
      email: email.value,
    });

    if (!record) return null;

    return this.createUserEntity(record);
  }

  async edit(user: User): Promise<User> {
    const updated = await UserSchema.findByIdAndUpdate(
      user.idUser?.value,
      {
        ...(user.name && { name: user.name.value }),
        ...(user.password && { password: user.password.value }),
        ...(user.picture && { picture: user.picture.value }),
        ...(user.score && { score: user.score.value }),
        ...(user.status && { status: user.status.value }),
        ...(user.role && { role: user.role.toPrimitives() }),
        updatedAt: new Date(),
      },
      { new: true },
    );

    if (!updated) throw new UserNotFoundError();

    return this.createUserEntity(updated);
  }

  async softDelete(id: UserId): Promise<void> {
    const userStatus = new UserStatus(false);

    const updated = await UserSchema.findByIdAndUpdate(
      id.value,
      { status: userStatus.value },
      { new: true },
    ).lean();

    if (!updated) throw new UserNotFoundError();
  }

  private createUserEntity(record: IUserDocument): User {
    return new User({
      idUser: new UserId(String(record._id)),
      name: new UserName(record.name),
      email: new UserEmail(record.email),
      picture: record.picture ? new UserPicture(record.picture) : undefined,
      plan: UserPlan.fromPrimitives(record.plan),
      role: UserRole.fromPrimitives(record.role),
      score: record.score ? new UserScore(record.score) : undefined,
      providerData: UserProviderData.fromPrimitives(record.providerData),
      status: record.status ? new UserStatus(record.status) : undefined,
      createdAt: new UserCreatedAt(record.createdAt),
      updatedAt: new UserUpdatedAt(record.updatedAt),
    });
  }
}
