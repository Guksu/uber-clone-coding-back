import { UserRole } from 'src/users/entities/user.entity';
export declare type AllowedRole = keyof typeof UserRole | 'Any';
export declare const Role: (role: AllowedRole[]) => import("@nestjs/common").CustomDecorator<string>;
