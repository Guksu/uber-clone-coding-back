import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurnatDto } from './dtos/create-restaurnat';
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
  createRestaurnat(
    //arg를 입력하는 방법 1
    // @Args('name') name: string,
    // @Args('isVegan') isVegan: boolean,
    // @Args('address') address: string,
    // @Args('ownerName') ownerName: string,

    //arg를 입력하는 방법 2
    @Args() CreateRestaurnatDto: CreateRestaurnatDto,
  ): boolean {
    return true;
  }
}
