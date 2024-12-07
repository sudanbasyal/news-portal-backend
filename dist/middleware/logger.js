"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLogger = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("RequestLoger");
const RequestLogger = (req, res, next) => {
    logger.info(`${req.method}:$${req.url}`);
    next();
};
exports.RequestLogger = RequestLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmUvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLDZEQUFrRDtBQUdsRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFtQixFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTVDLE1BQU0sYUFBYSxHQUFHLENBQzNCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0IsRUFDbEIsRUFBRTtJQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDO0FBUFcsUUFBQSxhQUFhLGlCQU94QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5cclxuaW1wb3J0IGxvZ2dlcldpdGhOYW1lU3BhY2UgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSBcIi4uL2ludGVyZmFjZS9yZXF1ZXN0XCI7XHJcblxyXG5jb25zdCBsb2dnZXIgPSBsb2dnZXJXaXRoTmFtZVNwYWNlKFwiUmVxdWVzdExvZ2VyXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJlcXVlc3RMb2dnZXIgPSAoXHJcbiAgcmVxOiBSZXF1ZXN0LFxyXG4gIHJlczogUmVzcG9uc2UsXHJcbiAgbmV4dDogTmV4dEZ1bmN0aW9uXHJcbikgPT4ge1xyXG4gIGxvZ2dlci5pbmZvKGAke3JlcS5tZXRob2R9OiQke3JlcS51cmx9YCk7XHJcbiAgbmV4dCgpO1xyXG59O1xyXG4iXX0=