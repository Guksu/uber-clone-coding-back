import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<User>);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<{
        ok: boolean;
        error?: string;
    }>;
}
