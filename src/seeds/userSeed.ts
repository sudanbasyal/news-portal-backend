import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";

export const userSeed = async () => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userData = [
      // Strength exercises
      {
        name: "admin",
        email: "admin@gmail.com",
        password:
          "$2a$10$KbMGRyBojSrA6MFYKsmQo.B12H/mg0HjiJyyyaB1eq7w2mVCFzp0W",
        role: "admin",
      },
      {
        //generate random user
        name: "user",
        email: "user@gmail.com",
        password:
          "$2a$10$KbMGRyBojSrA6MFYKsmQo.B12H/mg0HjiJyyyaB1eq7w2mVCFzp0W",
        role: "user",
      },
    ];

    const userPromises = userData.map(async (userData) => {
      const user = new User();
      user.name = userData.name;
      user.email = userData.email;
      user.password = userData.password;
      user.role = userData.role;
      return await queryRunner.manager.save(user);
    });

    await Promise.all(userPromises);

    await queryRunner.commitTransaction();
    console.log("Users seeded successfully");
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error("Error seeding Users:", err);
  } finally {
    await queryRunner.release();
  }
};
