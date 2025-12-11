import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/entities/Categories';
import { Recipes } from 'src/entities/entities/Recipes';
import { Repository } from 'typeorm';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { RecipeIngredients } from 'src/entities/entities/RecipeIngredients';
import { Users } from 'src/entities/entities/Users';
import { Ingredients } from 'src/entities/entities/Ingredients';

@Injectable()
export class RecipesService {
    constructor(@InjectRepository(Recipes) private recipesRepo: Repository<Recipes>, @InjectRepository(Categories) private categoriesRepo: Repository<Categories>, @InjectRepository(RecipeIngredients) private recipeIngredientsRepo: Repository<RecipeIngredients>, @InjectRepository(Users) private usersRepo: Repository<Users>, @InjectRepository(Ingredients) private ingredientsRepo: Repository<Ingredients>) { }

    async getAllRecipes() {
        return await this.recipesRepo.find();
    };

    async getRecipeById(recipeId: number) {
        return await this.recipesRepo.findOne({ where: { recipeId: recipeId } });
    };

    async createNewRecipe(@Body() createRecipeDto: CreateRecipeDTO, @Body('author') authorUsername: string) {
        const FoundUser = await this.usersRepo.findOne({ where: { username: authorUsername } });

        if (!FoundUser) {
            return "?"
        };

        var FoundCategory = await this.categoriesRepo.findOne({ where: { categoryName: createRecipeDto.category_name } });

        if (!FoundCategory) {
            const newCategory = this.categoriesRepo.create({ categoryName: createRecipeDto.category_name });
            FoundCategory = await this.categoriesRepo.save(newCategory);
        };

        const now = new Date()
        const formattedDate = now.toString();

        const newRecipe = {
            recipe_title: createRecipeDto.recipe_title,
            recipe_content: createRecipeDto.recipe_content,
            recipe_createdate: formattedDate,
            category_id: FoundCategory.categoryId,
            user_id: FoundUser?.user_id
        };

        const createdRecipe =  this.recipesRepo.create({ recipeTitle: newRecipe.recipe_title, recipeContent: newRecipe.recipe_content, recipeCreatedate: newRecipe.recipe_createdate, category: FoundCategory, user: FoundUser });
        await this.recipesRepo.save(createdRecipe);

        await Promise.all(createRecipeDto.IngredientList.map(async ingredient => {
            var foundIngredient = await this.ingredientsRepo.findOne({ where: { ingredientName: ingredient.toString() } });
            if (!foundIngredient) {
                const newIngredient = this.ingredientsRepo.create({ ingredientName: ingredient.toString() });
                await this.ingredientsRepo.save(newIngredient);
                foundIngredient = newIngredient;
            };
            const createdRecipeIngredientRow = this.recipeIngredientsRepo.create({ recipe: createdRecipe, ingredient: foundIngredient });
            await this.recipeIngredientsRepo.save(createdRecipeIngredientRow)
        }));

        return "Recipe " + createRecipeDto.recipe_title + " created successfully!";

    };

    async deleteRecipe(@Body('recipe_title') recipeTitle: string) {
        const IsExists = await this.recipesRepo.findOne({ where: { recipeTitle: recipeTitle } });
        if (!IsExists) return "Recipe does not exists.";

        await this.recipesRepo.delete({ recipeTitle: recipeTitle });

        return "Recipe " + recipeTitle + " deleted successfully!";
    };

    async updateRecipe(@Body() createRecipeDto: CreateRecipeDTO) {
        const IsExists = await this.recipesRepo.findOne({ where: { recipeTitle: createRecipeDto.recipe_title } });
        if (!IsExists) return "Recipe does not exists.";

        const now = new Date()
        const formattedDate = now.toString();


        return await this.recipesRepo.update({ recipeTitle: createRecipeDto.recipe_title }, { recipeTitle: createRecipeDto.recipe_title, recipeContent: createRecipeDto.recipe_content, recipeCreatedate: formattedDate });
    };

}
