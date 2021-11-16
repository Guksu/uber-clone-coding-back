import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurnatDto } from './dtos/create-restaurnat';
import { UpdateRestaurnatDto } from './dtos/update-restaurnat.dto';
import { Restaurnat } from './entities/restaurnat.entity';
import { RestaurnatService } from './restaurnats.service';

@Resolver((type) => Restaurnat)
export class RestaurnatResolver {
  constructor(private readonly restaurnatService: RestaurnatService) {}

  @Query((returns) => [Restaurnat])
  restaurnat(): Promise<Restaurnat[]> {
    return this.restaurnatService.getAll();
  }

  @Mutation((returns) => Boolean)
  //arg를 입력하는 방법 1
  // @Args('name') name: string,
  // @Args('isVegan') isVegan: boolean,
  // @Args('address') address: string,
  // @Args('ownerName') ownerName: string,
  //arg를 입력하는 방법 2
  async createRestaurnat(
    @Args('input') CreateRestaurnatDto: CreateRestaurnatDto,
  ): Promise<boolean> {
    try {
      await this.restaurnatService.createRestaurnat(CreateRestaurnatDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation((retunns) => Boolean)
  async updateRestaurnat(
    @Args() updateRestaurantDto: UpdateRestaurnatDto,
  ): Promise<boolean> {
    try {
      await this.restaurnatService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
