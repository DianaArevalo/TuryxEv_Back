import { 
    UserCreatedAt, 
    UserEmail, 
    UserId, 
    UserName, 
    UserPassword, 
    UserPicture, 
    UserPlan, 
    UserProvider, 
    UserRole, 
    UserScore, 
    UserStatus, 
    UserUpdatedAt 
} from "./value-objects";


export interface UserI {
    idUser: UserId;
    name: UserName;
    email: UserEmail;
    password?: UserPassword;
    picture?: UserPicture;
    plan: UserPlan;
    role: UserRole;
    score?: UserScore;
    providerData: UserProvider;
    status?: UserStatus;
    createdAt: UserCreatedAt;
    updatedAt: UserUpdatedAt;   
    
}

export class User implements UserI {
    idUser: UserId;
    name: UserName;
    email: UserEmail;
    password?: UserPassword;
    picture?: UserPicture;
    plan: UserPlan;
    role: UserRole;
    score?: UserScore;
    providerData: UserProvider;
    status?: UserStatus;
    createdAt: UserCreatedAt;
    updatedAt: UserUpdatedAt;
    


    constructor(attr: UserI){
        this.idUser = attr.idUser;
        this.name = attr.name;
        this.email = attr.email;
        this.password = attr.password;
        this.picture =attr.picture;
        this.plan = attr.plan;
        this.role = attr.role;
        this.score = attr.score;
        this.providerData = attr.providerData;
        this.status = attr.status;
        this.createdAt = attr.createdAt;
        this.updatedAt = attr.updatedAt        
    }

    //
    toResponse(){
        return {
            idUser: this.idUser.value,
            name: this.name.value,
            email: this.email.value,
            picture: this.picture?.value,
            plan: this.plan.value,
            role: this.role.value,
            score: this.score?.value,
            providerData: this.providerData.value,
            status: this.status?.value
        }
    }
  
}


    