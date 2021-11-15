import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurnat } from './entities/restaurnat.entity';
import { RestaurnatResolver } from './restaurnats.resolver';
import { RestaurnatService } from './restaurnats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurnat])],
  providers: [RestaurnatResolver, RestaurnatService],
})
export class RestaurnatsModule {}
