import { UserCreatedAt } from "./UserCreatedAt";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";
import { UserPassword } from "./UserPassword";
import { UserStatus } from "./UserStatus";
import { UserUpdatedAt } from "./UserUpdatedAt";

export class User {
    id: UserId;
    name: UserName;
    email: UserEmail;
    password: UserPassword;
    createdAt: UserCreatedAt;
    updatedAt: UserUpdatedAt;
    role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN';
    status: boolean;

    constructor(
        id: UserId, 
        name: UserName, 
        email: UserEmail, 
        password: UserPassword,
        createdAt: UserCreatedAt, 
        updatedAt: UserUpdatedAt,
        role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN',
        status: UserStatus    
    )
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.role = role;
        this.status = status.value

    }

    public desactivate(){
        this.status = false
    }

    public activate(){
        this.status= true
    }

    public mapToPrimitives(){
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            password: this.password.value,
            createdAt: this.createdAt.value,
            role: this.role,
            status: this.status
        }
    }
}