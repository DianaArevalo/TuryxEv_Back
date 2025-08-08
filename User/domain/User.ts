import { UserCreatedAt } from "./UserCreatedAt";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";

export class User {
    id: UserId;
    name: UserName;
    email: UserEmail;
    password: UserPassword;
    createdAt: UserCreatedAt;
    role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN';

    constructor(
        id: UserId, 
        name: UserName, 
        email: UserEmail, 
        password: UserPassword,
        createdAt: UserCreatedAt, 
        role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN')
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password
        this.createdAt = createdAt;
        this.role = role;

    }
}