import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/eentities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurnat } from './restaurnat.entity';

@InputType('CategryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((type) => [Restaurnat])
  @OneToMany((type) => Restaurnat, (restaurant) => restaurant.category)
  restaurants: Restaurnat[];
}
