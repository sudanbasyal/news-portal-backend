import { AppDataSource } from "../dataSource";
import { Article } from "../entity/Article";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import config from "../config";

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
  return `${config.apiUrl}${imagePath}`;
};

export const getArticles = async () => {
  const articles = await articleRepository.find();
  return articles.map((article) => ({
    ...article,
    image: getImageUrl(article.image),
  }));
};

export const createArticle = async (article: Article, file?: Express.Multer.File) => {
  articleService.info("Creating new article with image");
  const newArticle = new Article();
  
  if (!article.title || !article.content || !article.slug) {
    throw new BadRequestError("Title, content and slug are required");
  }

  newArticle.title = article.title;
  newArticle.image = file ? `/${file.filename}` : '';
  newArticle.content = article.content;
  newArticle.viewCount = 0;
  newArticle.slug = article.slug;
  newArticle.status = article.status || 'draft';
  newArticle.isBreaking = Boolean(article.isBreaking);

  console.log("Article to be saved:", newArticle);

  const savedArticle = await articleRepository.save(newArticle);

  return {
    ...savedArticle,
    image: getImageUrl(savedArticle.image),
  };
};

export const newArticle = async (articleInformation: Article, file?: Express.Multer.File) => {
  articleService.info("Checking if article with same slug already exists");
  console.log("Article Information received:", articleInformation);
  
  const existingArticle = await findBySlug(articleInformation.slug);
  if (existingArticle) {
    throw new BadRequestError("Article with same slug already exists");
  }
  
  articleService.info("Creating new article");
  const newArticle = await createArticle(articleInformation, file);
  return true;
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
  const existingArticle = await findById(id);
  if (!existingArticle) {
    throw new BadRequestError("Article not found");
  }

  if (await checkStatus(articleInformation.status || 'draft')) {
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
    throw new BadRequestError(
      `${articleInformation.status} News cannot be edited`
    );
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
