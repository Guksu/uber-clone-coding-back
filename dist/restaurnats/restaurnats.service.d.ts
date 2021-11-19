import { CreateAccountOutput } from 'src/users/dtos/create-account.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurnatInput } from './dtos/create-restaurnat';
import { Category } from './entities/category.entitiy';
import { Restaurnat } from './entities/restaurnat.entity';
export declare class RestaurnatService {
    private readonly restaurants;
    private readonly category;
    constructor(restaurants: Repository<Restaurnat>, category: Repository<Category>);
    createRestaurnat(owner: User, createRestaurnatInput: CreateRestaurnatInput): Promise<CreateAccountOutput>;
}
