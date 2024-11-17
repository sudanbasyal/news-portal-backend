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
  title: Joi.string().required(),
  content: Joi.string().required(),
  slug: Joi.string().required(),
  status: Joi.string().required(),
  isBreaking: Joi.boolean().required(),
});

// update article schema
export const updateArticleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  status: Joi.string().required(),
  isBreaking: Joi.boolean().required(),
  slug: Joi.string().required(),
});

export const changeArticleStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "published", "archived").required(),
});
