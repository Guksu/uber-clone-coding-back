import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //arg으로 createAccountInput 는 {email,password,role}과 같다
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    // find는 리스트를 반환하고 findOne은 객체를 반환한다. 따라서 findOne(createAccount.email)은
    // findOne({email})과 같다.
    try {
      const exists = await this.user.findOne({ email });
      if (exists) {
        return { ok: false, error: 'Email is alreadt exists' };
      }
      await this.user.save(this.user.create({ email, password, role }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Can't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.user.findOne({ email });
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

  async findById(id: number): Promise<User> {
    return this.user.findOne({ id });
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.user.findOne(userId);
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    //update의 경우 entity를 경유하지 않고 db로 바로 이동하기 때문에 비밀번호 저장시 hash를 할 수 없다.
    return this.user.save(user);
  }
}
