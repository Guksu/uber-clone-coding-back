import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';

//InputType은 하나의 object이고
//ArgsType은 각각의 args를 입력받을 수 있다.

// npm i class-validator
// npm i class-transformer
// 위 두개를 설치하여 유효성을 검사할 수있다.
@ArgsType()
export class CreateRestaurnatDto {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @IsString()
  address: string;

  @Field((type) => String)
  @IsString()
  ownerName: string;
}
