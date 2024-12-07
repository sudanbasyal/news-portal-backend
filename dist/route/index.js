"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const article_1 = __importDefault(require("./article"));
const category_1 = __importDefault(require("./category"));
const comment_1 = __importDefault(require("./comment"));
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/article", article_1.default);
router.use("/category", category_1.default);
router.use("/comment", comment_1.default);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBaUM7QUFDakMsa0RBQWdDO0FBQ2hDLHdEQUFzQztBQUN0QywwREFBd0M7QUFDeEMsd0RBQXNDO0FBQ3RDLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQVUsQ0FBQyxDQUFDO0FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGlCQUFhLENBQUMsQ0FBQztBQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxrQkFBYyxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsaUJBQWEsQ0FBQyxDQUFDO0FBQ3RDLGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBhdXRoUm91dGVzIGZyb20gXCIuL2F1dGhcIjtcclxuaW1wb3J0IGFydGljbGVSb3V0ZXMgZnJvbSBcIi4vYXJ0aWNsZVwiO1xyXG5pbXBvcnQgY2F0ZWdvcnlSb3V0ZXMgZnJvbSBcIi4vY2F0ZWdvcnlcIjtcclxuaW1wb3J0IGNvbW1lbnRSb3V0ZXMgZnJvbSBcIi4vY29tbWVudFwiO1xyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci51c2UoXCIvYXV0aFwiLCBhdXRoUm91dGVzKTtcclxucm91dGVyLnVzZShcIi9hcnRpY2xlXCIsIGFydGljbGVSb3V0ZXMpO1xyXG5yb3V0ZXIudXNlKFwiL2NhdGVnb3J5XCIsIGNhdGVnb3J5Um91dGVzKTtcclxucm91dGVyLnVzZShcIi9jb21tZW50XCIsIGNvbW1lbnRSb3V0ZXMpO1xyXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XHJcbiJdfQ==