import { AppDataSource } from "../dataSource";
import { Article } from "../entity/Article";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import config from "../config";
import fs from "fs/promises";
import { deleteFiles } from "../utils/fileUtils";
import { Category } from "../entity/Category";

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

const getImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath) return null;
  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;
  return `${config.apiUrl}/public${encodeURI(normalizedPath)}`;
};

export const getArticles = async () => {
  const articles = await articleRepository.find({
    relations: ["category"],
  });
  return articles.map((article: Article) => ({
    ...article,
    image: getImageUrl(article.image),
  }));
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

    // Fetch the category first
    const category = await findCategoryById(article.categoryId);

    newArticle.title = article.title;
    newArticle.image = file ? `${file.filename}` : "";
    newArticle.content = article.content;
    newArticle.viewCount = 0;
    newArticle.slug = article.slug;
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
    relations: ["category", "comments"],
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
    console.log(articleInformation.slug,existingArticle.slug)
    console.log(articleInformation.slug !== existingArticle.slug)
    if (
      articleInformation.slug &&
      articleInformation.slug !== existingArticle.slug
    ) {
      const articleWithSlug = await findBySlug(articleInformation.slug);
      if (articleWithSlug) {
        articleService.info("Deleting file", file);
        if (file) await deleteFiles(file.path);
        throw new BadRequestError("Article with same slug already exists");
      }
    }

    const updateData = {
      ...articleInformation,
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
    console.log(error)
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

