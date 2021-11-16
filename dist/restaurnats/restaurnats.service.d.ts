import { Repository } from 'typeorm';
import { CreateRestaurnatDto } from './dtos/create-restaurnat';
import { UpdateRestaurnatDto } from './dtos/update-restaurnat.dto';
import { Restaurnat } from './entities/restaurnat.entity';
export declare class RestaurnatService {
    private readonly restaurants;
    constructor(restaurants: Repository<Restaurnat>);
    getAll(): Promise<Restaurnat[]>;
    createRestaurnat(CreateRestaurnatDto: CreateRestaurnatDto): Promise<Restaurnat>;
    updateRestaurant(updateRestaurant: UpdateRestaurnatDto): Promise<import("typeorm").UpdateResult>;
}
