"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCategories = void 0;
const dataSource_1 = require("../dataSource");
const Category_1 = require("../entity/Category");
const seedCategories = async () => {
    const queryRunner = dataSource_1.AppDataSource.createQueryRunner();
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
            const category = new Category_1.Category();
            category.name = categoryData.name;
            return await queryRunner.manager.save(category);
        });
        await Promise.all(categoryPromises);
        await queryRunner.commitTransaction();
        console.log("✅ News categories seeded successfully");
    }
    catch (err) {
        await queryRunner.rollbackTransaction();
        console.error("❌ Error seeding categories:", err);
    }
    finally {
        await queryRunner.release();
    }
};
exports.seedCategories = seedCategories;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnlTZWVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlZWRzL2NhdGVnb3J5U2VlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBOEM7QUFDOUMsaURBQThDO0FBRXZDLE1BQU0sY0FBYyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3ZDLE1BQU0sV0FBVyxHQUFHLDBCQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUV0RCxNQUFNLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixNQUFNLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBRXJDLElBQUksQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHO1lBQ2pCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNwQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3RCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNuQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3JCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRTtTQUN4QixDQUFDO1FBRUYsTUFBTSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRTtZQUM3RCxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztZQUNoQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDbEMsT0FBTyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFcEMsTUFBTSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixNQUFNLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsQ0FBQztZQUFTLENBQUM7UUFDVCxNQUFNLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBcENXLFFBQUEsY0FBYyxrQkFvQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4uL2VudGl0eS9DYXRlZ29yeVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlZWRDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IHF1ZXJ5UnVubmVyID0gQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeVJ1bm5lcigpO1xyXG5cclxuICBhd2FpdCBxdWVyeVJ1bm5lci5jb25uZWN0KCk7XHJcbiAgYXdhaXQgcXVlcnlSdW5uZXIuc3RhcnRUcmFuc2FjdGlvbigpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IFtcclxuICAgICAgeyBuYW1lOiBcIlBvbGl0aWNzXCIgfSxcclxuICAgICAgeyBuYW1lOiBcIkJ1c2luZXNzXCIgfSxcclxuICAgICAgeyBuYW1lOiBcIlRlY2hub2xvZ3lcIiB9LFxyXG4gICAgICB7IG5hbWU6IFwiRW50ZXJ0YWlubWVudFwiIH0sXHJcbiAgICAgIHsgbmFtZTogXCJTcG9ydHNcIiB9LFxyXG4gICAgICB7IG5hbWU6IFwiSGVhbHRoXCIgfSxcclxuICAgICAgeyBuYW1lOiBcIlNjaWVuY2VcIiB9LFxyXG4gICAgICB7IG5hbWU6IFwiV29ybGRcIiB9LFxyXG4gICAgICB7IG5hbWU6IFwiRWR1Y2F0aW9uXCIgfSxcclxuICAgICAgeyBuYW1lOiBcIkVudmlyb25tZW50XCIgfSxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgY2F0ZWdvcnlQcm9taXNlcyA9IGNhdGVnb3JpZXMubWFwKGFzeW5jIChjYXRlZ29yeURhdGEpID0+IHtcclxuICAgICAgY29uc3QgY2F0ZWdvcnkgPSBuZXcgQ2F0ZWdvcnkoKTtcclxuICAgICAgY2F0ZWdvcnkubmFtZSA9IGNhdGVnb3J5RGF0YS5uYW1lO1xyXG4gICAgICByZXR1cm4gYXdhaXQgcXVlcnlSdW5uZXIubWFuYWdlci5zYXZlKGNhdGVnb3J5KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IFByb21pc2UuYWxsKGNhdGVnb3J5UHJvbWlzZXMpO1xyXG5cclxuICAgIGF3YWl0IHF1ZXJ5UnVubmVyLmNvbW1pdFRyYW5zYWN0aW9uKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIuKchSBOZXdzIGNhdGVnb3JpZXMgc2VlZGVkIHN1Y2Nlc3NmdWxseVwiKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGF3YWl0IHF1ZXJ5UnVubmVyLnJvbGxiYWNrVHJhbnNhY3Rpb24oKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgRXJyb3Igc2VlZGluZyBjYXRlZ29yaWVzOlwiLCBlcnIpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBhd2FpdCBxdWVyeVJ1bm5lci5yZWxlYXNlKCk7XHJcbiAgfVxyXG59O1xyXG4iXX0=