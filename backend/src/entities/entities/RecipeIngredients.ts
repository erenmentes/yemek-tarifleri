import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Recipes } from "./Recipes";
import { Ingredients } from "./Ingredients";

@Entity()
export class RecipeIngredients {
  @ManyToOne(() => Recipes, recipe => recipe.recipeIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipes;

  @ManyToOne(() => Ingredients, ingredient => ingredient.ingredientId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredients;
};
