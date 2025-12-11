import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Recipes } from "./Recipes";
import { Ingredients } from "./Ingredients";

@Entity()
export class RecipeIngredients {
  @PrimaryColumn({ name: 'recipe_id', type: 'integer' })
  recipeId: number;

  @PrimaryColumn({ name: 'ingredient_id', type: 'character varying' })
  ingredientId: string;

  @ManyToOne(() => Recipes, recipe => recipe.recipeIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'recipeId' })
  recipe: Recipes;

  @ManyToOne(() => Ingredients, ingredient => ingredient.ingredientId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'ingredientId' })
  ingredient: Ingredients;
};
