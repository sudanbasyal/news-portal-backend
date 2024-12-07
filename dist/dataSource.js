"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("./config"));
exports.AppDataSource = new typeorm_1.DataSource(config_1.default.database);
const initializeDatabase = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log("Data Source has been initialized!!");
    }
    catch (err) {
        throw new Error("Database initialization failed");
    }
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhU291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUFxQztBQUNyQyxzREFBOEI7QUFFakIsUUFBQSxhQUFhLEdBQUcsSUFBSSxvQkFBVSxDQUFDLGdCQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFdEQsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLElBQUksRUFBRTtJQUMzQyxJQUFJLENBQUM7UUFDSCxNQUFNLHFCQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3BELENBQUM7QUFDSCxDQUFDLENBQUM7QUFQVyxRQUFBLGtCQUFrQixzQkFPN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHBEYXRhU291cmNlID0gbmV3IERhdGFTb3VyY2UoY29uZmlnLmRhdGFiYXNlKTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0aWFsaXplRGF0YWJhc2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IEFwcERhdGFTb3VyY2UuaW5pdGlhbGl6ZSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJEYXRhIFNvdXJjZSBoYXMgYmVlbiBpbml0aWFsaXplZCEhXCIpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRGF0YWJhc2UgaW5pdGlhbGl6YXRpb24gZmFpbGVkXCIpO1xyXG4gIH1cclxufTtcclxuIl19