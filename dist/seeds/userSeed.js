"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSeed = void 0;
const dataSource_1 = require("../dataSource");
const User_1 = require("../entity/User");
const userSeed = async () => {
    const queryRunner = dataSource_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const userData = [
            // Strength exercises
            {
                name: "admin",
                email: "admin@gmail.com",
                password: "$2a$10$KbMGRyBojSrA6MFYKsmQo.B12H/mg0HjiJyyyaB1eq7w2mVCFzp0W",
                role: "admin",
            },
            {
                //generate random user
                name: "user",
                email: "user@gmail.com",
                password: "$2a$10$KbMGRyBojSrA6MFYKsmQo.B12H/mg0HjiJyyyaB1eq7w2mVCFzp0W",
                role: "user",
            },
        ];
        const userPromises = userData.map(async (userData) => {
            const user = new User_1.User();
            user.name = userData.name;
            user.email = userData.email;
            user.password = userData.password;
            user.role = userData.role;
            return await queryRunner.manager.save(user);
        });
        await Promise.all(userPromises);
        await queryRunner.commitTransaction();
        console.log("Users seeded successfully");
    }
    catch (err) {
        await queryRunner.rollbackTransaction();
        console.error("Error seeding Users:", err);
    }
    finally {
        await queryRunner.release();
    }
};
exports.userSeed = userSeed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VlZHMvdXNlclNlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQThDO0FBQzlDLHlDQUFzQztBQUUvQixNQUFNLFFBQVEsR0FBRyxLQUFLLElBQUksRUFBRTtJQUNqQyxNQUFNLFdBQVcsR0FBRywwQkFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFdEQsTUFBTSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsTUFBTSxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUVyQyxJQUFJLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRztZQUNmLHFCQUFxQjtZQUNyQjtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixRQUFRLEVBQ04sOERBQThEO2dCQUNoRSxJQUFJLEVBQUUsT0FBTzthQUNkO1lBQ0Q7Z0JBQ0Usc0JBQXNCO2dCQUN0QixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixRQUFRLEVBQ04sOERBQThEO2dCQUNoRSxJQUFJLEVBQUUsTUFBTTthQUNiO1NBQ0YsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ25ELE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoQyxNQUFNLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLE1BQU0sV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO1lBQVMsQ0FBQztRQUNULE1BQU0sV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7QUFDSCxDQUFDLENBQUM7QUE3Q1csUUFBQSxRQUFRLFlBNkNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vZGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2VudGl0eS9Vc2VyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlclNlZWQgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcXVlcnlSdW5uZXIgPSBBcHBEYXRhU291cmNlLmNyZWF0ZVF1ZXJ5UnVubmVyKCk7XHJcblxyXG4gIGF3YWl0IHF1ZXJ5UnVubmVyLmNvbm5lY3QoKTtcclxuICBhd2FpdCBxdWVyeVJ1bm5lci5zdGFydFRyYW5zYWN0aW9uKCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IFtcclxuICAgICAgLy8gU3RyZW5ndGggZXhlcmNpc2VzXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcImFkbWluXCIsXHJcbiAgICAgICAgZW1haWw6IFwiYWRtaW5AZ21haWwuY29tXCIsXHJcbiAgICAgICAgcGFzc3dvcmQ6XHJcbiAgICAgICAgICBcIiQyYSQxMCRLYk1HUnlCb2pTckE2TUZZS3NtUW8uQjEySC9tZzBIamlKeXl5YUIxZXE3dzJtVkNGenAwV1wiLFxyXG4gICAgICAgIHJvbGU6IFwiYWRtaW5cIixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIC8vZ2VuZXJhdGUgcmFuZG9tIHVzZXJcclxuICAgICAgICBuYW1lOiBcInVzZXJcIixcclxuICAgICAgICBlbWFpbDogXCJ1c2VyQGdtYWlsLmNvbVwiLFxyXG4gICAgICAgIHBhc3N3b3JkOlxyXG4gICAgICAgICAgXCIkMmEkMTAkS2JNR1J5Qm9qU3JBNk1GWUtzbVFvLkIxMkgvbWcwSGppSnl5eWFCMWVxN3cybVZDRnpwMFdcIixcclxuICAgICAgICByb2xlOiBcInVzZXJcIixcclxuICAgICAgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgdXNlclByb21pc2VzID0gdXNlckRhdGEubWFwKGFzeW5jICh1c2VyRGF0YSkgPT4ge1xyXG4gICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgdXNlci5uYW1lID0gdXNlckRhdGEubmFtZTtcclxuICAgICAgdXNlci5lbWFpbCA9IHVzZXJEYXRhLmVtYWlsO1xyXG4gICAgICB1c2VyLnBhc3N3b3JkID0gdXNlckRhdGEucGFzc3dvcmQ7XHJcbiAgICAgIHVzZXIucm9sZSA9IHVzZXJEYXRhLnJvbGU7XHJcbiAgICAgIHJldHVybiBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUodXNlcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbCh1c2VyUHJvbWlzZXMpO1xyXG5cclxuICAgIGF3YWl0IHF1ZXJ5UnVubmVyLmNvbW1pdFRyYW5zYWN0aW9uKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlVzZXJzIHNlZWRlZCBzdWNjZXNzZnVsbHlcIik7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBhd2FpdCBxdWVyeVJ1bm5lci5yb2xsYmFja1RyYW5zYWN0aW9uKCk7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VlZGluZyBVc2VyczpcIiwgZXJyKTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgYXdhaXQgcXVlcnlSdW5uZXIucmVsZWFzZSgpO1xyXG4gIH1cclxufTtcclxuIl19