import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/eentities/core.entity';
import { Column, Entity } from 'typeorm';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((tyep) => String)
  email: string;

  @Column()
  @Field((tyep) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((tyep) => String)
  role: UserRole;
}