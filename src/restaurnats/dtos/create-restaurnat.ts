import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Restaurnat } from '../entities/restaurnat.entity';

//InputType은 하나의 object이고
//ArgsType은 각각의 args를 입력받을 수 있다.

// npm i class-validator
// npm i class-transformer
// 위 두개를 설치하여 유효성을 검사할 수있다.
@InputType()
export class CreateRestaurnatInput extends PickType(Restaurnat, [
  'name',
  'coverImg',
  'address',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurnatOutput extends CoreOutput {}
