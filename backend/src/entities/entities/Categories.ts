import { Column, Entity, Index, OneToMany } from "typeorm";
import { Recipes } from "./Recipes";

@Index("categories_pk", ["categoryId"], { unique: true })
@Index("categories_categoryname", ["categoryName"], { unique: true })
@Entity("categories", { schema: "yemek_tarifleri" })
export class Categories {
  @Column("integer", { primary: true, name: "category_id" })
  categoryId: number;

  @Column("character varying", { name: "category_name", unique: true })
  categoryName: string;

  @OneToMany(() => Recipes, (recipes) => recipes.category)
  recipes: Recipes[];
}
