import { User } from 'src/users/entities/user.entity';
import { CreateRestaurnatInput, CreateRestaurnatOutput } from './dtos/create-restaurnat';
import { DeleteRestaurantInput, DeleteRestaurantOutput } from './dtos/delete-res.dto';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-res.dto';
import { RestaurnatService } from './restaurnats.service';
export declare class RestaurnatResolver {
    private readonly restaurnatService;
    constructor(restaurnatService: RestaurnatService);
    createRestaurnat(authUser: User, createRestaurnatInput: CreateRestaurnatInput): Promise<CreateRestaurnatOutput>;
    editRestaurant(owner: User, editRestaurantInput: EditRestaurantInput): Promise<EditRestaurantOutput>;
    deleteRestaurant(owner: User, deleteRestaurantInput: DeleteRestaurantInput): Promise<DeleteRestaurantOutput>;
}
