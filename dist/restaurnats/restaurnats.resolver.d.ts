import { User } from 'src/users/entities/user.entity';
import { CreateRestaurnatInput, CreateRestaurnatOutput } from './dtos/create-restaurnat';
import { RestaurnatService } from './restaurnats.service';
export declare class RestaurnatResolver {
    private readonly restaurnatService;
    constructor(restaurnatService: RestaurnatService);
    createRestaurnat(authUser: User, createRestaurnatInput: CreateRestaurnatInput): Promise<CreateRestaurnatOutput>;
}
