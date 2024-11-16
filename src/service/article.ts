import { AppDataSource } from "../dataSource";
import { Article } from "../entity/Article";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const articleService = loggerWithNameSpace("articleService");

export const articleRepository = AppDataSource.getRepository(Article);

const findById = async (articleId: number) => {
  return await articleRepository.findOneBy({ id: articleId });
};

const findBySlug = async (slug: string) => {
  return await articleRepository.findOneBy({ slug });
};

export const getArticles = async () => {
  return await articleRepository.find();
};

export const createArticle = async (article: Article) => {
  const newArticle = new Article();
  newArticle.title = article.title;
  newArticle.image = article.image;
  newArticle.content = article.content;
  newArticle.viewCount = article.viewCount;
  newArticle.slug = article.slug;
  newArticle.status = article.status;
  newArticle.isBreaking = article.isBreaking;
  await articleRepository.save(newArticle);
};

export const newArticle = async (articleInformation: Article) => {
  articleService.info("Checking if article with same slug already exists");
  const existingArticle = await findBySlug(articleInformation.slug);
  if (existingArticle) {
    throw new BadRequestError("Article with same slug already exists");
  }
  articleService.info("Creating new article");
  const newArticle = await createArticle(articleInformation);
  return true;
};

export const getArticleById = async (id: number) => {
  articleService.info("fetching article based on its id");
  const fetchedArticle = await findById(id);
  if (!fetchedArticle) {
    throw new BadRequestError("Article not found");
  }
  return fetchedArticle;
};

export const updateArticle = async (
  id: number,
  articleInformation: Article
) => {
  articleService.info("Updating article");
  const existingArticle = await findById(id);
  if (!existingArticle) {
    throw new BadRequestError("Article not found");
  }
  const updatedArticle = await articleRepository.update(id, articleInformation);
  console.log(updatedArticle);
  return true;
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
