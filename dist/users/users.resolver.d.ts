import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    me(authUser: User): User;
}
