import { Module } from '@nestjs/common';
import { RestaurnatResolver } from './restaurnats.resolver';

@Module({
  providers: [RestaurnatResolver],
})
export class RestaurnatsModule {}
