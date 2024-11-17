import { AppDataSource } from "../dataSource";
import { Article } from "../entity/Article";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import config from "../config";
import fs from "fs/promises";
import { deleteFiles } from "../utils/fileUtils";

const articleService = loggerWithNameSpace("articleService");

export const articleRepository = AppDataSource.getRepository(Article);

const findById = async (articleId: number) => {
  return await articleRepository.findOneBy({ id: articleId });
};

const findBySlug = async (slug: string) => {
  return await articleRepository.findOneBy({ slug });
};

const checkStatus = async (status: string) => {
  return status === "draft";
};

const getImageUrl = (imagePath: string | null): string | null => {
  if (!imagePath) return null;
  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;
  return `${config.apiUrl}/public${encodeURI(normalizedPath)}`;
};

export const getArticles = async () => {
  const articles = await articleRepository.find();
  return articles.map((article: Article) => ({
    ...article,
    image: getImageUrl(article.image),
  }));
};

export const createArticle = async (
  article: Article,
  file?: Express.Multer.File
) => {
  try {
    articleService.info("Creating new article with image");
    const newArticle = new Article();

    if (!article.title || !article.content || !article.slug) {
      if (file?.filename) await deleteFiles(file.filename);
      throw new BadRequestError("Title, content and slug are required");
    }

    newArticle.title = article.title;
    newArticle.image = file ? `${file.filename}` : "";
    newArticle.content = article.content;
    newArticle.viewCount = 0;
    newArticle.slug = article.slug;
    newArticle.status = article.status || "draft";
    newArticle.isBreaking = Boolean(article.isBreaking);

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
  const article = await findById(id);
  if (!article) {
    throw new BadRequestError("Article not found");
  }

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

    if (await checkStatus(existingArticle.status || "draft")) {
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
    } else {
      if (file) await deleteFiles(file.path);
      throw new BadRequestError(
        `${articleInformation.status} News cannot be edited`
      );
    }
  } catch (error) {
    // Clean up the uploaded file if anything fails
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
