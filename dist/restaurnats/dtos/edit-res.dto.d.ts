import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateRestaurnatInput } from './create-restaurnat';
declare const EditRestaurantInput_base: import("@nestjs/common").Type<Partial<CreateRestaurnatInput>>;
export declare class EditRestaurantInput extends EditRestaurantInput_base {
    restaurantId: number;
}
export declare class EditRestaurantOutput extends CoreOutput {
}
export {};
