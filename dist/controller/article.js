"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBreakingNews = exports.getArticleBySlug = exports.searchArticles = exports.changeArticleStatus = exports.deleteArticle = exports.updateArticle = exports.getArticle = exports.allArticles = exports.addArticle = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const logger_1 = __importDefault(require("../utils/logger"));
const articleService = __importStar(require("../service/article"));
const BadRequestError_1 = require("../error/BadRequestError");
const articleController = (0, logger_1.default)("articleController");
const addArticle = async (req, res, next) => {
    try {
        articleController.info("Adding new article");
        const addArticle = await articleService.newArticle(req.body, req.file);
        res.status(http_status_codes_1.default.CREATED).json({
            message: "Article added successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addArticle = addArticle;
const allArticles = async (req, res, next) => {
    try {
        articleController.info("Fetching all articles");
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "5", 10);
        const allArticles = await articleService.getArticles({ page, limit });
        res.status(http_status_codes_1.default.OK).json({
            message: "All articles fetched successfully",
            ...allArticles,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.allArticles = allArticles;
const getArticle = async (req, res, next) => {
    try {
        articleController.info("Fetching article by id");
        const id = req.params.id;
        const article = await articleService.getArticleById(id);
        res.status(http_status_codes_1.default.OK).json({
            message: "Article fetched successfully",
            data: article,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getArticle = getArticle;
const updateArticle = async (req, res, next) => {
    try {
        articleController.info("Updating article");
        const id = req.params.id;
        const updateArticle = await articleService.updateArticle(id, req.body, req.file);
        res.status(http_status_codes_1.default.OK).json({
            message: "Article updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res, next) => {
    try {
        articleController.info("Deleting article");
        const id = req.params.id;
        const deleteArticle = await articleService.deleteArticle(id);
        res.status(http_status_codes_1.default.OK).json({
            message: "Article deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteArticle = deleteArticle;
const changeArticleStatus = async (req, res, next) => {
    try {
        articleController.info("Changing article status");
        const id = req.params.id;
        const status = req.body.status;
        const changeArticleStatus = await articleService.changeArticleStatus(id, status);
        res.status(http_status_codes_1.default.OK).json({
            message: "Article status changed successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.changeArticleStatus = changeArticleStatus;
const searchArticles = async (req, // Specify the query type here
res, next) => {
    try {
        articleController.info("Searching articles");
        const searchTerm = req.query.q;
        if (!searchTerm) {
            throw new BadRequestError_1.BadRequestError("Search term is required");
        }
        const articles = await articleService.searchArticles(searchTerm);
        res.status(http_status_codes_1.default.OK).json({
            message: "Articles searched successfully",
            data: articles,
            count: articles.length,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.searchArticles = searchArticles;
const getArticleBySlug = async (req, res, next) => {
    try {
        articleController.info("Fetching article by slug");
        const slug = req.params.slug;
        const article = await articleService.getArticleBySlug(slug);
        res.status(http_status_codes_1.default.OK).json({
            message: "Article fetched successfully",
            data: article,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getArticleBySlug = getArticleBySlug;
const getBreakingNews = async (req, res, next) => {
    try {
        articleController.info("Fetching breaking news");
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "5", 10);
        const breakingNews = await articleService.getBreakingNews({ page, limit });
        res.status(http_status_codes_1.default.OK).json({
            message: "Breaking news fetched successfully",
            ...breakingNews,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBreakingNews = getBreakingNews;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL2FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwRUFBK0M7QUFHL0MsNkRBQWtEO0FBQ2xELG1FQUFxRDtBQUNyRCw4REFBMkQ7QUFDM0QsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLGdCQUFtQixFQUFDLG1CQUFtQixDQUFDLENBQUM7QUFhNUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUM3QixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixJQUFJLENBQUM7UUFDSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU3QyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0QyxPQUFPLEVBQUUsNEJBQTRCO1NBQ3RDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQWZXLFFBQUEsVUFBVSxjQWVyQjtBQUVLLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDOUIsR0FBNEMsRUFDNUMsR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixJQUFJLENBQUM7UUFDSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNoRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkQsTUFBTSxXQUFXLEdBQUcsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdEUsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsbUNBQW1DO1lBQzVDLEdBQUcsV0FBVztTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQWxCVyxRQUFBLFdBQVcsZUFrQnRCO0FBRUssTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUM3QixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixJQUFJLENBQUM7UUFDSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNqRCxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBaEJXLFFBQUEsVUFBVSxjQWdCckI7QUFFSyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLElBQUksQ0FBQztRQUNILGlCQUFpQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sYUFBYSxHQUFHLE1BQU0sY0FBYyxDQUFDLGFBQWEsQ0FDdEQsRUFBRSxFQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQ1IsR0FBRyxDQUFDLElBQUksQ0FDVCxDQUFDO1FBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsOEJBQThCO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQW5CVyxRQUFBLGFBQWEsaUJBbUJ4QjtBQUVLLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQixFQUNsQixFQUFFO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxhQUFhLEdBQUcsTUFBTSxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdELEdBQUcsQ0FBQyxNQUFNLENBQUMsMkJBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakMsT0FBTyxFQUFFLDhCQUE4QjtTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDLENBQUM7QUFmVyxRQUFBLGFBQWEsaUJBZXhCO0FBRUssTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQ3RDLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLElBQUksQ0FBQztRQUNILGlCQUFpQixDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxjQUFjLENBQUMsbUJBQW1CLENBQ2xFLEVBQUUsRUFDRixNQUFNLENBQ1AsQ0FBQztRQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsMkJBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakMsT0FBTyxFQUFFLHFDQUFxQztTQUMvQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDLENBQUM7QUFuQlcsUUFBQSxtQkFBbUIsdUJBbUI5QjtBQUVLLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDakMsR0FBd0MsRUFBRSw4QkFBOEI7QUFDeEUsR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixJQUFJLENBQUM7UUFDSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3QyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDaEIsTUFBTSxJQUFJLGlDQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpFLEdBQUcsQ0FBQyxNQUFNLENBQUMsMkJBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakMsT0FBTyxFQUFFLGdDQUFnQztZQUN6QyxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDLENBQUM7QUF2QlcsUUFBQSxjQUFjLGtCQXVCekI7QUFFSyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFDbkMsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQixFQUNsQixFQUFFO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsaUJBQWlCLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDN0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsOEJBQThCO1lBQ3ZDLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBaEJXLFFBQUEsZ0JBQWdCLG9CQWdCM0I7QUFFSyxNQUFNLGVBQWUsR0FBRyxLQUFLLEVBQ2xDLEdBQTRDLEVBQzVDLEdBQWEsRUFDYixJQUFrQixFQUNsQixFQUFFO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsaUJBQWlCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDakQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sWUFBWSxHQUFHLE1BQU0sY0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsMkJBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakMsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxHQUFHLFlBQVk7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBbEJXLFFBQUEsZUFBZSxtQkFrQjFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHBTdGF0dXNDb2RlIGZyb20gXCJodHRwLXN0YXR1cy1jb2Rlc1wiO1xyXG5pbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gXCIuLi9pbnRlcmZhY2UvcmVxdWVzdFwiO1xyXG5pbXBvcnQgbG9nZ2VyV2l0aE5hbWVTcGFjZSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCAqIGFzIGFydGljbGVTZXJ2aWNlIGZyb20gXCIuLi9zZXJ2aWNlL2FydGljbGVcIjtcclxuaW1wb3J0IHsgQmFkUmVxdWVzdEVycm9yIH0gZnJvbSBcIi4uL2Vycm9yL0JhZFJlcXVlc3RFcnJvclwiO1xyXG5jb25zdCBhcnRpY2xlQ29udHJvbGxlciA9IGxvZ2dlcldpdGhOYW1lU3BhY2UoXCJhcnRpY2xlQ29udHJvbGxlclwiKTtcclxuXHJcbi8vIEFkZCB0aGlzIGludGVyZmFjZSBmb3IgdGhlIHF1ZXJ5IHBhcmFtZXRlcnNcclxuaW50ZXJmYWNlIFNlYXJjaFF1ZXJ5IHtcclxuICBxPzogc3RyaW5nO1xyXG59XHJcblxyXG4vLyBBZGQgdGhpcyBpbnRlcmZhY2UgYXQgdGhlIHRvcFxyXG5pbnRlcmZhY2UgUGFnaW5hdGlvblF1ZXJ5IHtcclxuICBwYWdlPzogc3RyaW5nO1xyXG4gIGxpbWl0Pzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkQXJ0aWNsZSA9IGFzeW5jIChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgcmVzOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGFydGljbGVDb250cm9sbGVyLmluZm8oXCJBZGRpbmcgbmV3IGFydGljbGVcIik7XHJcblxyXG4gICAgY29uc3QgYWRkQXJ0aWNsZSA9IGF3YWl0IGFydGljbGVTZXJ2aWNlLm5ld0FydGljbGUocmVxLmJvZHksIHJlcS5maWxlKTtcclxuICAgIHJlcy5zdGF0dXMoaHR0cFN0YXR1c0NvZGUuQ1JFQVRFRCkuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQXJ0aWNsZSBhZGRlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBuZXh0KGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYWxsQXJ0aWNsZXMgPSBhc3luYyAoXHJcbiAgcmVxOiBSZXF1ZXN0PGFueSwgYW55LCBhbnksIFBhZ2luYXRpb25RdWVyeT4sXHJcbiAgcmVzOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGFydGljbGVDb250cm9sbGVyLmluZm8oXCJGZXRjaGluZyBhbGwgYXJ0aWNsZXNcIik7XHJcbiAgICBjb25zdCBwYWdlID0gcGFyc2VJbnQocmVxLnF1ZXJ5LnBhZ2UgfHwgXCIxXCIsIDEwKTtcclxuICAgIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQocmVxLnF1ZXJ5LmxpbWl0IHx8IFwiNVwiLCAxMCk7XHJcblxyXG4gICAgY29uc3QgYWxsQXJ0aWNsZXMgPSBhd2FpdCBhcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlcyh7IHBhZ2UsIGxpbWl0IH0pO1xyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5PSykuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQWxsIGFydGljbGVzIGZldGNoZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgIC4uLmFsbEFydGljbGVzLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBcnRpY2xlID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvblxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgYXJ0aWNsZUNvbnRyb2xsZXIuaW5mbyhcIkZldGNoaW5nIGFydGljbGUgYnkgaWRcIik7XHJcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XHJcbiAgICBjb25zdCBhcnRpY2xlID0gYXdhaXQgYXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZUJ5SWQoaWQpO1xyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5PSykuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQXJ0aWNsZSBmZXRjaGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBkYXRhOiBhcnRpY2xlLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVBcnRpY2xlID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvblxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgYXJ0aWNsZUNvbnRyb2xsZXIuaW5mbyhcIlVwZGF0aW5nIGFydGljbGVcIik7XHJcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XHJcbiAgICBjb25zdCB1cGRhdGVBcnRpY2xlID0gYXdhaXQgYXJ0aWNsZVNlcnZpY2UudXBkYXRlQXJ0aWNsZShcclxuICAgICAgaWQsXHJcbiAgICAgIHJlcS5ib2R5LFxyXG4gICAgICByZXEuZmlsZVxyXG4gICAgKTtcclxuICAgIHJlcy5zdGF0dXMoaHR0cFN0YXR1c0NvZGUuT0spLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiBcIkFydGljbGUgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBuZXh0KGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVsZXRlQXJ0aWNsZSA9IGFzeW5jIChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgcmVzOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGFydGljbGVDb250cm9sbGVyLmluZm8oXCJEZWxldGluZyBhcnRpY2xlXCIpO1xyXG4gICAgY29uc3QgaWQgPSByZXEucGFyYW1zLmlkO1xyXG4gICAgY29uc3QgZGVsZXRlQXJ0aWNsZSA9IGF3YWl0IGFydGljbGVTZXJ2aWNlLmRlbGV0ZUFydGljbGUoaWQpO1xyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5PSykuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQXJ0aWNsZSBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGFuZ2VBcnRpY2xlU3RhdHVzID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvblxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgYXJ0aWNsZUNvbnRyb2xsZXIuaW5mbyhcIkNoYW5naW5nIGFydGljbGUgc3RhdHVzXCIpO1xyXG4gICAgY29uc3QgaWQgPSByZXEucGFyYW1zLmlkO1xyXG4gICAgY29uc3Qgc3RhdHVzID0gcmVxLmJvZHkuc3RhdHVzO1xyXG4gICAgY29uc3QgY2hhbmdlQXJ0aWNsZVN0YXR1cyA9IGF3YWl0IGFydGljbGVTZXJ2aWNlLmNoYW5nZUFydGljbGVTdGF0dXMoXHJcbiAgICAgIGlkLFxyXG4gICAgICBzdGF0dXNcclxuICAgICk7XHJcbiAgICByZXMuc3RhdHVzKGh0dHBTdGF0dXNDb2RlLk9LKS5qc29uKHtcclxuICAgICAgbWVzc2FnZTogXCJBcnRpY2xlIHN0YXR1cyBjaGFuZ2VkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWFyY2hBcnRpY2xlcyA9IGFzeW5jIChcclxuICByZXE6IFJlcXVlc3Q8YW55LCBhbnksIGFueSwgU2VhcmNoUXVlcnk+LCAvLyBTcGVjaWZ5IHRoZSBxdWVyeSB0eXBlIGhlcmVcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvblxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgYXJ0aWNsZUNvbnRyb2xsZXIuaW5mbyhcIlNlYXJjaGluZyBhcnRpY2xlc1wiKTtcclxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSByZXEucXVlcnkucTtcclxuXHJcbiAgICBpZiAoIXNlYXJjaFRlcm0pIHtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIlNlYXJjaCB0ZXJtIGlzIHJlcXVpcmVkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFydGljbGVzID0gYXdhaXQgYXJ0aWNsZVNlcnZpY2Uuc2VhcmNoQXJ0aWNsZXMoc2VhcmNoVGVybSk7XHJcblxyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5PSykuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQXJ0aWNsZXMgc2VhcmNoZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgIGRhdGE6IGFydGljbGVzLFxyXG4gICAgICBjb3VudDogYXJ0aWNsZXMubGVuZ3RoLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBcnRpY2xlQnlTbHVnID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvblxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgYXJ0aWNsZUNvbnRyb2xsZXIuaW5mbyhcIkZldGNoaW5nIGFydGljbGUgYnkgc2x1Z1wiKTtcclxuICAgIGNvbnN0IHNsdWcgPSByZXEucGFyYW1zLnNsdWc7XHJcbiAgICBjb25zdCBhcnRpY2xlID0gYXdhaXQgYXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZUJ5U2x1ZyhzbHVnKTtcclxuICAgIHJlcy5zdGF0dXMoaHR0cFN0YXR1c0NvZGUuT0spLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiBcIkFydGljbGUgZmV0Y2hlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgZGF0YTogYXJ0aWNsZSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBuZXh0KGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJlYWtpbmdOZXdzID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdDxhbnksIGFueSwgYW55LCBQYWdpbmF0aW9uUXVlcnk+LFxyXG4gIHJlczogUmVzcG9uc2UsXHJcbiAgbmV4dDogTmV4dEZ1bmN0aW9uXHJcbikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBhcnRpY2xlQ29udHJvbGxlci5pbmZvKFwiRmV0Y2hpbmcgYnJlYWtpbmcgbmV3c1wiKTtcclxuICAgIGNvbnN0IHBhZ2UgPSBwYXJzZUludChyZXEucXVlcnkucGFnZSB8fCBcIjFcIiwgMTApO1xyXG4gICAgY29uc3QgbGltaXQgPSBwYXJzZUludChyZXEucXVlcnkubGltaXQgfHwgXCI1XCIsIDEwKTtcclxuXHJcbiAgICBjb25zdCBicmVha2luZ05ld3MgPSBhd2FpdCBhcnRpY2xlU2VydmljZS5nZXRCcmVha2luZ05ld3MoeyBwYWdlLCBsaW1pdCB9KTtcclxuICAgIHJlcy5zdGF0dXMoaHR0cFN0YXR1c0NvZGUuT0spLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiBcIkJyZWFraW5nIG5ld3MgZmV0Y2hlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgLi4uYnJlYWtpbmdOZXdzLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuIl19