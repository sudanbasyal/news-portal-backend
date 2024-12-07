import { AppDataSource } from "../dataSource";
import { Category } from "../entity/Category";

export const seedCategories = async () => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const categories = [
      { name: "Politics" },
      { name: "Business" },
      { name: "Technology" },
      { name: "Entertainment" },
      { name: "Sports" },
      { name: "Health" },
      { name: "Science" },
      { name: "World" },
      { name: "Education" },
      { name: "Environment" },
    ];

    const categoryPromises = categories.map(async (categoryData) => {
      const category = new Category();
      category.name = categoryData.name;
      return await queryRunner.manager.save(category);
    });

    await Promise.all(categoryPromises);

    await queryRunner.commitTransaction();
    console.log("✅ News categories seeded successfully");
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error("❌ Error seeding categories:", err);
  } finally {
    await queryRunner.release();
  }
};
