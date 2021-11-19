import { CoreEntity } from 'src/common/eentities/core.entity';
import { Restaurnat } from './restaurnat.entity';
export declare class Category extends CoreEntity {
    name: string;
    coverImg: string;
    slug: string;
    restaurants: Restaurnat[];
}
