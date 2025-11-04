import { ProviderDataT, ValidationError } from "../../../../lib/Shared/domain";
import { User } from "../../domain/entities/User/User";
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
    UserUpdatedAt 
} from "../../domain/entities/User/value-objects";
import { UserRepository } from "../../domain/repositories";


interface UserCreateProps {
    id?: string;
    name: string;
    email: string;
    password?: string;
    picture?: string;
    plan: string;
    role: string;
    score: number;
    providerData: string;        
}

export class UserCreate {
    constructor (private readonly repository: UserRepository){}

    async handler(props: UserCreateProps){
        const createdAt = UserCreatedAt.now();

        if (!props.password && props.providerData === "AUTH") 
            throw new ValidationError("Password is required");


        const user = new User({
            idUser: UserId.create(""),            
            name: UserName.create(props.name),
            email: UserEmail.create(props.email),
            password: props.password
                ? UserPassword.create(props.password)
                : undefined,
            picture: props.picture
                ? new UserPicture(props.picture)
                : undefined,
            score: UserScore.create(5),
            createdAt: createdAt,
            updatedAt: UserUpdatedAt.now(createdAt),
            role: UserRole.create(props.role),
            plan: props.plan 
                    ? UserPlan.create(props.plan) 
                    : UserPlan.default(),
            providerData: UserProvider.create(props.providerData as ProviderDataT)
        });


        const created = await this.repository.create(user);

        return created.toResponse();
    }


   
}