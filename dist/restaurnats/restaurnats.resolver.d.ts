import { CreateRestaurnatDto } from './dtos/create-restaurnat';
import { Restaurnat } from './entities/restaurnat.entity';
export declare class RestaurnatResolver {
    restaurnat(veganOnly: boolean): Restaurnat[];
    createRestaurnat(CreateRestaurnatDto: CreateRestaurnatDto): boolean;
}
