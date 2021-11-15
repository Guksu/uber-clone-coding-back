import { CreateRestaurnatDto } from './dtos/create-restaurnat';
import { Restaurnat } from './entities/restaurnat.entity';
import { RestaurnatService } from './restaurnats.service';
export declare class RestaurnatResolver {
    private readonly restaurnatService;
    constructor(restaurnatService: RestaurnatService);
    restaurnat(): Promise<Restaurnat[]>;
    createRestaurnat(CreateRestaurnatDto: CreateRestaurnatDto): boolean;
}
