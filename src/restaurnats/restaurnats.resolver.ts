import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/auth-decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { CreateAccountOutput } from 'src/users/dtos/create-account.dto';
import { User } from 'src/users/entities/user.entity';
import {
  CreateRestaurnatInput,
  CreateRestaurnatOutput,
} from './dtos/create-restaurnat';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-res.dto';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-res.dto';
import { Category } from './entities/category.entitiy';
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

  @Mutation((returns) => EditRestaurantOutput)
  @Role(['Owner'])
  editRestaurant(
    @AuthUser() owner: User,
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    return this.restaurnatService.editRestaurant(owner, editRestaurantInput);
  }

  @Mutation((returns) => DeleteRestaurantOutput)
  @Role(['Owner'])
  deleteRestaurant(
    @AuthUser() owner: User,
    @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    return this.restaurnatService.deleteRestaurant(
      owner,
      deleteRestaurantInput,
    );
  }
}
