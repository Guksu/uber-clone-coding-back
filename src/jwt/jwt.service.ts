import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from '../common/common.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(userid: number): string {
    return jwt.sign({ id: userid }, this.options.token_secret);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.token_secret);
  }
}
