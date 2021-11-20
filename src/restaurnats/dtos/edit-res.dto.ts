import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateRestaurnatInput } from './create-restaurnat';

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurnatInput) {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput {}
