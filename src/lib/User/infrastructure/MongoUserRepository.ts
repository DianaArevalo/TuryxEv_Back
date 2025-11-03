import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserId } from "../domain/entities/User/value-objects/UserId";
import { UserName } from "../domain/entities/User/value-objects/UserName";
import { UserEmail } from "../domain/entities/User/value-objects/UserEmail";
import { UserPassword } from "../domain/entities/User/value-objects/UserPassword";
import { UserCreatedAt } from "../domain/entities/User/value-objects/UserCreatedAt";
import UserModel from "./UserModel"; // Tu esquema de mongoose
import { UserUpdatedAt } from "../domain/entities/User/value-objects/UserUpdatedAt";
import { Hasher } from "../../Shared/Infraestructure/Hasher";
import { UserStatus } from "../domain/entities/User/value-objects/UserStatus";


export class MongoUserRepository implements UserRepository {
  
  async create(user: User): Promise<void> {
    await UserModel.create({
        id: user.id.value,
        name: user.name.value,
        email: user.email.value,
        password: await Hasher.hash(user.password.value), 
        createdAt: user.createdAt.value,
        updatedAt: user.updatedAt.value,       
        role: user.role,
        status: user.status
    });
  }

  async getOneById(id: UserId): Promise<User | null> {
    const record = await UserModel.findById({ _id: id.value, status: true }).exec();
    if (!record) return null;

    return new User(
        new UserId(record.id),
        new UserName(record.name),
        new UserEmail(record.email),
        new UserPassword(record.password),
        new UserCreatedAt(record.createdAt),
        new UserUpdatedAt(record.updatedAt),        
        record.role,
        new UserStatus(record.status)
    );
  }

  async getAll(): Promise<User[]> {
      const records = await UserModel.find({status: true}).exec();

      return records.map(record => 
      new User(
        new UserId(record.id),
        new UserName(record.name),
        new UserEmail(record.email),
        new UserPassword(record.password),
        new UserCreatedAt(record.createdAt),
        new UserUpdatedAt(record.updatedAt),
        record.role,
        new UserStatus(record.status)
      )
    
      )
  }

  async getOneByEmail(email: UserEmail): Promise<User | null> {
    const record = await UserModel.findOne({ email: email.value }).exec();
    if (!record) return null;

    return new User(
        new UserId(record.id),
        new UserName(record.name),
        new UserEmail(record.email),
        new UserPassword(record.password),
        new UserCreatedAt(record.createdAt),
        new UserUpdatedAt(record.updatedAt),
        record.role,
        new UserStatus(record.status),
    );
  }

  async edit(user: User): Promise<void> {
    await UserModel.findByIdAndUpdate(user.id.value, {
        name: user.name.value,
        email: user.email.value,
        password: await Hasher.hash(user.password.value),        
        role: user.role
    }, {new: true});
  }

  async delete(id: UserId): Promise<void> {
    await UserModel.findByIdAndDelete(id.value);
  }
}
