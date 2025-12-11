import { Column, Entity, Index, OneToMany } from "typeorm";
import { Recipes } from "./Recipes";

@Index("ingredients_pk", ["ingredientId"], { unique: true })
@Index("ingredients_ingredientname", ["ingredientName"], { unique: true })
@Entity("ingredients", { schema: "yemek_tarifleri" })
export class Ingredients {
  @Column("character varying", { primary: true, name: "ingredient_id" })
  ingredientId: string;

  @Column("character varying", { name: "ingredient_name", unique: true })
  ingredientName: string;

  @OneToMany(() => Recipes, (recipes) => recipes.ingredient)
  recipes: Recipes[];
}
