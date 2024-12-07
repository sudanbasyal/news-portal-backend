import { Comment } from "../entity/Comment";
export declare const createComment: (comment: Comment, articleId: number) => Promise<Comment>;
export declare const getAllCommentsOfAnArticle: (articleId: number) => Promise<Comment[]>;
