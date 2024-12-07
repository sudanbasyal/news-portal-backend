import { Article } from "../entity/Article";
import { Category } from "../entity/Category";
import { PaginationOptions } from "../types/pagination";
export declare const articleRepository: import("typeorm").Repository<Article>;
export declare const getArticles: (options?: PaginationOptions) => Promise<{
    articles: {
        image: string | null;
        id: number;
        title: string;
        content: string;
        viewCount: number;
        slug: string;
        status: string;
        isBreaking: boolean;
        createdAt: Date;
        updatedAt: Date;
        comments: import("../entity/Comment").Comment[];
        category: Category;
        categoryId: number;
    }[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}>;
export declare const createArticle: (article: Article & {
    categoryId: number;
}, file?: Express.Multer.File) => Promise<{
    image: string | null;
    id: number;
    title: string;
    content: string;
    viewCount: number;
    slug: string;
    status: string;
    isBreaking: boolean;
    createdAt: Date;
    updatedAt: Date;
    comments: import("../entity/Comment").Comment[];
    category: Category;
    categoryId: number;
}>;
export declare const newArticle: (articleInformation: Article, file?: Express.Multer.File) => Promise<boolean>;
export declare const getArticleById: (id: number) => Promise<{
    image: string | null;
    id: number;
    title: string;
    content: string;
    viewCount: number;
    slug: string;
    status: string;
    isBreaking: boolean;
    createdAt: Date;
    updatedAt: Date;
    comments: import("../entity/Comment").Comment[];
    category: Category;
    categoryId: number;
}>;
export declare const updateArticle: (id: number, articleInformation: Article, file?: Express.Multer.File) => Promise<{
    image: string | null;
    id?: number | undefined;
    title?: string | undefined;
    content?: string | undefined;
    viewCount?: number | undefined;
    slug?: string | undefined;
    status?: string | undefined;
    isBreaking?: boolean | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    comments?: import("../entity/Comment").Comment[] | undefined;
    category?: Category | undefined;
    categoryId?: number | undefined;
}>;
export declare const deleteArticle: (id: number) => Promise<boolean>;
export declare const changeArticleStatus: (id: number, status: string) => Promise<boolean>;
export declare const getArticleBySlug: (slug: string) => Promise<{
    image: string | null;
    id: number;
    title: string;
    content: string;
    viewCount: number;
    slug: string;
    status: string;
    isBreaking: boolean;
    createdAt: Date;
    updatedAt: Date;
    comments: import("../entity/Comment").Comment[];
    category: Category;
    categoryId: number;
}>;
export declare const searchArticles: (query: string) => Promise<{
    image: string | null;
    id: number;
    title: string;
    content: string;
    viewCount: number;
    slug: string;
    status: string;
    isBreaking: boolean;
    createdAt: Date;
    updatedAt: Date;
    comments: import("../entity/Comment").Comment[];
    category: Category;
    categoryId: number;
}[]>;
export declare const getBreakingNews: (options?: PaginationOptions) => Promise<{
    data: {
        image: string | null;
        id: number;
        title: string;
        content: string;
        viewCount: number;
        slug: string;
        status: string;
        isBreaking: boolean;
        createdAt: Date;
        updatedAt: Date;
        comments: import("../entity/Comment").Comment[];
        category: Category;
        categoryId: number;
    }[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}>;
export declare const getAllArticlesByCategory: (categoryId: number, options?: PaginationOptions) => Promise<{
    articles: {
        category: {
            id: number;
            name: string;
        };
        image: string | null;
        id: number;
        title: string;
        content: string;
        viewCount: number;
        slug: string;
        status: string;
        isBreaking: boolean;
        createdAt: Date;
        updatedAt: Date;
        comments: import("../entity/Comment").Comment[];
        categoryId: number;
    }[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}>;
