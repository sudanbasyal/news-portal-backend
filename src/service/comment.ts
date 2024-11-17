import { AppDataSource } from "../dataSource";
import { Article } from "../entity/Article";
import { Comment } from "../entity/Comment";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const commentService = loggerWithNameSpace("commentService");
const commentRepository = AppDataSource.getRepository(Comment);
const articleRepository = AppDataSource.getRepository(Article);
export const createComment = async (comment: Comment, articleId: number) => {
  // check if article exists

  const article = await articleRepository.findOneBy({ id: articleId });
  if (!article) {
    throw new BadRequestError("Article not found");
  }
  commentService.info("creating comment");
  const newComment = commentRepository.create(comment);
  newComment.article = article;
  await commentRepository.save(newComment);
  return newComment;
};

export const getAllCommentsOfAnArticle = async (articleId: number) => {
  commentService.info("fetching all comments of an article");
  const comments = await commentRepository.find({
    where: { articleId },
  });
  return comments;
};
