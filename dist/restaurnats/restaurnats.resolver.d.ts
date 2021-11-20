import { User } from 'src/users/entities/user.entity';
import { CreateRestaurnatInput, CreateRestaurnatOutput } from './dtos/create-restaurnat';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-res.dto';
import { RestaurnatService } from './restaurnats.service';
export declare class RestaurnatResolver {
    private readonly restaurnatService;
    constructor(restaurnatService: RestaurnatService);
    createRestaurnat(authUser: User, createRestaurnatInput: CreateRestaurnatInput): Promise<CreateRestaurnatOutput>;
    editRestaurant(authUser: User, editRestaurantInput: EditRestaurantInput): EditRestaurantOutput;
}
