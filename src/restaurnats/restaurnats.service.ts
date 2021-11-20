import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountOutput } from 'src/users/dtos/create-account.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurnatInput } from './dtos/create-restaurnat';
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

  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.category.findOne({ slug: categorySlug });
    if (!category) {
      category = await this.category.save(
        this.category.create({ slug: categorySlug, name: categoryName }),
      );
    }
    return category;
  }

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
