"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const categorySeed_1 = require("./categorySeed");
const userSeed_1 = require("./userSeed");
async function main() {
    try {
        await dataSource_1.AppDataSource.initialize();
        const seedName = "initial_seed";
        const seedLogCheckQuery = `SELECT * FROM seed_log WHERE seed_name = $1`;
        const seedLogInsertQuery = `INSERT INTO seed_log (seed_name) VALUES ($1)`;
        const seedLog = await dataSource_1.AppDataSource.query(seedLogCheckQuery, [seedName]);
        // Check if seed log exists
        if (seedLog.length > 0) {
            // If seed log exists, check if users table is empty
            const userCountQuery = `SELECT COUNT(*) FROM users`;
            const userCountResult = await dataSource_1.AppDataSource.query(userCountQuery);
            const userCount = parseInt(userCountResult[0].count);
            if (userCount === 0) {
                console.log("Users table is empty. Truncating all tables and seeding again.");
                const tablesToTruncate = [
                    "roles",
                    "permissions",
                    "user_roles",
                    "exercises",
                    "seed_log",
                ];
                const truncatePromises = tablesToTruncate.map((table) => dataSource_1.AppDataSource.query(`TRUNCATE TABLE ${table} CASCADE`));
                await Promise.all(truncatePromises);
                await dataSource_1.AppDataSource.query(seedLogInsertQuery, [seedName]);
            }
            else {
                console.log("Seeding has already been completed.");
                return;
            }
        }
        else {
            // If seed log does not exist, proceed to insert it
            await dataSource_1.AppDataSource.query(seedLogInsertQuery, [seedName]);
        }
        // Seed the tables
        await (0, userSeed_1.userSeed)();
        await (0, categorySeed_1.seedCategories)();
        console.log("Seeding successful ");
    }
    catch (err) {
        console.log("Error:", err);
    }
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpblNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VlZHMvbWFpblNlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBOEM7QUFDOUMsaURBQWdEO0FBQ2hELHlDQUFzQztBQUV0QyxLQUFLLFVBQVUsSUFBSTtJQUNqQixJQUFJLENBQUM7UUFDSCxNQUFNLDBCQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLE1BQU0saUJBQWlCLEdBQUcsNkNBQTZDLENBQUM7UUFDeEUsTUFBTSxrQkFBa0IsR0FBRyw4Q0FBOEMsQ0FBQztRQUUxRSxNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFhLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUV6RSwyQkFBMkI7UUFDM0IsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLG9EQUFvRDtZQUNwRCxNQUFNLGNBQWMsR0FBRyw0QkFBNEIsQ0FBQztZQUNwRCxNQUFNLGVBQWUsR0FBRyxNQUFNLDBCQUFhLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFckQsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZ0VBQWdFLENBQ2pFLENBQUM7Z0JBQ0YsTUFBTSxnQkFBZ0IsR0FBRztvQkFDdkIsT0FBTztvQkFDUCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxVQUFVO2lCQUNYLENBQUM7Z0JBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUN0RCwwQkFBYSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxVQUFVLENBQUMsQ0FDdkQsQ0FBQztnQkFDRixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDcEMsTUFBTSwwQkFBYSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztnQkFDbkQsT0FBTztZQUNULENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLG1EQUFtRDtZQUNuRCxNQUFNLDBCQUFhLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsa0JBQWtCO1FBQ2xCLE1BQU0sSUFBQSxtQkFBUSxHQUFFLENBQUM7UUFDakIsTUFBTSxJQUFBLDZCQUFjLEdBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0FBQ0gsQ0FBQztBQUVELElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IHNlZWRDYXRlZ29yaWVzIH0gZnJvbSBcIi4vY2F0ZWdvcnlTZWVkXCI7XHJcbmltcG9ydCB7IHVzZXJTZWVkIH0gZnJvbSBcIi4vdXNlclNlZWRcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IEFwcERhdGFTb3VyY2UuaW5pdGlhbGl6ZSgpO1xyXG4gICAgY29uc3Qgc2VlZE5hbWUgPSBcImluaXRpYWxfc2VlZFwiO1xyXG4gICAgY29uc3Qgc2VlZExvZ0NoZWNrUXVlcnkgPSBgU0VMRUNUICogRlJPTSBzZWVkX2xvZyBXSEVSRSBzZWVkX25hbWUgPSAkMWA7XHJcbiAgICBjb25zdCBzZWVkTG9nSW5zZXJ0UXVlcnkgPSBgSU5TRVJUIElOVE8gc2VlZF9sb2cgKHNlZWRfbmFtZSkgVkFMVUVTICgkMSlgO1xyXG5cclxuICAgIGNvbnN0IHNlZWRMb2cgPSBhd2FpdCBBcHBEYXRhU291cmNlLnF1ZXJ5KHNlZWRMb2dDaGVja1F1ZXJ5LCBbc2VlZE5hbWVdKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBzZWVkIGxvZyBleGlzdHNcclxuICAgIGlmIChzZWVkTG9nLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gSWYgc2VlZCBsb2cgZXhpc3RzLCBjaGVjayBpZiB1c2VycyB0YWJsZSBpcyBlbXB0eVxyXG4gICAgICBjb25zdCB1c2VyQ291bnRRdWVyeSA9IGBTRUxFQ1QgQ09VTlQoKikgRlJPTSB1c2Vyc2A7XHJcbiAgICAgIGNvbnN0IHVzZXJDb3VudFJlc3VsdCA9IGF3YWl0IEFwcERhdGFTb3VyY2UucXVlcnkodXNlckNvdW50UXVlcnkpO1xyXG4gICAgICBjb25zdCB1c2VyQ291bnQgPSBwYXJzZUludCh1c2VyQ291bnRSZXN1bHRbMF0uY291bnQpO1xyXG5cclxuICAgICAgaWYgKHVzZXJDb3VudCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgXCJVc2VycyB0YWJsZSBpcyBlbXB0eS4gVHJ1bmNhdGluZyBhbGwgdGFibGVzIGFuZCBzZWVkaW5nIGFnYWluLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB0YWJsZXNUb1RydW5jYXRlID0gW1xyXG4gICAgICAgICAgXCJyb2xlc1wiLFxyXG4gICAgICAgICAgXCJwZXJtaXNzaW9uc1wiLFxyXG4gICAgICAgICAgXCJ1c2VyX3JvbGVzXCIsXHJcbiAgICAgICAgICBcImV4ZXJjaXNlc1wiLFxyXG4gICAgICAgICAgXCJzZWVkX2xvZ1wiLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY29uc3QgdHJ1bmNhdGVQcm9taXNlcyA9IHRhYmxlc1RvVHJ1bmNhdGUubWFwKCh0YWJsZSkgPT5cclxuICAgICAgICAgIEFwcERhdGFTb3VyY2UucXVlcnkoYFRSVU5DQVRFIFRBQkxFICR7dGFibGV9IENBU0NBREVgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodHJ1bmNhdGVQcm9taXNlcyk7XHJcbiAgICAgICAgYXdhaXQgQXBwRGF0YVNvdXJjZS5xdWVyeShzZWVkTG9nSW5zZXJ0UXVlcnksIFtzZWVkTmFtZV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VlZGluZyBoYXMgYWxyZWFkeSBiZWVuIGNvbXBsZXRlZC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBJZiBzZWVkIGxvZyBkb2VzIG5vdCBleGlzdCwgcHJvY2VlZCB0byBpbnNlcnQgaXRcclxuICAgICAgYXdhaXQgQXBwRGF0YVNvdXJjZS5xdWVyeShzZWVkTG9nSW5zZXJ0UXVlcnksIFtzZWVkTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlZWQgdGhlIHRhYmxlc1xyXG4gICAgYXdhaXQgdXNlclNlZWQoKTtcclxuICAgIGF3YWl0IHNlZWRDYXRlZ29yaWVzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlNlZWRpbmcgc3VjY2Vzc2Z1bCBcIik7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yOlwiLCBlcnIpO1xyXG4gIH1cclxufVxyXG5cclxubWFpbigpO1xyXG4iXX0=