import { Hasher } from "../../../../lib/Shared/Infraestructure/Hasher";
import { Limit, Page } from "../../../../lib/Shared/domain";
import { User } from "../../domain/entities/User/User";
import { UserCreatedAt, UserEmail, UserId, UserName, UserPicture, UserPlan, UserProvider, UserRole, UserScore, UserStatus, UserUpdatedAt } from "../../domain/entities/User/value-objects";
import { UserRepository } from "../../domain/repositories";
import UserModel from "../models/UserModel";
import { UserNotFoundError } from "../../domain/exceptions";

export class MongoUserRepository implements UserRepository {
  
  async create(user: User): Promise<User>{
    const created = await UserModel.create({
      name: user.name.value,
      email: user.email.value,
      password: user.password
        ? await Hasher.hash(user.password.value)
        : undefined,
      picture: user.picture
        ? user.picture.value
        :undefined,
      plan: user.plan.toPrimitives(),
      role: user.role.toPrimitives(),
      providerData: user.providerData.toPrimitives(),
      status:  user.status?.value?? true,
      score: user.score?.value,

    });

    return this.createUserEntity(created);
  }

  async getOneById(id: UserId):Promise<User | null>{
    const record = await UserModel.findOne({
      _id: id.value,
    });

    if(!record) return null;

    return this.createUserEntity(record);
  }

  async getAll(page: Page, limit: Limit): Promise<User[]>{
    const offSet = (page.value - 1) * limit.value;

    const records = await UserModel.find()
    .skip(offSet)
    .limit(limit.value);

    return records.map((record) => this.createUserEntity(record));
  }

  async getOneByEmail(email: UserEmail): Promise <User | null>{
    const record = await UserModel.findOne({
      email: email.value,
    });

    if(!record) return null;

    return this.createUserEntity(record);
  }

  async edit(user: User): Promise<User>{
    const record = await UserModel.findOne({
      _id: user.idUser?.value
    }).exec();

    if(!record) throw new UserNotFoundError();

    return this.createUserEntity(record);
  }

  async softDelete(id: UserId): Promise<User>{
    const record =await UserModel.updateOne(
      {_id: id.value },
      { status: new UserStatus(false)},
    );

    return this.createUserEntity(record)
  }

  async getAllByStatus(isActive: UserStatus): Promise<User[]>{
    const records = await UserModel.find();
    return records.map((record) => this.createUserEntity(record))
  }

  private createUserEntity(record: any): User {
    return new User({
      idUser: new UserId(String(record._id)),
      name: new UserName(record.name),
      email: new UserEmail(record.email),
      picture: new UserPicture(record.picture),
      plan: UserPlan.fromPrimitives(record.plan),
      role: UserRole.fromPrimitives(record.role),      
      score: new UserScore(record.score),
      providerData: UserProvider.fromPrimitives(record.providerData),
      status: new UserStatus(record.status),
      createdAt: new UserCreatedAt(record.createdAt),
      updatedAt: new UserUpdatedAt(record.updatedAt)

    })
  }
}
