"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArticlesByCategory = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getAllCategories = exports.createCategory = void 0;
const dataSource_1 = require("../dataSource");
const Category_1 = require("../entity/Category");
const BadRequestError_1 = require("../error/BadRequestError");
const imageUrl_1 = __importDefault(require("../utils/imageUrl"));
const logger_1 = __importDefault(require("../utils/logger"));
const categoryService = (0, logger_1.default)("categoryService");
const categoryRepository = dataSource_1.AppDataSource.getRepository(Category_1.Category);
const findByName = async (name) => {
    return await categoryRepository.findOneBy({ name });
};
// Create new category
const createCategory = async (categoryData) => {
    const existingCategory = await findByName(categoryData.name);
    if (existingCategory) {
        throw new BadRequestError_1.BadRequestError("Category with this name already exists");
    }
    const category = categoryRepository.create(categoryData);
    return await categoryRepository.save(category);
};
exports.createCategory = createCategory;
// Get all categories
const getAllCategories = async () => {
    const categories = await categoryRepository.find({
        relations: ["articles"],
    });
    return categories.map((category) => ({
        id: category.id,
        name: category.name,
        articleCount: category.articles.length,
    }));
};
exports.getAllCategories = getAllCategories;
// Get single category
const getCategory = async (id) => {
    const category = await categoryRepository.findOne({
        where: { id },
        relations: ["articles"],
    });
    if (!category) {
        throw new BadRequestError_1.BadRequestError("Category not found");
    }
    return category;
};
exports.getCategory = getCategory;
// Update category
const updateCategory = async (id, categoryData) => {
    const category = await categoryRepository.findOneBy({ id });
    if (!category) {
        throw new BadRequestError_1.BadRequestError("Category not found");
    }
    // Check if new name conflicts with existing category
    if (categoryData.name !== category.name) {
        const existingCategory = await categoryRepository.findOneBy({
            name: categoryData.name,
        });
        if (existingCategory) {
            throw new BadRequestError_1.BadRequestError("Category with this name already exists");
        }
    }
    Object.assign(category, categoryData);
    return await categoryRepository.save(category);
};
exports.updateCategory = updateCategory;
// Delete category
const deleteCategory = async (id) => {
    const category = await categoryRepository.findOneBy({ id });
    if (!category) {
        throw new BadRequestError_1.BadRequestError("Category not found");
    }
    categoryService.info("Detleted category");
    await categoryRepository.delete(id);
    return true;
};
exports.deleteCategory = deleteCategory;
const getAllArticlesByCategory = async (categoryId, options = {}) => {
    const page = options.page || 1;
    const limit = options.limit || 5;
    const skip = (page - 1) * limit;
    // Get total count of articles in this category
    const totalCount = await categoryRepository
        .createQueryBuilder("category")
        .leftJoin("category.articles", "article")
        .where("category.id = :categoryId", { categoryId })
        .select("COUNT(DISTINCT article.id)", "count")
        .getRawOne()
        .then((result) => Number(result.count));
    // Get paginated articles
    const articlesList = await categoryRepository
        .createQueryBuilder("category")
        .leftJoinAndSelect("category.articles", "article")
        .where("category.id = :categoryId", { categoryId })
        .orderBy("article.createdAt", "DESC")
        .skip(skip)
        .take(limit)
        .getOne()
        .then((category) => category?.articles || []);
    const lastPage = Math.ceil(totalCount / limit);
    console.log(articlesList);
    return {
        articles: articlesList.map((article) => ({
            ...article,
            image: (0, imageUrl_1.default)(article.image),
        })),
        meta: {
            total: totalCount,
            page,
            lastPage,
            hasNextPage: page < lastPage,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getAllArticlesByCategory = getAllArticlesByCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZS9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBOEM7QUFDOUMsaURBQThDO0FBQzlDLDhEQUEyRDtBQUUzRCxpRUFBNEM7QUFDNUMsNkRBQWtEO0FBRWxELE1BQU0sZUFBZSxHQUFHLElBQUEsZ0JBQW1CLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUvRCxNQUFNLGtCQUFrQixHQUFHLDBCQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFRLENBQUMsQ0FBQztBQUVqRSxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7SUFDeEMsT0FBTyxNQUFNLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDO0FBQ0Ysc0JBQXNCO0FBQ2YsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLFlBQXNCLEVBQUUsRUFBRTtJQUM3RCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLGlDQUFlLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pELE9BQU8sTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDO0FBUlcsUUFBQSxjQUFjLGtCQVF6QjtBQUVGLHFCQUFxQjtBQUNkLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDekMsTUFBTSxVQUFVLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDL0MsU0FBUyxFQUFFLENBQUMsVUFB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RTtZQUNKLEtBQUssRUFBRSxVQUFVO1lBQ2pCLElBQUk7WUFDSixRQUFRO1lBQ1IsV0FBVyxFQUFFLElBQUksR0FBRyxRQUFRO1lBQzVCLGVBQWUsRUFBRSxJQUFJLEdBQUcsQ0FBQztTQUMxQjtLQUNGLENBQUM7QUFDSixDQUFDLENBQUM7QUEzQ1csUUFBQSx3QkFBd0IsNEJBMkNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vZGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuLi9lbnRpdHkvQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQmFkUmVxdWVzdEVycm9yIH0gZnJvbSBcIi4uL2Vycm9yL0JhZFJlcXVlc3RFcnJvclwiO1xyXG5pbXBvcnQgeyBQYWdpbmF0aW9uT3B0aW9ucyB9IGZyb20gXCIuLi90eXBlcy9wYWdpbmF0aW9uXCI7XHJcbmltcG9ydCBnZXRJbWFnZVVybCBmcm9tIFwiLi4vdXRpbHMvaW1hZ2VVcmxcIjtcclxuaW1wb3J0IGxvZ2dlcldpdGhOYW1lU3BhY2UgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xyXG5cclxuY29uc3QgY2F0ZWdvcnlTZXJ2aWNlID0gbG9nZ2VyV2l0aE5hbWVTcGFjZShcImNhdGVnb3J5U2VydmljZVwiKTtcclxuXHJcbmNvbnN0IGNhdGVnb3J5UmVwb3NpdG9yeSA9IEFwcERhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShDYXRlZ29yeSk7XHJcblxyXG5jb25zdCBmaW5kQnlOYW1lID0gYXN5bmMgKG5hbWU6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiBhd2FpdCBjYXRlZ29yeVJlcG9zaXRvcnkuZmluZE9uZUJ5KHsgbmFtZSB9KTtcclxufTtcclxuLy8gQ3JlYXRlIG5ldyBjYXRlZ29yeVxyXG5leHBvcnQgY29uc3QgY3JlYXRlQ2F0ZWdvcnkgPSBhc3luYyAoY2F0ZWdvcnlEYXRhOiBDYXRlZ29yeSkgPT4ge1xyXG4gIGNvbnN0IGV4aXN0aW5nQ2F0ZWdvcnkgPSBhd2FpdCBmaW5kQnlOYW1lKGNhdGVnb3J5RGF0YS5uYW1lKTtcclxuICBpZiAoZXhpc3RpbmdDYXRlZ29yeSkge1xyXG4gICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkNhdGVnb3J5IHdpdGggdGhpcyBuYW1lIGFscmVhZHkgZXhpc3RzXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2F0ZWdvcnkgPSBjYXRlZ29yeVJlcG9zaXRvcnkuY3JlYXRlKGNhdGVnb3J5RGF0YSk7XHJcbiAgcmV0dXJuIGF3YWl0IGNhdGVnb3J5UmVwb3NpdG9yeS5zYXZlKGNhdGVnb3J5KTtcclxufTtcclxuXHJcbi8vIEdldCBhbGwgY2F0ZWdvcmllc1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsQ2F0ZWdvcmllcyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgY2F0ZWdvcnlSZXBvc2l0b3J5LmZpbmQoe1xyXG4gICAgcmVsYXRpb25zOiBbXCJhcnRpY2xlc1wiXSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGNhdGVnb3JpZXMubWFwKChjYXRlZ29yeSkgPT4gKHtcclxuICAgIGlkOiBjYXRlZ29yeS5pZCxcclxuICAgIG5hbWU6IGNhdGVnb3J5Lm5hbWUsXHJcbiAgICBhcnRpY2xlQ291bnQ6IGNhdGVnb3J5LmFydGljbGVzLmxlbmd0aCxcclxuICB9KSk7XHJcbn07XHJcblxyXG4vLyBHZXQgc2luZ2xlIGNhdGVnb3J5XHJcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yeSA9IGFzeW5jIChpZDogbnVtYmVyKSA9PiB7XHJcbiAgY29uc3QgY2F0ZWdvcnkgPSBhd2FpdCBjYXRlZ29yeVJlcG9zaXRvcnkuZmluZE9uZSh7XHJcbiAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgcmVsYXRpb25zOiBbXCJhcnRpY2xlc1wiXSxcclxuICB9KTtcclxuXHJcbiAgaWYgKCFjYXRlZ29yeSkge1xyXG4gICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkNhdGVnb3J5IG5vdCBmb3VuZFwiKTtcclxuICB9XHJcbiAgcmV0dXJuIGNhdGVnb3J5O1xyXG59O1xyXG5cclxuLy8gVXBkYXRlIGNhdGVnb3J5XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVDYXRlZ29yeSA9IGFzeW5jIChpZDogbnVtYmVyLCBjYXRlZ29yeURhdGE6IENhdGVnb3J5KSA9PiB7XHJcbiAgY29uc3QgY2F0ZWdvcnkgPSBhd2FpdCBjYXRlZ29yeVJlcG9zaXRvcnkuZmluZE9uZUJ5KHsgaWQgfSk7XHJcbiAgaWYgKCFjYXRlZ29yeSkge1xyXG4gICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkNhdGVnb3J5IG5vdCBmb3VuZFwiKTtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIG5ldyBuYW1lIGNvbmZsaWN0cyB3aXRoIGV4aXN0aW5nIGNhdGVnb3J5XHJcbiAgaWYgKGNhdGVnb3J5RGF0YS5uYW1lICE9PSBjYXRlZ29yeS5uYW1lKSB7XHJcbiAgICBjb25zdCBleGlzdGluZ0NhdGVnb3J5ID0gYXdhaXQgY2F0ZWdvcnlSZXBvc2l0b3J5LmZpbmRPbmVCeSh7XHJcbiAgICAgIG5hbWU6IGNhdGVnb3J5RGF0YS5uYW1lLFxyXG4gICAgfSk7XHJcbiAgICBpZiAoZXhpc3RpbmdDYXRlZ29yeSkge1xyXG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEVycm9yKFwiQ2F0ZWdvcnkgd2l0aCB0aGlzIG5hbWUgYWxyZWFkeSBleGlzdHNcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBPYmplY3QuYXNzaWduKGNhdGVnb3J5LCBjYXRlZ29yeURhdGEpO1xyXG4gIHJldHVybiBhd2FpdCBjYXRlZ29yeVJlcG9zaXRvcnkuc2F2ZShjYXRlZ29yeSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGUgY2F0ZWdvcnlcclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNhdGVnb3J5ID0gYXN5bmMgKGlkOiBudW1iZXIpID0+IHtcclxuICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IGNhdGVnb3J5UmVwb3NpdG9yeS5maW5kT25lQnkoeyBpZCB9KTtcclxuICBpZiAoIWNhdGVnb3J5KSB7XHJcbiAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEVycm9yKFwiQ2F0ZWdvcnkgbm90IGZvdW5kXCIpO1xyXG4gIH1cclxuICBjYXRlZ29yeVNlcnZpY2UuaW5mbyhcIkRldGxldGVkIGNhdGVnb3J5XCIpO1xyXG4gIGF3YWl0IGNhdGVnb3J5UmVwb3NpdG9yeS5kZWxldGUoaWQpO1xyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbEFydGljbGVzQnlDYXRlZ29yeSA9IGFzeW5jIChcclxuICBjYXRlZ29yeUlkOiBudW1iZXIsXHJcbiAgb3B0aW9uczogUGFnaW5hdGlvbk9wdGlvbnMgPSB7fVxyXG4pID0+IHtcclxuICBjb25zdCBwYWdlID0gb3B0aW9ucy5wYWdlIHx8IDE7XHJcbiAgY29uc3QgbGltaXQgPSBvcHRpb25zLmxpbWl0IHx8IDU7XHJcbiAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuXHJcbiAgLy8gR2V0IHRvdGFsIGNvdW50IG9mIGFydGljbGVzIGluIHRoaXMgY2F0ZWdvcnlcclxuICBjb25zdCB0b3RhbENvdW50ID0gYXdhaXQgY2F0ZWdvcnlSZXBvc2l0b3J5XHJcbiAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKFwiY2F0ZWdvcnlcIilcclxuICAgIC5sZWZ0Sm9pbihcImNhdGVnb3J5LmFydGljbGVzXCIsIFwiYXJ0aWNsZVwiKVxyXG4gICAgLndoZXJlKFwiY2F0ZWdvcnkuaWQgPSA6Y2F0ZWdvcnlJZFwiLCB7IGNhdGVnb3J5SWQgfSlcclxuICAgIC5zZWxlY3QoXCJDT1VOVChESVNUSU5DVCBhcnRpY2xlLmlkKVwiLCBcImNvdW50XCIpXHJcbiAgICAuZ2V0UmF3T25lKClcclxuICAgIC50aGVuKChyZXN1bHQpID0+IE51bWJlcihyZXN1bHQuY291bnQpKTtcclxuXHJcbiAgLy8gR2V0IHBhZ2luYXRlZCBhcnRpY2xlc1xyXG4gIGNvbnN0IGFydGljbGVzTGlzdCA9IGF3YWl0IGNhdGVnb3J5UmVwb3NpdG9yeVxyXG4gICAgLmNyZWF0ZVF1ZXJ5QnVpbGRlcihcImNhdGVnb3J5XCIpXHJcbiAgICAubGVmdEpvaW5BbmRTZWxlY3QoXCJjYXRlZ29yeS5hcnRpY2xlc1wiLCBcImFydGljbGVcIilcclxuICAgIC53aGVyZShcImNhdGVnb3J5LmlkID0gOmNhdGVnb3J5SWRcIiwgeyBjYXRlZ29yeUlkIH0pXHJcbiAgICAub3JkZXJCeShcImFydGljbGUuY3JlYXRlZEF0XCIsIFwiREVTQ1wiKVxyXG4gICAgLnNraXAoc2tpcClcclxuICAgIC50YWtlKGxpbWl0KVxyXG4gICAgLmdldE9uZSgpXHJcbiAgICAudGhlbigoY2F0ZWdvcnkpID0+IGNhdGVnb3J5Py5hcnRpY2xlcyB8fCBbXSk7XHJcblxyXG4gIGNvbnN0IGxhc3RQYWdlID0gTWF0aC5jZWlsKHRvdGFsQ291bnQgLyBsaW1pdCk7XHJcbiAgY29uc29sZS5sb2coYXJ0aWNsZXNMaXN0KTtcclxuICByZXR1cm4ge1xyXG4gICAgYXJ0aWNsZXM6IGFydGljbGVzTGlzdC5tYXAoKGFydGljbGUpID0+ICh7XHJcbiAgICAgIC4uLmFydGljbGUsXHJcbiAgICAgIGltYWdlOiBnZXRJbWFnZVVybChhcnRpY2xlLmltYWdlKSxcclxuICAgIH0pKSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgdG90YWw6IHRvdGFsQ291bnQsXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIGxhc3RQYWdlLFxyXG4gICAgICBoYXNOZXh0UGFnZTogcGFnZSA8IGxhc3RQYWdlLFxyXG4gICAgICBoYXNQcmV2aW91c1BhZ2U6IHBhZ2UgPiAxLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG4iXX0=