import { Article } from "./Article";
export declare class Comment {
    id: number;
    name: string;
    content: string;
    phone: string;
    createdAt: Date;
    article: Article;
    articleId: number;
}
