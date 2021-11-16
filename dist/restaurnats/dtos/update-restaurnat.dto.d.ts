import { CreateRestaurnatDto } from './create-restaurnat';
declare const UpdateRestaurnatInputType_base: import("@nestjs/common").Type<Partial<CreateRestaurnatDto>>;
export declare class UpdateRestaurnatInputType extends UpdateRestaurnatInputType_base {
}
export declare class UpdateRestaurnatDto {
    id: number;
    data: UpdateRestaurnatInputType;
}
export {};
