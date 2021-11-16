import { CreateRestaurnatDto } from './dtos/create-restaurnat';
import { UpdateRestaurnatDto } from './dtos/update-restaurnat.dto';
import { Restaurnat } from './entities/restaurnat.entity';
import { RestaurnatService } from './restaurnats.service';
export declare class RestaurnatResolver {
    private readonly restaurnatService;
    constructor(restaurnatService: RestaurnatService);
    restaurnat(): Promise<Restaurnat[]>;
    createRestaurnat(CreateRestaurnatDto: CreateRestaurnatDto): Promise<boolean>;
    updateRestaurnat(updateRestaurantDto: UpdateRestaurnatDto): Promise<boolean>;
}
