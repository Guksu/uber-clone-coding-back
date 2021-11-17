import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/users/user.service';
import { JwtService } from './jwt.service';
export declare class JwtMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
