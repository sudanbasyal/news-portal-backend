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
exports.getAllArticlesByCategory = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getAllCategories = exports.createCategory = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const logger_1 = __importDefault(require("../utils/logger"));
const categoryService = __importStar(require("../service/category"));
const articleService = __importStar(require("../service/article"));
const categoryController = (0, logger_1.default)("categoryController");
const createCategory = async (req, res, next) => {
    try {
        categoryController.info("Creating new category");
        await categoryService.createCategory(req.body);
        res.status(http_status_codes_1.default.CREATED).json({
            message: "Category created successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res, next) => {
    try {
        categoryController.info("Fetching all categories");
        const categories = await categoryService.getAllCategories();
        res.status(http_status_codes_1.default.OK).json({
            message: "Categories fetched successfully",
            data: categories,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCategories = getAllCategories;
const getCategory = async (req, res, next) => {
    try {
        categoryController.info("Fetching category by id");
        const id = req.params.id;
        const category = await categoryService.getCategory(id);
        res.status(http_status_codes_1.default.OK).json({
            message: "Category fetched successfully",
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategory = getCategory;
const updateCategory = async (req, res, next) => {
    try {
        categoryController.info("Updating category");
        const id = req.params.id;
        await categoryService.updateCategory(id, req.body);
        res.status(http_status_codes_1.default.OK).json({
            message: "Category updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        categoryController.info("Deleting category");
        const id = req.params.id;
        await categoryService.deleteCategory(id);
        res.status(http_status_codes_1.default.OK).json({
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
const getAllArticlesByCategory = async (req, res, next) => {
    try {
        categoryController.info("Fetching articles by category");
        const categoryId = req.params.id;
        const page = parseInt(req.query.page || "1", 10);
        const limit = parseInt(req.query.limit || "5", 10);
        const articles = await articleService.getAllArticlesByCategory(categoryId, {
            page,
            limit,
        });
        res.status(http_status_codes_1.default.OK).json({
            message: "Articles fetched successfully",
            ...articles,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllArticlesByCategory = getAllArticlesByCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlci9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBFQUErQztBQUcvQyw2REFBa0Q7QUFDbEQscUVBQXVEO0FBQ3ZELG1FQUFxRDtBQUNyRCxNQUFNLGtCQUFrQixHQUFHLElBQUEsZ0JBQW1CLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUs5RCxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQ2pDLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLElBQUksQ0FBQztRQUNILGtCQUFrQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0QyxPQUFPLEVBQUUsK0JBQStCO1NBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQWRXLFFBQUEsY0FBYyxrQkFjekI7QUFFSyxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFDbkMsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQixFQUNsQixFQUFFO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsa0JBQWtCLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDbkQsTUFBTSxVQUFVLEdBQUcsTUFBTSxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1RCxHQUFHLENBQUMsTUFBTSxDQUFDLDJCQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1lB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QyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxjQUFjLENBQUMsd0JBQXdCLENBQUMsVUFBVSxFQUFFO1lBQ3pFLElBQUk7WUFDSixLQUFLO1NBQ04sQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsK0JBQStCO1lBQ3hDLEdBQUcsUUFBUTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQXRCVyxRQUFBLHdCQUF3Qiw0QkFzQm5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHBTdGF0dXNDb2RlIGZyb20gXCJodHRwLXN0YXR1cy1jb2Rlc1wiO1xyXG5pbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gXCIuLi9pbnRlcmZhY2UvcmVxdWVzdFwiO1xyXG5pbXBvcnQgbG9nZ2VyV2l0aE5hbWVTcGFjZSBmcm9tIFwiLi4vdXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCAqIGFzIGNhdGVnb3J5U2VydmljZSBmcm9tIFwiLi4vc2VydmljZS9jYXRlZ29yeVwiO1xyXG5pbXBvcnQgKiBhcyBhcnRpY2xlU2VydmljZSBmcm9tIFwiLi4vc2VydmljZS9hcnRpY2xlXCI7XHJcbmNvbnN0IGNhdGVnb3J5Q29udHJvbGxlciA9IGxvZ2dlcldpdGhOYW1lU3BhY2UoXCJjYXRlZ29yeUNvbnRyb2xsZXJcIik7XHJcbmludGVyZmFjZSBQYWdpbmF0aW9uUXVlcnkge1xyXG4gIHBhZ2U/OiBzdHJpbmc7XHJcbiAgbGltaXQ/OiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhdGVnb3J5ID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvblxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgY2F0ZWdvcnlDb250cm9sbGVyLmluZm8oXCJDcmVhdGluZyBuZXcgY2F0ZWdvcnlcIik7XHJcbiAgICBhd2FpdCBjYXRlZ29yeVNlcnZpY2UuY3JlYXRlQ2F0ZWdvcnkocmVxLmJvZHkpO1xyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5DUkVBVEVEKS5qc29uKHtcclxuICAgICAgbWVzc2FnZTogXCJDYXRlZ29yeSBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBbGxDYXRlZ29yaWVzID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvblxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgY2F0ZWdvcnlDb250cm9sbGVyLmluZm8oXCJGZXRjaGluZyBhbGwgY2F0ZWdvcmllc1wiKTtcclxuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBjYXRlZ29yeVNlcnZpY2UuZ2V0QWxsQ2F0ZWdvcmllcygpO1xyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5PSykuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQ2F0ZWdvcmllcyBmZXRjaGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBkYXRhOiBjYXRlZ29yaWVzLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yeSA9IGFzeW5jIChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgcmVzOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNhdGVnb3J5Q29udHJvbGxlci5pbmZvKFwiRmV0Y2hpbmcgY2F0ZWdvcnkgYnkgaWRcIik7XHJcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XHJcbiAgICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IGNhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yeShpZCk7XHJcbiAgICByZXMuc3RhdHVzKGh0dHBTdGF0dXNDb2RlLk9LKS5qc29uKHtcclxuICAgICAgbWVzc2FnZTogXCJDYXRlZ29yeSBmZXRjaGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgICBkYXRhOiBjYXRlZ29yeSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBuZXh0KGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlQ2F0ZWdvcnkgPSBhc3luYyAoXHJcbiAgcmVxOiBSZXF1ZXN0LFxyXG4gIHJlczogUmVzcG9uc2UsXHJcbiAgbmV4dDogTmV4dEZ1bmN0aW9uXHJcbikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjYXRlZ29yeUNvbnRyb2xsZXIuaW5mbyhcIlVwZGF0aW5nIGNhdGVnb3J5XCIpO1xyXG4gICAgY29uc3QgaWQgPSByZXEucGFyYW1zLmlkO1xyXG4gICAgYXdhaXQgY2F0ZWdvcnlTZXJ2aWNlLnVwZGF0ZUNhdGVnb3J5KGlkLCByZXEuYm9keSk7XHJcbiAgICByZXMuc3RhdHVzKGh0dHBTdGF0dXNDb2RlLk9LKS5qc29uKHtcclxuICAgICAgbWVzc2FnZTogXCJDYXRlZ29yeSB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVDYXRlZ29yeSA9IGFzeW5jIChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgcmVzOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNhdGVnb3J5Q29udHJvbGxlci5pbmZvKFwiRGVsZXRpbmcgY2F0ZWdvcnlcIik7XHJcbiAgICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XHJcbiAgICBhd2FpdCBjYXRlZ29yeVNlcnZpY2UuZGVsZXRlQ2F0ZWdvcnkoaWQpO1xyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5PSykuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQ2F0ZWdvcnkgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBuZXh0KGVycm9yKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWxsQXJ0aWNsZXNCeUNhdGVnb3J5ID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdDxhbnksIGFueSwgYW55LCBQYWdpbmF0aW9uUXVlcnk+LFxyXG4gIHJlczogUmVzcG9uc2UsXHJcbiAgbmV4dDogTmV4dEZ1bmN0aW9uXHJcbikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjYXRlZ29yeUNvbnRyb2xsZXIuaW5mbyhcIkZldGNoaW5nIGFydGljbGVzIGJ5IGNhdGVnb3J5XCIpO1xyXG4gICAgY29uc3QgY2F0ZWdvcnlJZCA9IHJlcS5wYXJhbXMuaWQ7XHJcbiAgICBjb25zdCBwYWdlID0gcGFyc2VJbnQocmVxLnF1ZXJ5LnBhZ2UgfHwgXCIxXCIsIDEwKTtcclxuICAgIGNvbnN0IGxpbWl0ID0gcGFyc2VJbnQocmVxLnF1ZXJ5LmxpbWl0IHx8IFwiNVwiLCAxMCk7XHJcblxyXG4gICAgY29uc3QgYXJ0aWNsZXMgPSBhd2FpdCBhcnRpY2xlU2VydmljZS5nZXRBbGxBcnRpY2xlc0J5Q2F0ZWdvcnkoY2F0ZWdvcnlJZCwge1xyXG4gICAgICBwYWdlLFxyXG4gICAgICBsaW1pdCxcclxuICAgIH0pO1xyXG4gICAgcmVzLnN0YXR1cyhodHRwU3RhdHVzQ29kZS5PSykuanNvbih7XHJcbiAgICAgIG1lc3NhZ2U6IFwiQXJ0aWNsZXMgZmV0Y2hlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgICAgLi4uYXJ0aWNsZXMsXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgbmV4dChlcnJvcik7XHJcbiAgfVxyXG59O1xyXG4iXX0=