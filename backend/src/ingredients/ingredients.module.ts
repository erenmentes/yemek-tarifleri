import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredients } from 'src/entities/entities/Ingredients';

@Module({
  imports : [
    TypeOrmModule.forFeature([Ingredients]),
  ],
  providers: [IngredientsService],
  controllers: [IngredientsController]
})
export class IngredientsModule {}
