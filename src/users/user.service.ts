import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email-dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  //arg으로 createAccountInput 는 {email,password,role}과 같다
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    // find는 리스트를 반환하고 findOne은 객체를 반환한다. 따라서 findOne(createAccount.email)은
    // findOne({email})과 같다.
    try {
      const exists = await this.user.findOne({ email });
      if (exists) {
        return { ok: false, error: 'Email is alreadt exists' };
      }
      const user = await this.user.save(
        this.user.create({ email, password, role }),
      );
      const verification = await this.verification.save(
        this.verification.create({
          user,
        }),
      );
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Can't create account" };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      // 아래 의 user코드는
      // SELECT * FROM id, password FROM user WHERE email =" "
      // 와 같은 의미
      const user = await this.user.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return { ok: false, error: 'User not found' };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Password is wrong' };
      }

      // token은 사용자도 그 내용을 확인할 수 있기 때문에 중요한 정보를 포함하는것은 안 된다.
      // token은 이 앱에서만의 유효한 인증을 할 수 있게 해준다.
      const token = this.jwtService.sign(user.id);
      return { ok: true, token };
    } catch (error) {
      return {
        ok: false,
        error: 'Fail to login',
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.user.findOne({ id });
      if (user) {
        return {
          ok: true,
          user: user,
        };
      }
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.user.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        const verification = await this.verification.save(
          this.verification.create({ user }),
        );
        this.mailService.sendVerificationEmail(user.email, verification.code);
      }

      if (password) {
        user.password = password;
      }
      //update의 경우 entity를 경유하지 않고 db로 바로 이동하기 때문에 비밀번호 저장시 hash를 할 수 없다.
      await this.user.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return { ok: false, error: "Can't Update profile" };
    }
  }

  async verfiyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verification.findOne(
        { code },
        { relations: ['user'] },
      );

      if (verification) {
        verification.user.verified = true;
        await this.user.save(verification.user);
        await this.verification.delete(verification.id);
        return { ok: true };
      }

      return { ok: false, error: 'Verification not found' };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
