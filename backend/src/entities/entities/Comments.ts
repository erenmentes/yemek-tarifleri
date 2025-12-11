import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("comments_pk", ["commentId"], { unique: true })
@Entity("comments", { schema: "yemek_tarifleri" })
export class Comments {
  @Column("integer", { primary: true, name: "comment_id" })
  commentId: number;

  @Column("character varying", { name: "content" })
  content: string;

  @ManyToOne(() => Users, (users) => users.comments)
  @JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
  user: Users;
}
