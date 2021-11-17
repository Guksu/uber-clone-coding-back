import { Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((tyep) => Number)
  id: number;

  @CreateDateColumn()
  @Field((tyep) => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field((tyep) => Date)
  updateAt: Date;
}
