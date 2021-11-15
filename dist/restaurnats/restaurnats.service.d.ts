import { Repository } from 'typeorm';
import { Restaurnat } from './entities/restaurnat.entity';
export declare class RestaurnatService {
    private readonly restaurants;
    constructor(restaurants: Repository<Restaurnat>);
    getAll(): Promise<Restaurnat[]>;
}
