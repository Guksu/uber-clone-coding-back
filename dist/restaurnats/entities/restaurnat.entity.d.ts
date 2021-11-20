import { CoreEntity } from 'src/common/eentities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from './category.entitiy';
export declare class Restaurnat extends CoreEntity {
    name: string;
    address: string;
    coverImg: string;
    category: Category;
    owner: User;
    ownerId: number;
}
