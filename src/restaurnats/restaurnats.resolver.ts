import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RestaurnatResolver {
  @Query((returns) => Boolean)
  isPizzaGood(): Boolean {
    return true;
  }
}
