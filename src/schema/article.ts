import Joi from "joi";

// export interface Article {
//     title: string;
//     image: string;
//     content: string;
//     viewCount: number;
//     slug: string;
//     status: "draft" | "published" | "archived";
//     isBreaking: boolean;
//   }

// create article schema
export const addArticleSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  slug: Joi.string().min(3).required(),
  status: Joi.string().valid("draft", "published", "archived").required(),
  isBreaking: Joi.boolean().optional(),
  image: Joi.string().optional(),
});

// update article schema
export const updateArticleSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  status: Joi.string().valid("draft", "published", "archived").required(),
  isBreaking: Joi.boolean().optional(),
  slug: Joi.string().min(3).required(),
  image: Joi.string().optional(),
});

export const changeArticleStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "published", "archived").required(),
});
