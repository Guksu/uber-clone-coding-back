import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/eentities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './category.entitiy';
//typeorm을 통해 테이블을 코드로 작성 할 수 있다.
//DTO에서 유효성 검사를 할 수 있지만 entity에서도 유효성 감사를 할 수 있다.

//Inputtype에 name을 지정한것은 schema에서 inputype과 objecttype이 이름이 같기 떄문에 오류가 발생하기 때문이다.
@InputType('RestaurnatInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurnat extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;
}
