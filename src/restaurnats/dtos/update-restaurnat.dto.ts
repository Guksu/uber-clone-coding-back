import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurnatDto } from './create-restaurnat';

@InputType()
export class UpdateRestaurnatInputType extends PartialType(
  CreateRestaurnatDto,
) {}

@ArgsType()
export class UpdateRestaurnatDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurnatInputType)
  data: UpdateRestaurnatInputType;
}
