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
exports.getAllCommentsOfAnArticle = exports.addComment = void 0;
const commentService = __importStar(require("../service/comment"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const logger_1 = __importDefault(require("../utils/logger"));
const commentController = (0, logger_1.default)("commentController");
const addComment = async (req, res, next) => {
    try {
        commentController.info("adding comment");
        console.log(req.body);
        const newComment = await commentService.createComment(req.body, req.params.id);
        res.status(http_status_codes_1.default.OK).json({
            message: "Comment added successfully",
            data: newComment,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addComment = addComment;
const getAllCommentsOfAnArticle = async (req, res, next) => {
    try {
        commentController.info("fetching all comments of an article");
        const comments = await commentService.getAllCommentsOfAnArticle(req.params.id);
        res.status(http_status_codes_1.default.OK).json({
            message: "Comments fetched successfully",
            data: comments,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCommentsOfAnArticle = getAllCommentsOfAnArticle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL2NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBcUQ7QUFFckQsMEVBQStDO0FBRS9DLDZEQUFrRDtBQUVsRCxNQUFNLGlCQUFpQixHQUFHLElBQUEsZ0JBQW1CLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUU1RCxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQzdCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLElBQUksQ0FBQztRQUNILGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBYyxDQUFDLGFBQWEsQ0FDbkQsR0FBRyxDQUFDLElBQUksRUFDUixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDZCxDQUFDO1FBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsNEJBQTRCO1lBQ3JDLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQW5CVyxRQUFBLFVBQVUsY0FtQnJCO0FBRUssTUFBTSx5QkFBeUIsR0FBRyxLQUFLLEVBQzVDLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLElBQUksQ0FBQztRQUNILGlCQUFpQixDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sUUFBUSxHQUFHLE1BQU0sY0FBYyxDQUFDLHlCQUF5QixDQUM3RCxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDZCxDQUFDO1FBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsK0JBQStCO1lBQ3hDLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBakJXLFFBQUEseUJBQXlCLDZCQWlCcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb21tZW50U2VydmljZSBmcm9tIFwiLi4vc2VydmljZS9jb21tZW50XCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgaHR0cFN0YXR1c0NvZGUgZnJvbSBcImh0dHAtc3RhdHVzLWNvZGVzXCI7XHJcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3JlcXVlc3RcIjtcclxuaW1wb3J0IGxvZ2dlcldpdGhOYW1lU3BhY2UgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xyXG5cclxuY29uc3QgY29tbWVudENvbnRyb2xsZXIgPSBsb2dnZXJXaXRoTmFtZVNwYWNlKFwiY29tbWVudENvbnRyb2xsZXJcIik7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkQ29tbWVudCA9IGFzeW5jIChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgcmVzOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbW1lbnRDb250cm9sbGVyLmluZm8oXCJhZGRpbmcgY29tbWVudFwiKTtcclxuICAgIGNvbnNvbGUubG9nKHJlcS5ib2R5KTtcclxuICAgIGNvbnN0IG5ld0NvbW1lbnQgPSBhd2FpdCBjb21tZW50U2VydmljZS5jcmVhdGVDb21tZW50KFxyXG4gICAgICByZXEuYm9keSxcclxuICAgICAgcmVxLnBhcmFtcy5pZFxyXG4gICAgKTtcclxuICAgIHJlcy5zdGF0dXMoaHR0cFN0YXR1c0NvZGUuT0spLmpzb24oe1xyXG4gICAgICBtZXNzYWdlOiBcIkNvbW1lbnQgYWRkZWQgc3VjY2Vzc2Z1bGx5XCIsXHJcbiAgICAgIGRhdGE6IG5ld0NvbW1lbnQsXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgbmV4dChlcnJvcik7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbENvbW1lbnRzT2ZBbkFydGljbGUgPSBhc3luYyAoXHJcbiAgcmVxOiBSZXF1ZXN0LFxyXG4gIHJlczogUmVzcG9uc2UsXHJcbiAgbmV4dDogTmV4dEZ1bmN0aW9uXHJcbikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb21tZW50Q29udHJvbGxlci5pbmZvKFwiZmV0Y2hpbmcgYWxsIGNvbW1lbnRzIG9mIGFuIGFydGljbGVcIik7XHJcbiAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IGNvbW1lbnRTZXJ2aWNlLmdldEFsbENvbW1lbnRzT2ZBbkFydGljbGUoXHJcbiAgICAgIHJlcS5wYXJhbXMuaWRcclxuICAgICk7XHJcbiAgICByZXMuc3RhdHVzKGh0dHBTdGF0dXNDb2RlLk9LKS5qc29uKHtcclxuICAgICAgbWVzc2FnZTogXCJDb21tZW50cyBmZXRjaGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBkYXRhOiBjb21tZW50cyxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBuZXh0KGVycm9yKTtcclxuICB9XHJcbn07XHJcbiJdfQ==