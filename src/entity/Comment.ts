import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Article } from "./Article";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  phone: string;
  //nullable: true

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @Column()
  articleId: number;
}
