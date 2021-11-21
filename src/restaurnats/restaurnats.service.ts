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
// 전체 흐름: AppModule - TypeOrmModule - RestaurantsModule - RestaurantResolver - RestaurantService

// 1) TypeOrmModule에 DB로 전송할 entity들 설정

// 2) RestaurantsModule
// : TypeOrmModule의 Restaurant 엔티티를 다른 곳에서 Inject할 수 있도록 import하기.
// : providers에 RestaurantService 주입 => RestaurantResolver에서 사용 가능.

// 3) RestaurantService
// : @InjectReposity(entity): 전달받은 entity를 기반으로 Repository 생성.
// : Repository의 메서드들로 DB에 접근하는 방식 지정.

// 4) RestaurantResolver
// : GraphQL Query/Mutation으로 DB에 접근하는 RestaurantService의 메서드들 활용.
