import { Category } from "../entity/Category";
import { PaginationOptions } from "../types/pagination";
export declare const createCategory: (categoryData: Category) => Promise<Category>;
export declare const getAllCategories: () => Promise<{
    id: number;
    name: string;
    articleCount: number;
}[]>;
export declare const getCategory: (id: number) => Promise<Category>;
export declare const updateCategory: (id: number, categoryData: Category) => Promise<Category>;
export declare const deleteCategory: (id: number) => Promise<boolean>;
export declare const getAllArticlesByCategory: (categoryId: number, options?: PaginationOptions) => Promise<{
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
