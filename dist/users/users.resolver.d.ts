import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    hi(): boolean;
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
}
