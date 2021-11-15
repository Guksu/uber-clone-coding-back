import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurnatDto } from './dtos/create-restaurnat';
import { Restaurnat } from './entities/restaurnat.entity';

@Resolver((type) => Restaurnat)
export class RestaurnatResolver {
  @Query((returns) => Restaurnat)
  restaurnat(@Args('veganOnly') veganOnly: boolean): Restaurnat[] {
    return [];
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
