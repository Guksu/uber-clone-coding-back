import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurnat } from '../entities/restaurnat.entity';

//InputType은 하나의 object이고
//ArgsType은 각각의 args를 입력받을 수 있다.

// npm i class-validator
// npm i class-transformer
// 위 두개를 설치하여 유효성을 검사할 수있다.
@InputType()
export class CreateRestaurnatDto extends OmitType(
  Restaurnat,
  ['id'],
  InputType,
) {}
