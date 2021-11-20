import { Repository } from 'typeorm';
import { Category } from '../entities/category.entitiy';
export declare class CategoryRepository extends Repository<Category> {
    getOrCreate(name: string): Promise<Category>;
}
