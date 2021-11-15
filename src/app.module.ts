import { Module } from '@nestjs/common';
// joi는 스키마 유효성 검사를 위한 라이브러리
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurnatsModule } from './restaurnats/restaurnats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Restaurnat } from './restaurnats/entities/restaurnat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod'),
        PASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.PASSWORD,
      database: 'uber-clone',
      entities: [Restaurnat],
      //배포시 false로 설정할 것
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    RestaurnatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
