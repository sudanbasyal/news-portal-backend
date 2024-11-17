import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { Category } from "./Category";

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

  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
  @JoinTable({
    name: "article_tags",
    joinColumn: {
      name: "article_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.articles, {
    nullable: false,
  })
  category: Category;
}
