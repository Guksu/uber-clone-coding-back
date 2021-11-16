import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurnatDto } from './dtos/create-restaurnat';
import { UpdateRestaurnatDto } from './dtos/update-restaurnat.dto';
import { Restaurnat } from './entities/restaurnat.entity';

@Injectable()
export class RestaurnatService {
  constructor(
    @InjectRepository(Restaurnat)
    private readonly restaurants: Repository<Restaurnat>,
  ) {}
  getAll(): Promise<Restaurnat[]> {
    return this.restaurants.find();
  }

  createRestaurnat(
    CreateRestaurnatDto: CreateRestaurnatDto,
  ): Promise<Restaurnat> {
    const newRestaurnat = this.restaurants.create(CreateRestaurnatDto);
    return this.restaurants.save(newRestaurnat);
  }

  updateRestaurant(updateRestaurant: UpdateRestaurnatDto) {
    return this.restaurants.update(updateRestaurant.id, {
      ...updateRestaurant.data,
    });
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
