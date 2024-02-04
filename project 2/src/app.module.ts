import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DuaEntity} from './Entity/dua.entity'
import {CategoryEntity} from './Entity/category.entity'
import {SubCategoryEntity} from './Entity/sub_category.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      
      "type": "sqlite",
      "database": "dua_main.sqlite",
      // "entities": ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities:true,
      // "synchronize": true,
      "logging": true
    
    }),
    TypeOrmModule.forFeature([DuaEntity,CategoryEntity,SubCategoryEntity,])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
