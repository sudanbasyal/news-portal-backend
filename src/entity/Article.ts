import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { Comment } from "./Comment";

@Entity({ name: "articles" })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  content: string;

  @Column()
  viewCount: number;

  @Column({ unique: true })
  slug: string;

  @Column({ enum: ["draft", "published", "archived"] })
  status: string;

  @Column({ default: false })
  isBreaking: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToOne(() => Category, (category) => category.articles, {
    nullable: false,
  })
  category: Category;

  @Column()
  categoryId: number;
}
