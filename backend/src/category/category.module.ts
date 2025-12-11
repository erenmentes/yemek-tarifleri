import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/entities/Categories';

@Module({
  imports : [
    TypeOrmModule.forFeature([Categories]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
