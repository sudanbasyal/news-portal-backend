import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
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

  @Column()
  isBreaking: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}
