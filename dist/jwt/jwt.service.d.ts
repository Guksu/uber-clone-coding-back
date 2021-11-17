import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt.interfaces';
export declare class JwtService {
    private readonly options;
    constructor(options: JwtModuleOptions);
    sign(userid: number): string;
    verify(token: string): string | jwt.JwtPayload;
}
