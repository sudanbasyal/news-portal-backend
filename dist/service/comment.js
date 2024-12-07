"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommentsOfAnArticle = exports.createComment = void 0;
const dataSource_1 = require("../dataSource");
const Article_1 = require("../entity/Article");
const Comment_1 = require("../entity/Comment");
const BadRequestError_1 = require("../error/BadRequestError");
const logger_1 = __importDefault(require("../utils/logger"));
const commentService = (0, logger_1.default)("commentService");
const commentRepository = dataSource_1.AppDataSource.getRepository(Comment_1.Comment);
const articleRepository = dataSource_1.AppDataSource.getRepository(Article_1.Article);
const createComment = async (comment, articleId) => {
    // check if article exists
    commentService.info("checking if article exists");
    const article = await articleRepository.findOneBy({ id: articleId });
    if (!article) {
        throw new BadRequestError_1.BadRequestError("Article not found");
    }
    commentService.info("creating comment");
    console.log(comment);
    const newComment = commentRepository.create(comment);
    newComment.article = article;
    await commentRepository.save(newComment);
    return newComment;
};
exports.createComment = createComment;
const getAllCommentsOfAnArticle = async (articleId) => {
    commentService.info("fetching all comments of an article");
    const comments = await commentRepository.find({
        where: { articleId },
    });
    return comments;
};
exports.getAllCommentsOfAnArticle = getAllCommentsOfAnArticle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOENBQThDO0FBQzlDLCtDQUE0QztBQUM1QywrQ0FBNEM7QUFDNUMsOERBQTJEO0FBQzNELDZEQUFrRDtBQUVsRCxNQUFNLGNBQWMsR0FBRyxJQUFBLGdCQUFtQixFQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDN0QsTUFBTSxpQkFBaUIsR0FBRywwQkFBYSxDQUFDLGFBQWEsQ0FBQyxpQkFBTyxDQUFDLENBQUM7QUFDL0QsTUFBTSxpQkFBaUIsR0FBRywwQkFBYSxDQUFDLGFBQWEsQ0FBQyxpQkFBTyxDQUFDLENBQUM7QUFDeEQsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQ3pFLDBCQUEwQjtJQUMxQixjQUFjLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNyRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixNQUFNLElBQUksaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDN0IsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBYlcsUUFBQSxhQUFhLGlCQWF4QjtBQUVLLE1BQU0seUJBQXlCLEdBQUcsS0FBSyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUNuRSxjQUFjLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDNUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFO0tBQ3JCLENBQUMsQ0FBQztJQUNILE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQU5XLFFBQUEseUJBQXlCLDZCQU1wQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vZGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBBcnRpY2xlIH0gZnJvbSBcIi4uL2VudGl0eS9BcnRpY2xlXCI7XHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi4vZW50aXR5L0NvbW1lbnRcIjtcclxuaW1wb3J0IHsgQmFkUmVxdWVzdEVycm9yIH0gZnJvbSBcIi4uL2Vycm9yL0JhZFJlcXVlc3RFcnJvclwiO1xyXG5pbXBvcnQgbG9nZ2VyV2l0aE5hbWVTcGFjZSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XHJcblxyXG5jb25zdCBjb21tZW50U2VydmljZSA9IGxvZ2dlcldpdGhOYW1lU3BhY2UoXCJjb21tZW50U2VydmljZVwiKTtcclxuY29uc3QgY29tbWVudFJlcG9zaXRvcnkgPSBBcHBEYXRhU291cmNlLmdldFJlcG9zaXRvcnkoQ29tbWVudCk7XHJcbmNvbnN0IGFydGljbGVSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KEFydGljbGUpO1xyXG5leHBvcnQgY29uc3QgY3JlYXRlQ29tbWVudCA9IGFzeW5jIChjb21tZW50OiBDb21tZW50LCBhcnRpY2xlSWQ6IG51bWJlcikgPT4ge1xyXG4gIC8vIGNoZWNrIGlmIGFydGljbGUgZXhpc3RzXHJcbiAgY29tbWVudFNlcnZpY2UuaW5mbyhcImNoZWNraW5nIGlmIGFydGljbGUgZXhpc3RzXCIpO1xyXG4gIGNvbnN0IGFydGljbGUgPSBhd2FpdCBhcnRpY2xlUmVwb3NpdG9yeS5maW5kT25lQnkoeyBpZDogYXJ0aWNsZUlkIH0pO1xyXG4gIGlmICghYXJ0aWNsZSkge1xyXG4gICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkFydGljbGUgbm90IGZvdW5kXCIpO1xyXG4gIH1cclxuICBjb21tZW50U2VydmljZS5pbmZvKFwiY3JlYXRpbmcgY29tbWVudFwiKTtcclxuICBjb25zb2xlLmxvZyhjb21tZW50KTtcclxuICBjb25zdCBuZXdDb21tZW50ID0gY29tbWVudFJlcG9zaXRvcnkuY3JlYXRlKGNvbW1lbnQpO1xyXG4gIG5ld0NvbW1lbnQuYXJ0aWNsZSA9IGFydGljbGU7XHJcbiAgYXdhaXQgY29tbWVudFJlcG9zaXRvcnkuc2F2ZShuZXdDb21tZW50KTtcclxuICByZXR1cm4gbmV3Q29tbWVudDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxDb21tZW50c09mQW5BcnRpY2xlID0gYXN5bmMgKGFydGljbGVJZDogbnVtYmVyKSA9PiB7XHJcbiAgY29tbWVudFNlcnZpY2UuaW5mbyhcImZldGNoaW5nIGFsbCBjb21tZW50cyBvZiBhbiBhcnRpY2xlXCIpO1xyXG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgY29tbWVudFJlcG9zaXRvcnkuZmluZCh7XHJcbiAgICB3aGVyZTogeyBhcnRpY2xlSWQgfSxcclxuICB9KTtcclxuICByZXR1cm4gY29tbWVudHM7XHJcbn07XHJcbiJdfQ==