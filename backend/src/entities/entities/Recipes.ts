import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Categories } from "./Categories";
import { RecipeIngredients } from "./RecipeIngredients";
import { Users } from "./Users";

@Index("recipes_pk", ["recipeId"], { unique: true })
@Entity("recipes", { schema: "yemek_tarifleri" })
export class Recipes {
  @Column("integer", { primary: true, name: "recipe_id" })
  recipeId: number;

  @Column("character varying", { name: "recipe_title" })
  recipeTitle: string;

  @Column("character varying", { name: "recipe_content" })
  recipeContent: string;

  @Column("date", { name: "recipe_createdate", nullable: true })
  recipeCreatedate: string | null;

  @ManyToOne(() => Categories, (categories) => categories.recipes)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Categories;

  @OneToMany(() => RecipeIngredients, (ri) => ri.recipe)
  recipeIngredients: RecipeIngredients[];

  @ManyToOne(() => Users, (users) => users.recipes)
  @JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
  user: Users;
}
