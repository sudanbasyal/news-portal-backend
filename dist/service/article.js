"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArticlesByCategory = exports.getBreakingNews = exports.searchArticles = exports.getArticleBySlug = exports.changeArticleStatus = exports.deleteArticle = exports.updateArticle = exports.getArticleById = exports.newArticle = exports.createArticle = exports.getArticles = exports.articleRepository = void 0;
const dataSource_1 = require("../dataSource");
const Article_1 = require("../entity/Article");
const BadRequestError_1 = require("../error/BadRequestError");
const logger_1 = __importDefault(require("../utils/logger"));
const fileUtils_1 = require("../utils/fileUtils");
const Category_1 = require("../entity/Category");
const imageUrl_1 = __importDefault(require("../utils/imageUrl"));
const articleService = (0, logger_1.default)("articleService");
exports.articleRepository = dataSource_1.AppDataSource.getRepository(Article_1.Article);
const findById = async (articleId) => {
    return await exports.articleRepository.findOneBy({ id: articleId });
};
const findBySlug = async (slug) => {
    return await exports.articleRepository.findOneBy({ slug });
};
const checkStatus = async (status) => {
    return status === "draft" || status === "published";
};
const getArticles = async (options = {}) => {
    console.log(options);
    const page = options.page || 1;
    const limit = options.limit || 5;
    const skip = (page - 1) * limit;
    const [articles, total] = await exports.articleRepository.findAndCount({
        relations: ["category"],
        skip,
        take: limit,
        order: { createdAt: "DESC" },
    });
    const lastPage = Math.ceil(total / limit);
    return {
        articles: articles.map((article) => ({
            ...article,
            image: (0, imageUrl_1.default)(article.image),
        })),
        meta: {
            total,
            page,
            lastPage,
            hasNextPage: page < lastPage,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getArticles = getArticles;
const findCategoryById = async (categoryId) => {
    const category = await dataSource_1.AppDataSource.getRepository(Category_1.Category).findOneBy({
        id: categoryId,
    });
    if (!category) {
        throw new BadRequestError_1.BadRequestError("Category not found");
    }
    return category;
};
const formatSlug = (slug) => {
    return slug.trim().replace(/\s+/g, "-");
};
const createArticle = async (article, file) => {
    try {
        articleService.info("Creating new article with image");
        const newArticle = new Article_1.Article();
        if (!article.title ||
            !article.content ||
            !article.slug ||
            !article.categoryId) {
            if (file?.filename)
                await (0, fileUtils_1.deleteFiles)(file.filename);
            throw new BadRequestError_1.BadRequestError("Title, content, slug and categoryId are required");
        }
        // Format slug by replacing whitespace with hyphens
        const formattedSlug = formatSlug(article.slug);
        // Fetch the category first
        const category = await findCategoryById(article.categoryId);
        newArticle.title = article.title;
        newArticle.image = file ? `${file.filename}` : "";
        newArticle.content = article.content;
        newArticle.viewCount = 0;
        newArticle.slug = formattedSlug; // Use formatted slug
        newArticle.status = article.status || "draft";
        newArticle.isBreaking = Boolean(article.isBreaking);
        newArticle.categoryId = category.id;
        const savedArticle = await exports.articleRepository.save(newArticle);
        return {
            ...savedArticle,
            image: (0, imageUrl_1.default)(savedArticle.image),
        };
    }
    catch (error) {
        // Clean up the uploaded file if anything fails
        if (file?.filename) {
            await (0, fileUtils_1.deleteFiles)(file.filename);
        }
        throw error;
    }
};
exports.createArticle = createArticle;
const newArticle = async (articleInformation, file) => {
    try {
        articleService.info("Checking if article with same slug already exists");
        const existingArticle = await findBySlug(articleInformation.slug);
        if (existingArticle) {
            if (file?.filename) {
                articleService.info(`Deleting uploaded file: ${file.filename}`);
                await (0, fileUtils_1.deleteFiles)(file.filename);
            }
            throw new BadRequestError_1.BadRequestError("Article with same slug already exists");
        }
        articleService.info("Creating new article");
        const newArticle = await (0, exports.createArticle)(articleInformation, file);
        return true;
    }
    catch (error) {
        // Clean up the uploaded file if anything fails
        if (file?.filename) {
            articleService.info(`Cleaning up file due to error: ${file.filename}`);
            await (0, fileUtils_1.deleteFiles)(file.filename);
        }
        throw error;
    }
};
exports.newArticle = newArticle;
const getArticleById = async (id) => {
    articleService.info("fetching article based on its id");
    const article = await exports.articleRepository.findOne({
        where: { id },
        relations: ["category"],
    });
    if (!article) {
        throw new BadRequestError_1.BadRequestError("Article not found");
    }
    // article.viewCount += 1;
    await exports.articleRepository.save(article);
    return {
        ...article,
        image: (0, imageUrl_1.default)(article.image),
    };
};
exports.getArticleById = getArticleById;
const updateArticle = async (id, articleInformation, file) => {
    articleService.info("Updating article");
    try {
        const existingArticle = await findById(id);
        if (!existingArticle) {
            if (file)
                await (0, fileUtils_1.deleteFiles)(file.path);
            throw new BadRequestError_1.BadRequestError("Article not found");
        }
        // If categoryId is being updated, verify the category exists
        if (articleInformation.categoryId) {
            await findCategoryById(articleInformation.categoryId);
        }
        if (articleInformation.slug &&
            articleInformation.slug.trim() !== existingArticle.slug) {
            const articleWithSlug = await findBySlug(articleInformation.slug.trim());
            if (articleWithSlug) {
                articleService.info("Deleting file", file);
                if (file)
                    await (0, fileUtils_1.deleteFiles)(file.path);
                throw new BadRequestError_1.BadRequestError("Article with same slug already exists");
            }
        }
        console.log(formatSlug(articleInformation.slug));
        const updateData = {
            ...articleInformation,
            isBreaking: Boolean(Number(articleInformation.isBreaking)),
            slug: articleInformation.slug
                ? formatSlug(articleInformation.slug)
                : existingArticle.slug,
            image: file ? `/${file.filename}` : existingArticle.image,
        };
        await exports.articleRepository.update(id, updateData);
        const updatedArticle = await findById(id);
        return {
            ...updatedArticle,
            image: (0, imageUrl_1.default)(updatedArticle?.image || ""),
        };
    }
    catch (error) {
        // Clean up the uploaded file if anything fails
        console.log(error);
        if (file?.filename) {
            await (0, fileUtils_1.deleteFiles)(file.filename);
        }
        throw error;
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (id) => {
    articleService.info("Deleting article");
    const existingArticle = await findById(id);
    if (!existingArticle) {
        throw new BadRequestError_1.BadRequestError("Article not found");
    }
    await exports.articleRepository.delete(id);
    return true;
};
exports.deleteArticle = deleteArticle;
const changeArticleStatus = async (id, status) => {
    articleService.info("Changing article status");
    const existingArticle = await findById(id);
    if (!existingArticle) {
        throw new BadRequestError_1.BadRequestError("Article not found");
    }
    await exports.articleRepository.update(id, { status });
    return true;
};
exports.changeArticleStatus = changeArticleStatus;
const getArticleBySlug = async (slug) => {
    const article = await exports.articleRepository.findOne({
        where: { slug },
        relations: ["category"],
    });
    if (!article) {
        throw new BadRequestError_1.BadRequestError("Article not found");
    }
    article.viewCount += 1;
    await exports.articleRepository.save(article);
    return {
        ...article,
        image: (0, imageUrl_1.default)(article.image),
    };
};
exports.getArticleBySlug = getArticleBySlug;
const searchArticles = async (query) => {
    // Split search terms
    const terms = query
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 2);
    if (terms.length === 0) {
        return [];
    }
    // Create the base query
    const queryBuilder = exports.articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.category", "category");
    // Add search conditions with scoring
    const conditions = [];
    const params = {};
    terms.forEach((term, index) => {
        const titleParam = `title${index}`;
        const contentParam = `content${index}`;
        params[titleParam] = `%${term}%`;
        params[contentParam] = `%${term}%`;
        conditions.push(`(
        CASE 
          WHEN LOWER(article.title) LIKE :${titleParam} THEN 3
          WHEN LOWER(article.content) LIKE :${contentParam} THEN 1
          ELSE 0 
        END
      )`);
    });
    // Combine all conditions with scoring
    const scoreExpression = conditions.join(" + ");
    const results = await queryBuilder
        .addSelect(`(${scoreExpression})`, "relevance_score")
        .where(`(${scoreExpression}) > 0`)
        .setParameters(params)
        .orderBy("relevance_score", "DESC")
        .addOrderBy("article.createdAt", "DESC")
        .getMany();
    return results.map((article) => ({
        ...article,
        image: (0, imageUrl_1.default)(article.image),
    }));
};
exports.searchArticles = searchArticles;
const getBreakingNews = async (options = {}) => {
    const page = options.page || 1;
    const limit = options.limit || 5;
    const skip = (page - 1) * limit;
    const [breakingNews, total] = await exports.articleRepository.findAndCount({
        where: { isBreaking: true },
        skip,
        take: limit,
        order: { createdAt: "DESC" },
    });
    const lastPage = Math.ceil(total / limit);
    return {
        data: breakingNews.map((article) => ({
            ...article,
            image: (0, imageUrl_1.default)(article.image),
        })),
        meta: {
            total,
            page,
            lastPage,
            hasNextPage: page < lastPage,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getBreakingNews = getBreakingNews;
const getAllArticlesByCategory = async (categoryId, options = {}) => {
    const page = options.page || 1;
    const limit = options.limit || 5;
    const skip = (page - 1) * limit;
    const [articles, total] = await exports.articleRepository.findAndCount({
        where: { categoryId },
        relations: ["category"],
        skip,
        take: limit,
        order: { createdAt: "DESC" },
    });
    const lastPage = Math.ceil(total / limit);
    return {
        articles: articles.map((article) => ({
            ...article,
            category: {
                id: article.category.id,
                name: article.category.name,
            },
            image: (0, imageUrl_1.default)(article.image),
        })),
        meta: {
            total,
            page,
            lastPage,
            hasNextPage: page < lastPage,
            hasPreviousPage: page > 1,
        },
    };
};
exports.getAllArticlesByCategory = getAllArticlesByCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOENBQThDO0FBQzlDLCtDQUE0QztBQUM1Qyw4REFBMkQ7QUFDM0QsNkRBQWtEO0FBR2xELGtEQUFpRDtBQUNqRCxpREFBOEM7QUFDOUMsaUVBQTRDO0FBSTVDLE1BQU0sY0FBYyxHQUFHLElBQUEsZ0JBQW1CLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUVoRCxRQUFBLGlCQUFpQixHQUFHLDBCQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFPLENBQUMsQ0FBQztBQUV0RSxNQUFNLFFBQVEsR0FBRyxLQUFLLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQzNDLE9BQU8sTUFBTSx5QkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7SUFDeEMsT0FBTyxNQUFNLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQzNDLE9BQU8sTUFBTSxLQUFLLE9BQU8sSUFBSSxNQUFNLEtBQUssV0FBVyxDQUFDO0FBQ3RELENBQUMsQ0FBQztBQUVLLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxVQUE2QixFQUFFLEVBQUUsRUFBRTtJQUNuRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUVoQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0seUJBQWlCLENBQUMsWUFBWSxDQUFDO1FBQzdELFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUN2QixJQUFJO1FBQ0osSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0tBQzdCLENBQUMsQ0FBQztJQUVILE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBRTFDLE9BQU87UUFDTCxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUMsR0FBRyxPQUFPO1lBQ1YsS0FBSyxFQUFFLElBQUEsa0JBQVcsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksRUFBRTtZQUNKLEtBQUs7WUFDTCxJQUFJO1lBQ0osUUFBUTtZQUNSLFdBQVcsRUFBRSxJQUFJLEdBQUcsUUFBUTtZQUM1QixlQUFlLEVBQUUsSUFBSSxHQUFHLENBQUM7U0FDMUI7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBNUJXLFFBQUEsV0FBVyxlQTRCdEI7QUFFRixNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxVQUFrQixFQUFFLEVBQUU7SUFDcEQsTUFBTSxRQUFRLEdBQUcsTUFBTSwwQkFBYSxDQUFDLGFBQWEsQ0FBQyxtQkFBUSxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3JFLEVBQUUsRUFBRSxVQUFVO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsTUFBTSxJQUFJLGlDQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQVUsRUFBRTtJQUMxQyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQztBQUVLLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFDaEMsT0FBeUMsRUFDekMsSUFBMEIsRUFDMUIsRUFBRTtJQUNGLElBQUksQ0FBQztRQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUN2RCxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUVqQyxJQUNFLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDZCxDQUFDLE9BQU8sQ0FBQyxPQUFPO1lBQ2hCLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDYixDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQ25CLENBQUM7WUFDRCxJQUFJLElBQUksRUFBRSxRQUFRO2dCQUFFLE1BQU0sSUFBQSx1QkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxNQUFNLElBQUksaUNBQWUsQ0FDdkIsa0RBQWtELENBQ25ELENBQUM7UUFDSixDQUFDO1FBRUQsbURBQW1EO1FBQ25ELE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0MsMkJBQTJCO1FBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTVELFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNqQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNsRCxVQUFVLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDckMsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDekIsVUFBVSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxxQkFBcUI7UUFDdEQsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQztRQUM5QyxVQUFVLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBRXBDLE1BQU0sWUFBWSxHQUFHLE1BQU0seUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTlELE9BQU87WUFDTCxHQUFHLFlBQVk7WUFDZixLQUFLLEVBQUUsSUFBQSxrQkFBVyxFQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7U0FDdkMsQ0FBQztJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsK0NBQStDO1FBQy9DLElBQUksSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBQSx1QkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsTUFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBaERXLFFBQUEsYUFBYSxpQkFnRHhCO0FBRUssTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUM3QixrQkFBMkIsRUFDM0IsSUFBMEIsRUFDMUIsRUFBRTtJQUNGLElBQUksQ0FBQztRQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUV6RSxNQUFNLGVBQWUsR0FBRyxNQUFNLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO2dCQUNuQixjQUFjLENBQUMsSUFBSSxDQUFDLDJCQUEyQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxJQUFBLHVCQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxNQUFNLElBQUksaUNBQWUsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRCxjQUFjLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLHFCQUFhLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLCtDQUErQztRQUMvQyxJQUFJLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztZQUNuQixjQUFjLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN2RSxNQUFNLElBQUEsdUJBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELE1BQU0sS0FBSyxDQUFDO0lBQ2QsQ0FBQztBQUNILENBQUMsQ0FBQztBQTNCVyxRQUFBLFVBQVUsY0EyQnJCO0FBRUssTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFO0lBQ2pELGNBQWMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN4RCxNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUM5QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDYixTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsTUFBTSxJQUFJLGlDQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsMEJBQTBCO0lBQzFCLE1BQU0seUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLE9BQU87UUFDTCxHQUFHLE9BQU87UUFDVixLQUFLLEVBQUUsSUFBQSxrQkFBVyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDbEMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQWZXLFFBQUEsY0FBYyxrQkFlekI7QUFFSyxNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ2hDLEVBQVUsRUFDVixrQkFBMkIsRUFDM0IsSUFBMEIsRUFDMUIsRUFBRTtJQUNGLGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDckIsSUFBSSxJQUFJO2dCQUFFLE1BQU0sSUFBQSx1QkFBVyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxNQUFNLElBQUksaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCw2REFBNkQ7UUFDN0QsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQyxNQUFNLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCxJQUNFLGtCQUFrQixDQUFDLElBQUk7WUFDdkIsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLGVBQWUsQ0FBQyxJQUFJLEVBQ3ZELENBQUM7WUFDRCxNQUFNLGVBQWUsR0FBRyxNQUFNLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6RSxJQUFJLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxJQUFJO29CQUFFLE1BQU0sSUFBQSx1QkFBVyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxJQUFJLGlDQUFlLENBQUMsdUNBQXVDLENBQUMsQ0FBQztZQUNyRSxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakQsTUFBTSxVQUFVLEdBQUc7WUFDakIsR0FBRyxrQkFBa0I7WUFDckIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUQsSUFBSSxFQUFFLGtCQUFrQixDQUFDLElBQUk7Z0JBQzNCLENBQUMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUk7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLO1NBQzFELENBQUM7UUFFRixNQUFNLHlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFL0MsTUFBTSxjQUFjLEdBQUcsTUFBTSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsT0FBTztZQUNMLEdBQUcsY0FBYztZQUNqQixLQUFLLEVBQUUsSUFBQSxrQkFBVyxFQUFDLGNBQWMsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1NBQ2hELENBQUM7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLCtDQUErQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBQSx1QkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsTUFBTSxLQUFLLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBdERXLFFBQUEsYUFBYSxpQkFzRHhCO0FBRUssTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLEVBQVUsRUFBRSxFQUFFO0lBQ2hELGNBQWMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4QyxNQUFNLGVBQWUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLGlDQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsTUFBTSx5QkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFSVyxRQUFBLGFBQWEsaUJBUXhCO0FBRUssTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQ3RFLGNBQWMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxNQUFNLGVBQWUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLGlDQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsTUFBTSx5QkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvQyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQVJXLFFBQUEsbUJBQW1CLHVCQVE5QjtBQUVLLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUFFLElBQVksRUFBRSxFQUFFO0lBQ3JELE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQzlDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRTtRQUNmLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQztLQUN4QixDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixNQUFNLElBQUksaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUN2QixNQUFNLHlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxPQUFPO1FBQ0wsR0FBRyxPQUFPO1FBQ1YsS0FBSyxFQUFFLElBQUEsa0JBQVcsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQ2xDLENBQUM7QUFDSixDQUFDLENBQUM7QUFkVyxRQUFBLGdCQUFnQixvQkFjM0I7QUFFSyxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsS0FBYSxFQUFFLEVBQUU7SUFDcEQscUJBQXFCO0lBQ3JCLE1BQU0sS0FBSyxHQUFHLEtBQUs7U0FDaEIsV0FBVyxFQUFFO1NBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVyQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsd0JBQXdCO0lBQ3hCLE1BQU0sWUFBWSxHQUFHLHlCQUFpQjtTQUNuQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7U0FDN0IsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFckQscUNBQXFDO0lBQ3JDLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztJQUNoQyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFFdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUM1QixNQUFNLFVBQVUsR0FBRyxRQUFRLEtBQUssRUFBRSxDQUFDO1FBQ25DLE1BQU0sWUFBWSxHQUFHLFVBQVUsS0FBSyxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLENBQUM7UUFDakMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLENBQUM7UUFFbkMsVUFBVSxDQUFDLElBQUksQ0FDYjs7NENBRXNDLFVBQVU7OENBQ1IsWUFBWTs7O1FBR2xELENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsc0NBQXNDO0lBQ3RDLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxZQUFZO1NBQy9CLFNBQVMsQ0FBQyxJQUFJLGVBQWUsR0FBRyxFQUFFLGlCQUFpQixDQUFDO1NBQ3BELEtBQUssQ0FBQyxJQUFJLGVBQWUsT0FBTyxDQUFDO1NBQ2pDLGFBQWEsQ0FBQyxNQUFNLENBQUM7U0FDckIsT0FBTyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQztTQUNsQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDO1NBQ3ZDLE9BQU8sRUFBRSxDQUFDO0lBRWIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLEdBQUcsT0FBTztRQUNWLEtBQUssRUFBRSxJQUFBLGtCQUFXLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQXBEVyxRQUFBLGNBQWMsa0JBb0R6QjtBQUVLLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxVQUE2QixFQUFFLEVBQUUsRUFBRTtJQUN2RSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNqQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFFaEMsTUFBTSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLHlCQUFpQixDQUFDLFlBQVksQ0FBQztRQUNqRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO1FBQzNCLElBQUk7UUFDSixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7S0FDN0IsQ0FBQyxDQUFDO0lBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFFMUMsT0FBTztRQUNMLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLEdBQUcsT0FBTztZQUNWLEtBQUssRUFBRSxJQUFBLGtCQUFXLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFDSCxJQUFJLEVBQUU7WUFDSixLQUFLO1lBQ0wsSUFBSTtZQUNKLFFBQVE7WUFDUixXQUFXLEVBQUUsSUFBSSxHQUFHLFFBQVE7WUFDNUIsZUFBZSxFQUFFLElBQUksR0FBRyxDQUFDO1NBQzFCO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQTNCVyxRQUFBLGVBQWUsbUJBMkIxQjtBQUVLLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUMzQyxVQUFrQixFQUNsQixVQUE2QixFQUFFLEVBQy9CLEVBQUU7SUFDRixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNqQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFFaEMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLHlCQUFpQixDQUFDLFlBQVksQ0FBQztRQUM3RCxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUU7UUFDckIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLElBQUk7UUFDSixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7S0FDN0IsQ0FBQyxDQUFDO0lBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFFMUMsT0FBTztRQUNMLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLEdBQUcsT0FBTztZQUNWLFFBQVEsRUFBRTtnQkFDUixFQUFFLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJO2FBQzVCO1lBQ0QsS0FBSyxFQUFFLElBQUEsa0JBQVcsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksRUFBRTtZQUNKLEtBQUs7WUFDTCxJQUFJO1lBQ0osUUFBUTtZQUNSLFdBQVcsRUFBRSxJQUFJLEdBQUcsUUFBUTtZQUM1QixlQUFlLEVBQUUsSUFBSSxHQUFHLENBQUM7U0FDMUI7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBbkNXLFFBQUEsd0JBQXdCLDRCQW1DbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBEYXRhU291cmNlIH0gZnJvbSBcIi4uL2RhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgQXJ0aWNsZSB9IGZyb20gXCIuLi9lbnRpdHkvQXJ0aWNsZVwiO1xyXG5pbXBvcnQgeyBCYWRSZXF1ZXN0RXJyb3IgfSBmcm9tIFwiLi4vZXJyb3IvQmFkUmVxdWVzdEVycm9yXCI7XHJcbmltcG9ydCBsb2dnZXJXaXRoTmFtZVNwYWNlIGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcclxuaW1wb3J0IHsgZGVsZXRlRmlsZXMgfSBmcm9tIFwiLi4vdXRpbHMvZmlsZVV0aWxzXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4uL2VudGl0eS9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgZ2V0SW1hZ2VVcmwgZnJvbSBcIi4uL3V0aWxzL2ltYWdlVXJsXCI7XHJcbmltcG9ydCB7IExpa2UsIElMaWtlIH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgUGFnaW5hdGlvbk9wdGlvbnMsIFBhZ2luYXRlZFJlc3BvbnNlIH0gZnJvbSBcIi4uL3R5cGVzL3BhZ2luYXRpb25cIjtcclxuXHJcbmNvbnN0IGFydGljbGVTZXJ2aWNlID0gbG9nZ2VyV2l0aE5hbWVTcGFjZShcImFydGljbGVTZXJ2aWNlXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFydGljbGVSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KEFydGljbGUpO1xyXG5cclxuY29uc3QgZmluZEJ5SWQgPSBhc3luYyAoYXJ0aWNsZUlkOiBudW1iZXIpID0+IHtcclxuICByZXR1cm4gYXdhaXQgYXJ0aWNsZVJlcG9zaXRvcnkuZmluZE9uZUJ5KHsgaWQ6IGFydGljbGVJZCB9KTtcclxufTtcclxuXHJcbmNvbnN0IGZpbmRCeVNsdWcgPSBhc3luYyAoc2x1Zzogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuIGF3YWl0IGFydGljbGVSZXBvc2l0b3J5LmZpbmRPbmVCeSh7IHNsdWcgfSk7XHJcbn07XHJcblxyXG5jb25zdCBjaGVja1N0YXR1cyA9IGFzeW5jIChzdGF0dXM6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiBzdGF0dXMgPT09IFwiZHJhZnRcIiB8fCBzdGF0dXMgPT09IFwicHVibGlzaGVkXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QXJ0aWNsZXMgPSBhc3luYyAob3B0aW9uczogUGFnaW5hdGlvbk9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xyXG4gIGNvbnN0IHBhZ2UgPSBvcHRpb25zLnBhZ2UgfHwgMTtcclxuICBjb25zdCBsaW1pdCA9IG9wdGlvbnMubGltaXQgfHwgNTtcclxuICBjb25zdCBza2lwID0gKHBhZ2UgLSAxKSAqIGxpbWl0O1xyXG5cclxuICBjb25zdCBbYXJ0aWNsZXMsIHRvdGFsXSA9IGF3YWl0IGFydGljbGVSZXBvc2l0b3J5LmZpbmRBbmRDb3VudCh7XHJcbiAgICByZWxhdGlvbnM6IFtcImNhdGVnb3J5XCJdLFxyXG4gICAgc2tpcCxcclxuICAgIHRha2U6IGxpbWl0LFxyXG4gICAgb3JkZXI6IHsgY3JlYXRlZEF0OiBcIkRFU0NcIiB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBsYXN0UGFnZSA9IE1hdGguY2VpbCh0b3RhbCAvIGxpbWl0KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGFydGljbGVzOiBhcnRpY2xlcy5tYXAoKGFydGljbGU6IEFydGljbGUpID0+ICh7XHJcbiAgICAgIC4uLmFydGljbGUsXHJcbiAgICAgIGltYWdlOiBnZXRJbWFnZVVybChhcnRpY2xlLmltYWdlKSxcclxuICAgIH0pKSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgdG90YWwsXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIGxhc3RQYWdlLFxyXG4gICAgICBoYXNOZXh0UGFnZTogcGFnZSA8IGxhc3RQYWdlLFxyXG4gICAgICBoYXNQcmV2aW91c1BhZ2U6IHBhZ2UgPiAxLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgZmluZENhdGVnb3J5QnlJZCA9IGFzeW5jIChjYXRlZ29yeUlkOiBudW1iZXIpID0+IHtcclxuICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IEFwcERhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShDYXRlZ29yeSkuZmluZE9uZUJ5KHtcclxuICAgIGlkOiBjYXRlZ29yeUlkLFxyXG4gIH0pO1xyXG4gIGlmICghY2F0ZWdvcnkpIHtcclxuICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXJyb3IoXCJDYXRlZ29yeSBub3QgZm91bmRcIik7XHJcbiAgfVxyXG4gIHJldHVybiBjYXRlZ29yeTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFNsdWcgPSAoc2x1Zzogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gc2x1Zy50cmltKCkucmVwbGFjZSgvXFxzKy9nLCBcIi1cIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQXJ0aWNsZSA9IGFzeW5jIChcclxuICBhcnRpY2xlOiBBcnRpY2xlICYgeyBjYXRlZ29yeUlkOiBudW1iZXIgfSxcclxuICBmaWxlPzogRXhwcmVzcy5NdWx0ZXIuRmlsZVxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgYXJ0aWNsZVNlcnZpY2UuaW5mbyhcIkNyZWF0aW5nIG5ldyBhcnRpY2xlIHdpdGggaW1hZ2VcIik7XHJcbiAgICBjb25zdCBuZXdBcnRpY2xlID0gbmV3IEFydGljbGUoKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICFhcnRpY2xlLnRpdGxlIHx8XHJcbiAgICAgICFhcnRpY2xlLmNvbnRlbnQgfHxcclxuICAgICAgIWFydGljbGUuc2x1ZyB8fFxyXG4gICAgICAhYXJ0aWNsZS5jYXRlZ29yeUlkXHJcbiAgICApIHtcclxuICAgICAgaWYgKGZpbGU/LmZpbGVuYW1lKSBhd2FpdCBkZWxldGVGaWxlcyhmaWxlLmZpbGVuYW1lKTtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcclxuICAgICAgICBcIlRpdGxlLCBjb250ZW50LCBzbHVnIGFuZCBjYXRlZ29yeUlkIGFyZSByZXF1aXJlZFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRm9ybWF0IHNsdWcgYnkgcmVwbGFjaW5nIHdoaXRlc3BhY2Ugd2l0aCBoeXBoZW5zXHJcbiAgICBjb25zdCBmb3JtYXR0ZWRTbHVnID0gZm9ybWF0U2x1ZyhhcnRpY2xlLnNsdWcpO1xyXG5cclxuICAgIC8vIEZldGNoIHRoZSBjYXRlZ29yeSBmaXJzdFxyXG4gICAgY29uc3QgY2F0ZWdvcnkgPSBhd2FpdCBmaW5kQ2F0ZWdvcnlCeUlkKGFydGljbGUuY2F0ZWdvcnlJZCk7XHJcblxyXG4gICAgbmV3QXJ0aWNsZS50aXRsZSA9IGFydGljbGUudGl0bGU7XHJcbiAgICBuZXdBcnRpY2xlLmltYWdlID0gZmlsZSA/IGAke2ZpbGUuZmlsZW5hbWV9YCA6IFwiXCI7XHJcbiAgICBuZXdBcnRpY2xlLmNvbnRlbnQgPSBhcnRpY2xlLmNvbnRlbnQ7XHJcbiAgICBuZXdBcnRpY2xlLnZpZXdDb3VudCA9IDA7XHJcbiAgICBuZXdBcnRpY2xlLnNsdWcgPSBmb3JtYXR0ZWRTbHVnOyAvLyBVc2UgZm9ybWF0dGVkIHNsdWdcclxuICAgIG5ld0FydGljbGUuc3RhdHVzID0gYXJ0aWNsZS5zdGF0dXMgfHwgXCJkcmFmdFwiO1xyXG4gICAgbmV3QXJ0aWNsZS5pc0JyZWFraW5nID0gQm9vbGVhbihhcnRpY2xlLmlzQnJlYWtpbmcpO1xyXG4gICAgbmV3QXJ0aWNsZS5jYXRlZ29yeUlkID0gY2F0ZWdvcnkuaWQ7XHJcblxyXG4gICAgY29uc3Qgc2F2ZWRBcnRpY2xlID0gYXdhaXQgYXJ0aWNsZVJlcG9zaXRvcnkuc2F2ZShuZXdBcnRpY2xlKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5zYXZlZEFydGljbGUsXHJcbiAgICAgIGltYWdlOiBnZXRJbWFnZVVybChzYXZlZEFydGljbGUuaW1hZ2UpLFxyXG4gICAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gQ2xlYW4gdXAgdGhlIHVwbG9hZGVkIGZpbGUgaWYgYW55dGhpbmcgZmFpbHNcclxuICAgIGlmIChmaWxlPy5maWxlbmFtZSkge1xyXG4gICAgICBhd2FpdCBkZWxldGVGaWxlcyhmaWxlLmZpbGVuYW1lKTtcclxuICAgIH1cclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBuZXdBcnRpY2xlID0gYXN5bmMgKFxyXG4gIGFydGljbGVJbmZvcm1hdGlvbjogQXJ0aWNsZSxcclxuICBmaWxlPzogRXhwcmVzcy5NdWx0ZXIuRmlsZVxyXG4pID0+IHtcclxuICB0cnkge1xyXG4gICAgYXJ0aWNsZVNlcnZpY2UuaW5mbyhcIkNoZWNraW5nIGlmIGFydGljbGUgd2l0aCBzYW1lIHNsdWcgYWxyZWFkeSBleGlzdHNcIik7XHJcblxyXG4gICAgY29uc3QgZXhpc3RpbmdBcnRpY2xlID0gYXdhaXQgZmluZEJ5U2x1ZyhhcnRpY2xlSW5mb3JtYXRpb24uc2x1Zyk7XHJcbiAgICBpZiAoZXhpc3RpbmdBcnRpY2xlKSB7XHJcbiAgICAgIGlmIChmaWxlPy5maWxlbmFtZSkge1xyXG4gICAgICAgIGFydGljbGVTZXJ2aWNlLmluZm8oYERlbGV0aW5nIHVwbG9hZGVkIGZpbGU6ICR7ZmlsZS5maWxlbmFtZX1gKTtcclxuICAgICAgICBhd2FpdCBkZWxldGVGaWxlcyhmaWxlLmZpbGVuYW1lKTtcclxuICAgICAgfVxyXG4gICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEVycm9yKFwiQXJ0aWNsZSB3aXRoIHNhbWUgc2x1ZyBhbHJlYWR5IGV4aXN0c1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBhcnRpY2xlU2VydmljZS5pbmZvKFwiQ3JlYXRpbmcgbmV3IGFydGljbGVcIik7XHJcbiAgICBjb25zdCBuZXdBcnRpY2xlID0gYXdhaXQgY3JlYXRlQXJ0aWNsZShhcnRpY2xlSW5mb3JtYXRpb24sIGZpbGUpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIC8vIENsZWFuIHVwIHRoZSB1cGxvYWRlZCBmaWxlIGlmIGFueXRoaW5nIGZhaWxzXHJcbiAgICBpZiAoZmlsZT8uZmlsZW5hbWUpIHtcclxuICAgICAgYXJ0aWNsZVNlcnZpY2UuaW5mbyhgQ2xlYW5pbmcgdXAgZmlsZSBkdWUgdG8gZXJyb3I6ICR7ZmlsZS5maWxlbmFtZX1gKTtcclxuICAgICAgYXdhaXQgZGVsZXRlRmlsZXMoZmlsZS5maWxlbmFtZSk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QXJ0aWNsZUJ5SWQgPSBhc3luYyAoaWQ6IG51bWJlcikgPT4ge1xyXG4gIGFydGljbGVTZXJ2aWNlLmluZm8oXCJmZXRjaGluZyBhcnRpY2xlIGJhc2VkIG9uIGl0cyBpZFwiKTtcclxuICBjb25zdCBhcnRpY2xlID0gYXdhaXQgYXJ0aWNsZVJlcG9zaXRvcnkuZmluZE9uZSh7XHJcbiAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgcmVsYXRpb25zOiBbXCJjYXRlZ29yeVwiXSxcclxuICB9KTtcclxuICBpZiAoIWFydGljbGUpIHtcclxuICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXJyb3IoXCJBcnRpY2xlIG5vdCBmb3VuZFwiKTtcclxuICB9XHJcbiAgLy8gYXJ0aWNsZS52aWV3Q291bnQgKz0gMTtcclxuICBhd2FpdCBhcnRpY2xlUmVwb3NpdG9yeS5zYXZlKGFydGljbGUpO1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5hcnRpY2xlLFxyXG4gICAgaW1hZ2U6IGdldEltYWdlVXJsKGFydGljbGUuaW1hZ2UpLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlQXJ0aWNsZSA9IGFzeW5jIChcclxuICBpZDogbnVtYmVyLFxyXG4gIGFydGljbGVJbmZvcm1hdGlvbjogQXJ0aWNsZSxcclxuICBmaWxlPzogRXhwcmVzcy5NdWx0ZXIuRmlsZVxyXG4pID0+IHtcclxuICBhcnRpY2xlU2VydmljZS5pbmZvKFwiVXBkYXRpbmcgYXJ0aWNsZVwiKTtcclxuICB0cnkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdBcnRpY2xlID0gYXdhaXQgZmluZEJ5SWQoaWQpO1xyXG4gICAgaWYgKCFleGlzdGluZ0FydGljbGUpIHtcclxuICAgICAgaWYgKGZpbGUpIGF3YWl0IGRlbGV0ZUZpbGVzKGZpbGUucGF0aCk7XHJcbiAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXJyb3IoXCJBcnRpY2xlIG5vdCBmb3VuZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBjYXRlZ29yeUlkIGlzIGJlaW5nIHVwZGF0ZWQsIHZlcmlmeSB0aGUgY2F0ZWdvcnkgZXhpc3RzXHJcbiAgICBpZiAoYXJ0aWNsZUluZm9ybWF0aW9uLmNhdGVnb3J5SWQpIHtcclxuICAgICAgYXdhaXQgZmluZENhdGVnb3J5QnlJZChhcnRpY2xlSW5mb3JtYXRpb24uY2F0ZWdvcnlJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBhcnRpY2xlSW5mb3JtYXRpb24uc2x1ZyAmJlxyXG4gICAgICBhcnRpY2xlSW5mb3JtYXRpb24uc2x1Zy50cmltKCkgIT09IGV4aXN0aW5nQXJ0aWNsZS5zbHVnXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgYXJ0aWNsZVdpdGhTbHVnID0gYXdhaXQgZmluZEJ5U2x1ZyhhcnRpY2xlSW5mb3JtYXRpb24uc2x1Zy50cmltKCkpO1xyXG4gICAgICBpZiAoYXJ0aWNsZVdpdGhTbHVnKSB7XHJcbiAgICAgICAgYXJ0aWNsZVNlcnZpY2UuaW5mbyhcIkRlbGV0aW5nIGZpbGVcIiwgZmlsZSk7XHJcbiAgICAgICAgaWYgKGZpbGUpIGF3YWl0IGRlbGV0ZUZpbGVzKGZpbGUucGF0aCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkFydGljbGUgd2l0aCBzYW1lIHNsdWcgYWxyZWFkeSBleGlzdHNcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKGZvcm1hdFNsdWcoYXJ0aWNsZUluZm9ybWF0aW9uLnNsdWcpKTtcclxuICAgIGNvbnN0IHVwZGF0ZURhdGEgPSB7XHJcbiAgICAgIC4uLmFydGljbGVJbmZvcm1hdGlvbixcclxuICAgICAgaXNCcmVha2luZzogQm9vbGVhbihOdW1iZXIoYXJ0aWNsZUluZm9ybWF0aW9uLmlzQnJlYWtpbmcpKSxcclxuICAgICAgc2x1ZzogYXJ0aWNsZUluZm9ybWF0aW9uLnNsdWdcclxuICAgICAgICA/IGZvcm1hdFNsdWcoYXJ0aWNsZUluZm9ybWF0aW9uLnNsdWcpXHJcbiAgICAgICAgOiBleGlzdGluZ0FydGljbGUuc2x1ZyxcclxuICAgICAgaW1hZ2U6IGZpbGUgPyBgLyR7ZmlsZS5maWxlbmFtZX1gIDogZXhpc3RpbmdBcnRpY2xlLmltYWdlLFxyXG4gICAgfTtcclxuXHJcbiAgICBhd2FpdCBhcnRpY2xlUmVwb3NpdG9yeS51cGRhdGUoaWQsIHVwZGF0ZURhdGEpO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZWRBcnRpY2xlID0gYXdhaXQgZmluZEJ5SWQoaWQpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4udXBkYXRlZEFydGljbGUsXHJcbiAgICAgIGltYWdlOiBnZXRJbWFnZVVybCh1cGRhdGVkQXJ0aWNsZT8uaW1hZ2UgfHwgXCJcIiksXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyBDbGVhbiB1cCB0aGUgdXBsb2FkZWQgZmlsZSBpZiBhbnl0aGluZyBmYWlsc1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgaWYgKGZpbGU/LmZpbGVuYW1lKSB7XHJcbiAgICAgIGF3YWl0IGRlbGV0ZUZpbGVzKGZpbGUuZmlsZW5hbWUpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFydGljbGUgPSBhc3luYyAoaWQ6IG51bWJlcikgPT4ge1xyXG4gIGFydGljbGVTZXJ2aWNlLmluZm8oXCJEZWxldGluZyBhcnRpY2xlXCIpO1xyXG4gIGNvbnN0IGV4aXN0aW5nQXJ0aWNsZSA9IGF3YWl0IGZpbmRCeUlkKGlkKTtcclxuICBpZiAoIWV4aXN0aW5nQXJ0aWNsZSkge1xyXG4gICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkFydGljbGUgbm90IGZvdW5kXCIpO1xyXG4gIH1cclxuICBhd2FpdCBhcnRpY2xlUmVwb3NpdG9yeS5kZWxldGUoaWQpO1xyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoYW5nZUFydGljbGVTdGF0dXMgPSBhc3luYyAoaWQ6IG51bWJlciwgc3RhdHVzOiBzdHJpbmcpID0+IHtcclxuICBhcnRpY2xlU2VydmljZS5pbmZvKFwiQ2hhbmdpbmcgYXJ0aWNsZSBzdGF0dXNcIik7XHJcbiAgY29uc3QgZXhpc3RpbmdBcnRpY2xlID0gYXdhaXQgZmluZEJ5SWQoaWQpO1xyXG4gIGlmICghZXhpc3RpbmdBcnRpY2xlKSB7XHJcbiAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEVycm9yKFwiQXJ0aWNsZSBub3QgZm91bmRcIik7XHJcbiAgfVxyXG4gIGF3YWl0IGFydGljbGVSZXBvc2l0b3J5LnVwZGF0ZShpZCwgeyBzdGF0dXMgfSk7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QXJ0aWNsZUJ5U2x1ZyA9IGFzeW5jIChzbHVnOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCBhcnRpY2xlID0gYXdhaXQgYXJ0aWNsZVJlcG9zaXRvcnkuZmluZE9uZSh7XHJcbiAgICB3aGVyZTogeyBzbHVnIH0sXHJcbiAgICByZWxhdGlvbnM6IFtcImNhdGVnb3J5XCJdLFxyXG4gIH0pO1xyXG4gIGlmICghYXJ0aWNsZSkge1xyXG4gICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkFydGljbGUgbm90IGZvdW5kXCIpO1xyXG4gIH1cclxuICBhcnRpY2xlLnZpZXdDb3VudCArPSAxO1xyXG4gIGF3YWl0IGFydGljbGVSZXBvc2l0b3J5LnNhdmUoYXJ0aWNsZSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLmFydGljbGUsXHJcbiAgICBpbWFnZTogZ2V0SW1hZ2VVcmwoYXJ0aWNsZS5pbWFnZSksXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWFyY2hBcnRpY2xlcyA9IGFzeW5jIChxdWVyeTogc3RyaW5nKSA9PiB7XHJcbiAgLy8gU3BsaXQgc2VhcmNoIHRlcm1zXHJcbiAgY29uc3QgdGVybXMgPSBxdWVyeVxyXG4gICAgLnRvTG93ZXJDYXNlKClcclxuICAgIC5zcGxpdChcIiBcIilcclxuICAgIC5maWx0ZXIoKHRlcm0pID0+IHRlcm0ubGVuZ3RoID4gMik7XHJcblxyXG4gIGlmICh0ZXJtcy5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgYmFzZSBxdWVyeVxyXG4gIGNvbnN0IHF1ZXJ5QnVpbGRlciA9IGFydGljbGVSZXBvc2l0b3J5XHJcbiAgICAuY3JlYXRlUXVlcnlCdWlsZGVyKFwiYXJ0aWNsZVwiKVxyXG4gICAgLmxlZnRKb2luQW5kU2VsZWN0KFwiYXJ0aWNsZS5jYXRlZ29yeVwiLCBcImNhdGVnb3J5XCIpO1xyXG5cclxuICAvLyBBZGQgc2VhcmNoIGNvbmRpdGlvbnMgd2l0aCBzY29yaW5nXHJcbiAgY29uc3QgY29uZGl0aW9uczogc3RyaW5nW10gPSBbXTtcclxuICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xyXG5cclxuICB0ZXJtcy5mb3JFYWNoKCh0ZXJtLCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgdGl0bGVQYXJhbSA9IGB0aXRsZSR7aW5kZXh9YDtcclxuICAgIGNvbnN0IGNvbnRlbnRQYXJhbSA9IGBjb250ZW50JHtpbmRleH1gO1xyXG4gICAgcGFyYW1zW3RpdGxlUGFyYW1dID0gYCUke3Rlcm19JWA7XHJcbiAgICBwYXJhbXNbY29udGVudFBhcmFtXSA9IGAlJHt0ZXJtfSVgO1xyXG5cclxuICAgIGNvbmRpdGlvbnMucHVzaChcclxuICAgICAgYChcclxuICAgICAgICBDQVNFIFxyXG4gICAgICAgICAgV0hFTiBMT1dFUihhcnRpY2xlLnRpdGxlKSBMSUtFIDoke3RpdGxlUGFyYW19IFRIRU4gM1xyXG4gICAgICAgICAgV0hFTiBMT1dFUihhcnRpY2xlLmNvbnRlbnQpIExJS0UgOiR7Y29udGVudFBhcmFtfSBUSEVOIDFcclxuICAgICAgICAgIEVMU0UgMCBcclxuICAgICAgICBFTkRcclxuICAgICAgKWBcclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIENvbWJpbmUgYWxsIGNvbmRpdGlvbnMgd2l0aCBzY29yaW5nXHJcbiAgY29uc3Qgc2NvcmVFeHByZXNzaW9uID0gY29uZGl0aW9ucy5qb2luKFwiICsgXCIpO1xyXG5cclxuICBjb25zdCByZXN1bHRzID0gYXdhaXQgcXVlcnlCdWlsZGVyXHJcbiAgICAuYWRkU2VsZWN0KGAoJHtzY29yZUV4cHJlc3Npb259KWAsIFwicmVsZXZhbmNlX3Njb3JlXCIpXHJcbiAgICAud2hlcmUoYCgke3Njb3JlRXhwcmVzc2lvbn0pID4gMGApXHJcbiAgICAuc2V0UGFyYW1ldGVycyhwYXJhbXMpXHJcbiAgICAub3JkZXJCeShcInJlbGV2YW5jZV9zY29yZVwiLCBcIkRFU0NcIilcclxuICAgIC5hZGRPcmRlckJ5KFwiYXJ0aWNsZS5jcmVhdGVkQXRcIiwgXCJERVNDXCIpXHJcbiAgICAuZ2V0TWFueSgpO1xyXG5cclxuICByZXR1cm4gcmVzdWx0cy5tYXAoKGFydGljbGUpID0+ICh7XHJcbiAgICAuLi5hcnRpY2xlLFxyXG4gICAgaW1hZ2U6IGdldEltYWdlVXJsKGFydGljbGUuaW1hZ2UpLFxyXG4gIH0pKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcmVha2luZ05ld3MgPSBhc3luYyAob3B0aW9uczogUGFnaW5hdGlvbk9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gIGNvbnN0IHBhZ2UgPSBvcHRpb25zLnBhZ2UgfHwgMTtcclxuICBjb25zdCBsaW1pdCA9IG9wdGlvbnMubGltaXQgfHwgNTtcclxuICBjb25zdCBza2lwID0gKHBhZ2UgLSAxKSAqIGxpbWl0O1xyXG5cclxuICBjb25zdCBbYnJlYWtpbmdOZXdzLCB0b3RhbF0gPSBhd2FpdCBhcnRpY2xlUmVwb3NpdG9yeS5maW5kQW5kQ291bnQoe1xyXG4gICAgd2hlcmU6IHsgaXNCcmVha2luZzogdHJ1ZSB9LFxyXG4gICAgc2tpcCxcclxuICAgIHRha2U6IGxpbWl0LFxyXG4gICAgb3JkZXI6IHsgY3JlYXRlZEF0OiBcIkRFU0NcIiB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBsYXN0UGFnZSA9IE1hdGguY2VpbCh0b3RhbCAvIGxpbWl0KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRhdGE6IGJyZWFraW5nTmV3cy5tYXAoKGFydGljbGUpID0+ICh7XHJcbiAgICAgIC4uLmFydGljbGUsXHJcbiAgICAgIGltYWdlOiBnZXRJbWFnZVVybChhcnRpY2xlLmltYWdlKSxcclxuICAgIH0pKSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgdG90YWwsXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIGxhc3RQYWdlLFxyXG4gICAgICBoYXNOZXh0UGFnZTogcGFnZSA8IGxhc3RQYWdlLFxyXG4gICAgICBoYXNQcmV2aW91c1BhZ2U6IHBhZ2UgPiAxLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFsbEFydGljbGVzQnlDYXRlZ29yeSA9IGFzeW5jIChcclxuICBjYXRlZ29yeUlkOiBudW1iZXIsXHJcbiAgb3B0aW9uczogUGFnaW5hdGlvbk9wdGlvbnMgPSB7fVxyXG4pID0+IHtcclxuICBjb25zdCBwYWdlID0gb3B0aW9ucy5wYWdlIHx8IDE7XHJcbiAgY29uc3QgbGltaXQgPSBvcHRpb25zLmxpbWl0IHx8IDU7XHJcbiAgY29uc3Qgc2tpcCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuXHJcbiAgY29uc3QgW2FydGljbGVzLCB0b3RhbF0gPSBhd2FpdCBhcnRpY2xlUmVwb3NpdG9yeS5maW5kQW5kQ291bnQoe1xyXG4gICAgd2hlcmU6IHsgY2F0ZWdvcnlJZCB9LFxyXG4gICAgcmVsYXRpb25zOiBbXCJjYXRlZ29yeVwiXSxcclxuICAgIHNraXAsXHJcbiAgICB0YWtlOiBsaW1pdCxcclxuICAgIG9yZGVyOiB7IGNyZWF0ZWRBdDogXCJERVNDXCIgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgbGFzdFBhZ2UgPSBNYXRoLmNlaWwodG90YWwgLyBsaW1pdCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhcnRpY2xlczogYXJ0aWNsZXMubWFwKChhcnRpY2xlKSA9PiAoe1xyXG4gICAgICAuLi5hcnRpY2xlLFxyXG4gICAgICBjYXRlZ29yeToge1xyXG4gICAgICAgIGlkOiBhcnRpY2xlLmNhdGVnb3J5LmlkLFxyXG4gICAgICAgIG5hbWU6IGFydGljbGUuY2F0ZWdvcnkubmFtZSxcclxuICAgICAgfSxcclxuICAgICAgaW1hZ2U6IGdldEltYWdlVXJsKGFydGljbGUuaW1hZ2UpLFxyXG4gICAgfSkpLFxyXG4gICAgbWV0YToge1xyXG4gICAgICB0b3RhbCxcclxuICAgICAgcGFnZSxcclxuICAgICAgbGFzdFBhZ2UsXHJcbiAgICAgIGhhc05leHRQYWdlOiBwYWdlIDwgbGFzdFBhZ2UsXHJcbiAgICAgIGhhc1ByZXZpb3VzUGFnZTogcGFnZSA+IDEsXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcbiJdfQ==