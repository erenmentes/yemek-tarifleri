import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./Comments";
import { Recipes } from "./Recipes";

@Index("users_pk", ["user_id"], { unique: true })
@Index("users_username", ["username"], { unique: true })
@Entity("users", { schema: "yemek_tarifleri" })
export class Users {
  
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column("character varying", { name: "username", unique: true })
  username: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "role" })
  role: string;

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Recipes, (recipes) => recipes.user)
  recipes: Recipes[];
}