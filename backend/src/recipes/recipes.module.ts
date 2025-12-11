import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipes } from 'src/entities/entities/Recipes';
import { CategoryModule } from 'src/category/category.module';
import { Categories } from 'src/entities/entities/Categories';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeIngredients } from 'src/entities/entities/RecipeIngredients';
import { Users } from 'src/entities/entities/Users';
import { Ingredients } from 'src/entities/entities/Ingredients';

@Module({
  imports : [
    TypeOrmModule.forFeature([Recipes,Categories,RecipeIngredients,Users,Ingredients]),CategoryModule,AuthModule
  ],
  providers: [RecipesService],
  controllers: [RecipesController],
  exports : [RecipesService],
})
export class RecipesModule {}
