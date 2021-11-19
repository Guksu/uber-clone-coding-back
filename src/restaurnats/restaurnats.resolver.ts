import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/auth-decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { CreateAccountOutput } from 'src/users/dtos/create-account.dto';
import { User } from 'src/users/entities/user.entity';
import {
  CreateRestaurnatInput,
  CreateRestaurnatOutput,
} from './dtos/create-restaurnat';
import { Restaurnat } from './entities/restaurnat.entity';
import { RestaurnatService } from './restaurnats.service';

@Resolver((type) => Restaurnat)
export class RestaurnatResolver {
  constructor(private readonly restaurnatService: RestaurnatService) {}

  @Mutation((returns) => CreateAccountOutput)
  @Role(['Owner'])
  async createRestaurnat(
    @AuthUser() authUser: User,
    @Args('input') createRestaurnatInput: CreateRestaurnatInput,
  ): Promise<CreateRestaurnatOutput> {
    return await this.restaurnatService.createRestaurnat(
      authUser,
      createRestaurnatInput,
    );
  }
}
