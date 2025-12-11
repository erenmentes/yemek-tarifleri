import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/entities/Users';
import { Comments } from 'src/entities/entities/Comments';
import { Recipes } from 'src/entities/entities/Recipes';
import { Categories } from 'src/entities/entities/Categories';
import { Ingredients } from 'src/entities/entities/Ingredients';
import { RecipeIngredients } from 'src/entities/entities/RecipeIngredients';
import { RecipesModule } from './recipes/recipes.module';
import { CategoryModule } from './category/category.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema : process.env.DB_SCHEMA,
      entities: [Users,Comments,Recipes,Categories,Ingredients,RecipeIngredients],
      synchronize: false,
      logging: true,
      extra: {
        ssl: false,
      },
    }),
    AuthModule,
    RecipesModule,
    CategoryModule,
    IngredientsModule,
  ],
  controllers: [
    AppController, 
  ],
  providers: [
    AppService, 
  ],
})
export class AppModule { }