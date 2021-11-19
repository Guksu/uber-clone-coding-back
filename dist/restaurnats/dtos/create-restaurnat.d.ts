import { CoreOutput } from 'src/common/dto/output.dto';
import { Restaurnat } from '../entities/restaurnat.entity';
declare const CreateRestaurnatInput_base: import("@nestjs/common").Type<Pick<Restaurnat, "name" | "coverImg" | "address">>;
export declare class CreateRestaurnatInput extends CreateRestaurnatInput_base {
    categoryName: string;
}
export declare class CreateRestaurnatOutput extends CoreOutput {
}
export {};
