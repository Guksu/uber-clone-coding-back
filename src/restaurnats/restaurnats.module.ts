import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entitiy';
import { Restaurnat } from './entities/restaurnat.entity';
import { RestaurnatResolver } from './restaurnats.resolver';
import { RestaurnatService } from './restaurnats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurnat, Category])],
  providers: [RestaurnatResolver, RestaurnatService],
})
export class RestaurnatsModule {}
