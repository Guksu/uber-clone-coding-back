import { CoreEntity } from 'src/common/eentities/core.entity';
import { User } from './user.entity';
export declare class Verification extends CoreEntity {
    code: string;
    user: User;
    createCode(): void;
}
