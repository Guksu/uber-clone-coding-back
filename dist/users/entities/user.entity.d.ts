import { CoreEntity } from 'src/common/eentities/core.entity';
import { Restaurnat } from 'src/restaurnats/entities/restaurnat.entity';
export declare enum UserRole {
    Client = "CLIENT",
    Owner = "OWNER",
    Delivery = "DELIVERY"
}
export declare class User extends CoreEntity {
    email: string;
    password: string;
    role: UserRole;
    verified: boolean;
    restaurants: Restaurnat[];
    hashPassword(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
}
