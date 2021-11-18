import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
export declare class UserService {
    private readonly user;
    private readonly jwtService;
    constructor(user: Repository<User>, jwtService: JwtService);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<{
        ok: boolean;
        error?: string;
    }>;
    login({ email, password, }: LoginInput): Promise<{
        ok: boolean;
        error?: string;
        token?: string;
    }>;
    findById(id: number): Promise<User>;
    editProfile(userId: number, { email, password }: EditProfileInput): Promise<User>;
}
