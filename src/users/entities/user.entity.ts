import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/eentities/core.entity';
import { Restaurnat } from 'src/restaurnats/entities/restaurnat.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

export enum UserRole {
  Client = 'CLIENT',
  Owner = 'OWNER',
  Delivery = 'DELIVERY',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((tyep) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((tyep) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((tyep) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  //typORM과 MYsql버그로 인하여 boolean은 tinyint타입으로 저장되며 0은 false 1은 true로 저장된다
  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field((type) => [Restaurnat])
  @OneToMany((type) => Restaurnat, (restaurant) => restaurant.owner, {
    onDelete: 'CASCADE',
  })
  restaurants: Restaurnat[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
