import { AppDataSource } from "../dataSource";
import { Category } from "../entity/Category";
import { BadRequestError } from "../error/BadRequestError";
import { PaginationOptions } from "../types/pagination";
import getImageUrl from "../utils/imageUrl";
import loggerWithNameSpace from "../utils/logger";

const categoryService = loggerWithNameSpace("categoryService");

const categoryRepository = AppDataSource.getRepository(Category);

const findByName = async (name: string) => {
  return await categoryRepository.findOneBy({ name });
};
// Create new category
export const createCategory = async (categoryData: Category) => {
  const existingCategory = await findByName(categoryData.name);
  if (existingCategory) {
    throw new BadRequestError("Category with this name already exists");
  }

  const category = categoryRepository.create(categoryData);
  return await categoryRepository.save(category);
};

// Get all categories
export const getAllCategories = async () => {
  const categories = await categoryRepository.find({
    relations: ["articles"],
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    articleCount: category.articles.length,
  }));
};

// Get single category
export const getCategory = async (id: number) => {
  const category = await categoryRepository.findOne({
    where: { id },
    relations: ["articles"],
  });

  if (!category) {
    throw new BadRequestError("Category not found");
  }
  return category;
};

// Update category
export const updateCategory = async (id: number, categoryData: Category) => {
  const category = await categoryRepository.findOneBy({ id });
  if (!category) {
    throw new BadRequestError("Category not found");
  }

  // Check if new name conflicts with existing category
  if (categoryData.name !== category.name) {
    const existingCategory = await categoryRepository.findOneBy({
      name: categoryData.name,
    });
    if (existingCategory) {
      throw new BadRequestError("Category with this name already exists");
    }
  }

  Object.assign(category, categoryData);
  return await categoryRepository.save(category);
};

// Delete category
export const deleteCategory = async (id: number) => {
  const category = await categoryRepository.findOneBy({ id });
  if (!category) {
    throw new BadRequestError("Category not found");
  }
  categoryService.info("Detleted category");
  await categoryRepository.delete(id);
  return true;
};

export const getAllArticlesByCategory = async (
  categoryId: number,
  options: PaginationOptions = {}
) => {
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
      image: getImageUrl(article.image),
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
