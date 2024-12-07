"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const UnauthenticatedError_1 = require("../error/UnauthenticatedError");
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("AuthMiddleware");
const authenticate = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        next(new UnauthenticatedError_1.UnauthenticatedError("Unauthenticated"));
        return;
    }
    const token = authorization.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer") {
        next(new UnauthenticatedError_1.UnauthenticatedError("Access denied"));
        return;
    }
    try {
        const user = (0, jsonwebtoken_1.verify)(token[1], config_1.default.jwt.secret);
        req.user = user;
        logger.info("user authenticated");
        next();
    }
    catch (error) {
        throw new UnauthenticatedError_1.UnauthenticatedError("please login again");
    }
};
exports.authenticate = authenticate;
const authorize = () => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return;
        }
        const hasPermission = user.role === "admin";
        logger.info("checking user permission", hasPermission);
        if (!hasPermission) {
            next(new UnauthenticatedError_1.UnauthenticatedError("Forbidden"));
        }
        logger.info("user authorized");
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsK0NBQXNDO0FBQ3RDLHVEQUErQjtBQUUvQix3RUFBcUU7QUFDckUsNkRBQWtEO0FBRWxELE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQW1CLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUU5QyxNQUFNLFlBQVksR0FBRyxDQUMxQixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCLEVBQ2xCLEVBQUU7SUFDRixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUN0QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksMkNBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV2QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSwyQ0FBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE9BQU87SUFDVCxDQUFDO0lBQ0QsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQUcsSUFBQSxxQkFBTSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQVMsQ0FBQztRQUMxRCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sSUFBSSwyQ0FBb0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7QUFDSCxDQUFDLENBQUM7QUExQlcsUUFBQSxZQUFZLGdCQTBCdkI7QUFFSyxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUU7SUFDNUIsT0FBTyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQ3pELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSwyQ0FBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFL0IsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFqQlcsUUFBQSxTQUFTLGFBaUJwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSBcIi4uL2ludGVyZmFjZS9yZXF1ZXN0XCI7XHJcbmltcG9ydCB7IHZlcmlmeSB9IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3VzZXJcIjtcclxuaW1wb3J0IHsgVW5hdXRoZW50aWNhdGVkRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3IvVW5hdXRoZW50aWNhdGVkRXJyb3JcIjtcclxuaW1wb3J0IGxvZ2dlcldpdGhOYW1lU3BhY2UgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xyXG5cclxuY29uc3QgbG9nZ2VyID0gbG9nZ2VyV2l0aE5hbWVTcGFjZShcIkF1dGhNaWRkbGV3YXJlXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhlbnRpY2F0ZSA9IChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgcmVzOiBSZXNwb25zZSxcclxuICBuZXh0OiBOZXh0RnVuY3Rpb25cclxuKSA9PiB7XHJcbiAgY29uc3QgeyBhdXRob3JpemF0aW9uIH0gPSByZXEuaGVhZGVycztcclxuICBpZiAoIWF1dGhvcml6YXRpb24pIHtcclxuICAgIG5leHQobmV3IFVuYXV0aGVudGljYXRlZEVycm9yKFwiVW5hdXRoZW50aWNhdGVkXCIpKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRva2VuID0gYXV0aG9yaXphdGlvbi5zcGxpdChcIiBcIik7XHJcblxyXG4gIGlmICh0b2tlbi5sZW5ndGggIT09IDIgfHwgdG9rZW5bMF0gIT09IFwiQmVhcmVyXCIpIHtcclxuICAgIG5leHQobmV3IFVuYXV0aGVudGljYXRlZEVycm9yKFwiQWNjZXNzIGRlbmllZFwiKSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1c2VyID0gdmVyaWZ5KHRva2VuWzFdLCBjb25maWcuand0LnNlY3JldCEpIGFzIFVzZXI7XHJcbiAgICByZXEudXNlciA9IHVzZXI7XHJcblxyXG4gICAgbG9nZ2VyLmluZm8oXCJ1c2VyIGF1dGhlbnRpY2F0ZWRcIik7XHJcbiAgICBuZXh0KCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IG5ldyBVbmF1dGhlbnRpY2F0ZWRFcnJvcihcInBsZWFzZSBsb2dpbiBhZ2FpblwiKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aG9yaXplID0gKCkgPT4ge1xyXG4gIHJldHVybiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IHVzZXIgPSByZXEudXNlciE7XHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhc1Blcm1pc3Npb24gPSB1c2VyLnJvbGUgPT09IFwiYWRtaW5cIjtcclxuICAgIGxvZ2dlci5pbmZvKFwiY2hlY2tpbmcgdXNlciBwZXJtaXNzaW9uXCIsIGhhc1Blcm1pc3Npb24pO1xyXG5cclxuICAgIGlmICghaGFzUGVybWlzc2lvbikge1xyXG4gICAgICBuZXh0KG5ldyBVbmF1dGhlbnRpY2F0ZWRFcnJvcihcIkZvcmJpZGRlblwiKSk7XHJcbiAgICB9XHJcbiAgICBsb2dnZXIuaW5mbyhcInVzZXIgYXV0aG9yaXplZFwiKTtcclxuXHJcbiAgICBuZXh0KCk7XHJcbiAgfTtcclxufTtcclxuIl19