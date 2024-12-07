import { Category } from "./Category";
import { Comment } from "./Comment";
export declare class Article {
    id: number;
    title: string;
    image: string;
    content: string;
    viewCount: number;
    slug: string;
    status: string;
    isBreaking: boolean;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
    category: Category;
    categoryId: number;
}
