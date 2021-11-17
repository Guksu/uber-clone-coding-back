import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
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

      return { ok: true, token: 'Login !' };
    } catch (error) {
      return {
        ok: false,
        error: 'Fail to login',
      };
    }
  }
}
