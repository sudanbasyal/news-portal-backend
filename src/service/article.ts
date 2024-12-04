import { AppDataSource } from "../dataSource";
import { Article } from "../entity/Article";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import config from "../config";
import fs from "fs/promises";
import { deleteFiles } from "../utils/fileUtils";
import { Category } from "../entity/Category";
import getImageUrl from "../utils/imageUrl";
import { Like, ILike } from "typeorm";
import { PaginationOptions, PaginatedResponse } from "../types/pagination";

const articleService = loggerWithNameSpace("articleService");

export const articleRepository = AppDataSource.getRepository(Article);

const findById = async (articleId: number) => {
  return await articleRepository.findOneBy({ id: articleId });
};

const findBySlug = async (slug: string) => {
  return await articleRepository.findOneBy({ slug });
};

const checkStatus = async (status: string) => {
  return status === "draft" || status === "published";
};

export const getArticles = async (options: PaginationOptions = {}) => {
  console.log(options);
  const page = options.page || 1;
  const limit = options.limit || 5;
  const skip = (page - 1) * limit;

  const [articles, total] = await articleRepository.findAndCount({
    relations: ["category"],
    skip,
    take: limit,
    order: { createdAt: "DESC" },
  });

  const lastPage = Math.ceil(total / limit);

  return {
    articles: articles.map((article: Article) => ({
      ...article,
      image: getImageUrl(article.image),
    })),
    meta: {
      total,
      page,
      lastPage,
      hasNextPage: page < lastPage,
      hasPreviousPage: page > 1,
    },
  };
};

const findCategoryById = async (categoryId: number) => {
  const category = await AppDataSource.getRepository(Category).findOneBy({
    id: categoryId,
  });
  if (!category) {
    throw new BadRequestError("Category not found");
  }
  return category;
};

const formatSlug = (slug: string): string => {
  return slug.trim().replace(/\s+/g, "-");
};

export const createArticle = async (
  article: Article & { categoryId: number },
  file?: Express.Multer.File
) => {
  try {
    articleService.info("Creating new article with image");
    const newArticle = new Article();

    if (
      !article.title ||
      !article.content ||
      !article.slug ||
      !article.categoryId
    ) {
      if (file?.filename) await deleteFiles(file.filename);
      throw new BadRequestError(
        "Title, content, slug and categoryId are required"
      );
    }

    // Format slug by replacing whitespace with hyphens
    const formattedSlug = formatSlug(article.slug);

    // Fetch the category first
    const category = await findCategoryById(article.categoryId);

    newArticle.title = article.title;
    newArticle.image = file ? `${file.filename}` : "";
    newArticle.content = article.content;
    newArticle.viewCount = 0;
    newArticle.slug = formattedSlug; // Use formatted slug
    newArticle.status = article.status || "draft";
    newArticle.isBreaking = Boolean(article.isBreaking);
    newArticle.categoryId = category.id;

    const savedArticle = await articleRepository.save(newArticle);

    return {
      ...savedArticle,
      image: getImageUrl(savedArticle.image),
    };
  } catch (error) {
    // Clean up the uploaded file if anything fails
    if (file?.filename) {
      await deleteFiles(file.filename);
    }
    throw error;
  }
};

export const newArticle = async (
  articleInformation: Article,
  file?: Express.Multer.File
) => {
  try {
    articleService.info("Checking if article with same slug already exists");

    const existingArticle = await findBySlug(articleInformation.slug);
    if (existingArticle) {
      if (file?.filename) {
        articleService.info(`Deleting uploaded file: ${file.filename}`);
        await deleteFiles(file.filename);
      }
      throw new BadRequestError("Article with same slug already exists");
    }

    articleService.info("Creating new article");
    const newArticle = await createArticle(articleInformation, file);
    return true;
  } catch (error) {
    // Clean up the uploaded file if anything fails
    if (file?.filename) {
      articleService.info(`Cleaning up file due to error: ${file.filename}`);
      await deleteFiles(file.filename);
    }
    throw error;
  }
};

export const getArticleById = async (id: number) => {
  articleService.info("fetching article based on its id");
  const article = await articleRepository.findOne({
    where: { id },
    relations: ["category"],
  });
  if (!article) {
    throw new BadRequestError("Article not found");
  }
  // article.viewCount += 1;
  await articleRepository.save(article);
  return {
    ...article,
    image: getImageUrl(article.image),
  };
};

export const updateArticle = async (
  id: number,
  articleInformation: Article,
  file?: Express.Multer.File
) => {
  articleService.info("Updating article");
  try {
    const existingArticle = await findById(id);
    if (!existingArticle) {
      if (file) await deleteFiles(file.path);
      throw new BadRequestError("Article not found");
    }

    // If categoryId is being updated, verify the category exists
    if (articleInformation.categoryId) {
      await findCategoryById(articleInformation.categoryId);
    }

    if (
      articleInformation.slug &&
      articleInformation.slug.trim() !== existingArticle.slug
    ) {
      const articleWithSlug = await findBySlug(articleInformation.slug.trim());
      if (articleWithSlug) {
        articleService.info("Deleting file", file);
        if (file) await deleteFiles(file.path);
        throw new BadRequestError("Article with same slug already exists");
      }
    }
    console.log(formatSlug(articleInformation.slug));
    const updateData = {
      ...articleInformation,
      isBreaking: Boolean(Number(articleInformation.isBreaking)),
      slug: articleInformation.slug
        ? formatSlug(articleInformation.slug)
        : existingArticle.slug,
      image: file ? `/${file.filename}` : existingArticle.image,
    };

    await articleRepository.update(id, updateData);

    const updatedArticle = await findById(id);
    return {
      ...updatedArticle,
      image: getImageUrl(updatedArticle?.image || ""),
    };
  } catch (error) {
    // Clean up the uploaded file if anything fails
    console.log(error);
    if (file?.filename) {
      await deleteFiles(file.filename);
    }
    throw error;
  }
};

export const deleteArticle = async (id: number) => {
  articleService.info("Deleting article");
  const existingArticle = await findById(id);
  if (!existingArticle) {
    throw new BadRequestError("Article not found");
  }
  await articleRepository.delete(id);
  return true;
};

export const changeArticleStatus = async (id: number, status: string) => {
  articleService.info("Changing article status");
  const existingArticle = await findById(id);
  if (!existingArticle) {
    throw new BadRequestError("Article not found");
  }
  await articleRepository.update(id, { status });
  return true;
};

export const getArticleBySlug = async (slug: string) => {
  const article = await articleRepository.findOne({
    where: { slug },
    relations: ["category"],
  });
  if (!article) {
    throw new BadRequestError("Article not found");
  }
  article.viewCount += 1;
  await articleRepository.save(article);
  return {
    ...article,
    image: getImageUrl(article.image),
  };
};

export const searchArticles = async (query: string) => {
  // Split search terms
  const terms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 2);

  if (terms.length === 0) {
    return [];
  }

  // Create the base query
  const queryBuilder = articleRepository
    .createQueryBuilder("article")
    .leftJoinAndSelect("article.category", "category");

  // Add search conditions with scoring
  const conditions: string[] = [];
  const params: any = {};

  terms.forEach((term, index) => {
    const titleParam = `title${index}`;
    const contentParam = `content${index}`;
    params[titleParam] = `%${term}%`;
    params[contentParam] = `%${term}%`;

    conditions.push(
      `(
        CASE 
          WHEN LOWER(article.title) LIKE :${titleParam} THEN 3
          WHEN LOWER(article.content) LIKE :${contentParam} THEN 1
          ELSE 0 
        END
      )`
    );
  });

  // Combine all conditions with scoring
  const scoreExpression = conditions.join(" + ");

  const results = await queryBuilder
    .addSelect(`(${scoreExpression})`, "relevance_score")
    .where(`(${scoreExpression}) > 0`)
    .setParameters(params)
    .orderBy("relevance_score", "DESC")
    .addOrderBy("article.createdAt", "DESC")
    .getMany();

  return results.map((article) => ({
    ...article,
    image: getImageUrl(article.image),
  }));
};

export const getBreakingNews = async (options: PaginationOptions = {}) => {
  const page = options.page || 1;
  const limit = options.limit || 5;
  const skip = (page - 1) * limit;

  const [breakingNews, total] = await articleRepository.findAndCount({
    where: { isBreaking: true },
    skip,
    take: limit,
    order: { createdAt: "DESC" },
  });

  const lastPage = Math.ceil(total / limit);

  return {
    data: breakingNews.map((article) => ({
      ...article,
      image: getImageUrl(article.image),
    })),
    meta: {
      total,
      page,
      lastPage,
      hasNextPage: page < lastPage,
      hasPreviousPage: page > 1,
    },
  };
};

export const getAllArticlesByCategory = async (
  categoryId: number,
  options: PaginationOptions = {}
) => {
  const page = options.page || 1;
  const limit = options.limit || 5;
  const skip = (page - 1) * limit;

  const [articles, total] = await articleRepository.findAndCount({
    where: { categoryId },
    relations: ["category"],
    skip,
    take: limit,
    order: { createdAt: "DESC" },
  });

  const lastPage = Math.ceil(total / limit);

  return {
    articles: articles.map((article) => ({
      ...article,
      category: {
        id: article.category.id,
        name: article.category.name,
      },
      image: getImageUrl(article.image),
    })),
    meta: {
      total,
      page,
      lastPage,
      hasNextPage: page < lastPage,
      hasPreviousPage: page > 1,
    },
  };
};
