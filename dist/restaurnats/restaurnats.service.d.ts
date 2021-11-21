import { CreateAccountOutput } from 'src/users/dtos/create-account.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurnatInput } from './dtos/create-restaurnat';
import { DeleteRestaurantInput, DeleteRestaurantOutput } from './dtos/delete-res.dto';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-res.dto';
import { Restaurnat } from './entities/restaurnat.entity';
import { CategoryRepository } from './repository/category.repository';
export declare class RestaurnatService {
    private readonly restaurants;
    private readonly category;
    constructor(restaurants: Repository<Restaurnat>, category: CategoryRepository);
    createRestaurnat(owner: User, createRestaurnatInput: CreateRestaurnatInput): Promise<CreateAccountOutput>;
    editRestaurant(owner: User, editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput>;
    deleteRestaurant(owner: User, { restaurantId }: DeleteRestaurantInput): Promise<DeleteRestaurantOutput>;
}
