import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountOutput } from 'src/users/dtos/create-account.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurnatInput } from './dtos/create-restaurnat';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-res.dto';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-res.dto';
import { Category } from './entities/category.entitiy';
import { Restaurnat } from './entities/restaurnat.entity';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class RestaurnatService {
  constructor(
    @InjectRepository(Restaurnat)
    private readonly restaurants: Repository<Restaurnat>,
    private readonly category: CategoryRepository,
  ) {}

  async createRestaurnat(
    owner: User,
    createRestaurnatInput: CreateRestaurnatInput,
  ): Promise<CreateAccountOutput> {
    try {
      const newRestaurnat = this.restaurants.create(createRestaurnatInput);
      newRestaurnat.owner = owner;

      const category = await this.category.getOrCreate(
        createRestaurnatInput.categoryName,
      );

      newRestaurnat.category = category;
      await this.restaurants.save(newRestaurnat);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Can't create restaurnat",
      };
    }
  }

  async editRestaurant(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      const restaurnat = await this.restaurants.findOneOrFail(
        editRestaurantInput.restaurantId,
      );

      if (!restaurnat) {
        return { ok: false, error: 'Restaurant not found' };
      }

      if (owner.id !== restaurnat.ownerId) {
        return {
          ok: false,
          error: "Can't edit restaurant",
        };
      }

      let category: Category = null;
      if (editRestaurantInput.categoryName) {
        category = await this.category.getOrCreate(
          editRestaurantInput.categoryName,
        );
      }
      await this.restaurants.save([
        {
          id: editRestaurantInput.restaurantId,
          name: editRestaurantInput.name,
          ...editRestaurantInput,
          ...(category && { category }),
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Can't edit restaurant" };
    }
  }

  async deleteRestaurant(
    owner: User,
    { restaurantId }: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: "You can't delete a restaurant that you don't own",
        };
      }
      await this.restaurants.delete(restaurantId);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not delete restaurant.',
      };
    }
  }
}

//
// ?????? ??????: AppModule - TypeOrmModule - RestaurantsModule - RestaurantResolver - RestaurantService

// 1) TypeOrmModule??? DB??? ????????? entity??? ??????

// 2) RestaurantsModule
// : TypeOrmModule??? Restaurant ???????????? ?????? ????????? Inject??? ??? ????????? import??????.
// : providers??? RestaurantService ?????? => RestaurantResolver?????? ?????? ??????.

// 3) RestaurantService
// : @InjectReposity(entity): ???????????? entity??? ???????????? Repository ??????.
// : Repository??? ??????????????? DB??? ???????????? ?????? ??????.

// 4) RestaurantResolver
// : GraphQL Query/Mutation?????? DB??? ???????????? RestaurantService??? ???????????? ??????.
