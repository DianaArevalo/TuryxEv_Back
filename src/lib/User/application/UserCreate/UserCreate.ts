import { ProviderData, ProviderDataT, ValidationError } from "../../../../lib/Shared/domain";
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
    UserStatus,     
    UserUpdatedAt 
} from "../../domain/entities/User/value-objects";
import { UserRepository } from "../../domain/repositories";


interface UserCreateProps {
    id?: string;
    name: string;
    email: string;
    password?: string;
    picture?: string;
    plan?: string;
    role?: string;
    score?: number;
    providerData?: string;        
}

export class UserCreate {
    constructor (private readonly repository: UserRepository){}

    async handler(props: UserCreateProps){
        const createdAt = UserCreatedAt.now();

        const providerData = props.providerData ?? "AUTH";

        if (!props.password && props.providerData === "AUTH") 
            throw new ValidationError("Password is required for AUTH");        

        
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
            score: UserScore.create(props.score?? 5),
            createdAt: createdAt,
            updatedAt: UserUpdatedAt.now(createdAt),
            role: UserRole.create(props.role ?? "USER"),
            plan: props.plan 
                    ? UserPlan.create(props.plan) 
                    : UserPlan.default(),
            providerData: UserProvider.create(providerData as ProviderDataT),
            status: new UserStatus(true)
        });


        const created = await this.repository.create(user);

        return created.toResponse();
    }


   
}