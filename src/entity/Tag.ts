import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Article } from "./Article";

@Entity({ name: "tags" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
