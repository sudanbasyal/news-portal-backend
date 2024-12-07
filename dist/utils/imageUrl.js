"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const getImageUrl = (imagePath) => {
    if (!imagePath)
        return null;
    const normalizedPath = imagePath.startsWith("/")
        ? imagePath
        : `/${imagePath}`;
    return `${config_1.default.apiUrl}/public${encodeURI(normalizedPath)}`;
};
exports.default = getImageUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VVcmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW1hZ2VVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1REFBK0I7QUFFL0IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxTQUF3QixFQUFpQixFQUFFO0lBQzlELElBQUksQ0FBQyxTQUFTO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDNUIsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7UUFDOUMsQ0FBQyxDQUFDLFNBQVM7UUFDWCxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUNwQixPQUFPLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLFVBQVUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7QUFDL0QsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcblxyXG5jb25zdCBnZXRJbWFnZVVybCA9IChpbWFnZVBhdGg6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCBudWxsID0+IHtcclxuICBpZiAoIWltYWdlUGF0aCkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSBpbWFnZVBhdGguc3RhcnRzV2l0aChcIi9cIilcclxuICAgID8gaW1hZ2VQYXRoXHJcbiAgICA6IGAvJHtpbWFnZVBhdGh9YDtcclxuICByZXR1cm4gYCR7Y29uZmlnLmFwaVVybH0vcHVibGljJHtlbmNvZGVVUkkobm9ybWFsaXplZFBhdGgpfWA7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRJbWFnZVVybDtcclxuIl19