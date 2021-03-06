import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email-dto';
import { MailService } from 'src/mail/mail.service';
export declare class UserService {
    private readonly user;
    private readonly verification;
    private readonly jwtService;
    private readonly mailService;
    constructor(user: Repository<User>, verification: Repository<Verification>, jwtService: JwtService, mailService: MailService);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<CreateAccountOutput>;
    login({ email, password }: LoginInput): Promise<LoginOutput>;
    findById(id: number): Promise<UserProfileOutput>;
    editProfile(userId: number, { email, password }: EditProfileInput): Promise<EditProfileOutput>;
    verifiyEmail(code: string): Promise<VerifyEmailOutput>;
}
