"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const encrypter_1 = require("../utils/encrypter");
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const BadRequestError_1 = require("../error/BadRequestError");
const userService = __importStar(require("./user"));
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("authService");
const login = async (body) => {
    const existingUser = await userService.findByEmail(body.email);
    if (!existingUser) {
        throw new BadRequestError_1.BadRequestError("User not found");
    }
    const userPassword = await (0, encrypter_1.comparePassword)(body.password, existingUser.password);
    if (!userPassword)
        throw new BadRequestError_1.BadRequestError("Password doesn't match");
    const user = await userService.getUser(existingUser.id);
    if (!user)
        throw new BadRequestError_1.BadRequestError("User not found");
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const secretKey = config_1.default.jwt.secret;
    const accessToken = (0, jsonwebtoken_1.sign)(payload, secretKey, {
        expiresIn: config_1.default.jwt.accessExpiration,
    });
    const refreshToken = (0, jsonwebtoken_1.sign)(payload, secretKey, {
        expiresIn: config_1.default.jwt.refreshTokenExpiration,
    });
    return { accessToken, refreshToken };
};
exports.login = login;
const logout = async (refreshToken) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(refreshToken, config_1.default.jwt.secret);
        if (!decoded) {
            throw new BadRequestError_1.BadRequestError("Invalid refresh token");
        }
        return {
            accessToken: null,
            refreshToken: null,
        };
    }
    catch (error) {
        // Handle specific JWT errors
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                throw new BadRequestError_1.BadRequestError("Token has expired");
            }
            if (error.name === "JsonWebTokenError") {
                throw new BadRequestError_1.BadRequestError("Invalid token");
            }
        }
        throw new BadRequestError_1.BadRequestError("Invalid refresh token");
    }
};
exports.logout = logout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBcUQ7QUFFckQsdURBQStCO0FBQy9CLCtDQUE0QztBQUM1Qyw4REFBMkQ7QUFDM0Qsb0RBQXNDO0FBQ3RDLDZEQUFrRDtBQUNsRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFtQixFQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sS0FBSyxHQUFHLEtBQUssRUFBRSxJQUFzQyxFQUFFLEVBQUU7SUFDcEUsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbEIsTUFBTSxJQUFJLGlDQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFBLDJCQUFlLEVBQ3hDLElBQUksQ0FBQyxRQUFRLEVBQ2IsWUFBWSxDQUFDLFFBQVEsQ0FDdEIsQ0FBQztJQUNGLElBQUksQ0FBQyxZQUFZO1FBQUUsTUFBTSxJQUFJLGlDQUFlLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN2RSxNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLGlDQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RCxNQUFNLE9BQU8sR0FBRztRQUNkLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztRQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDaEIsQ0FBQztJQUNGLE1BQU0sU0FBUyxHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQztJQUVyQyxNQUFNLFdBQVcsR0FBRyxJQUFBLG1CQUFJLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtRQUMzQyxTQUFTLEVBQUUsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO0tBQ3ZDLENBQUMsQ0FBQztJQUVILE1BQU0sWUFBWSxHQUFHLElBQUEsbUJBQUksRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO1FBQzVDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0I7S0FDN0MsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsQ0FBQztBQUN2QyxDQUFDLENBQUM7QUE1QlcsUUFBQSxLQUFLLFNBNEJoQjtBQUVLLE1BQU0sTUFBTSxHQUFHLEtBQUssRUFBRSxZQUFvQixFQUFFLEVBQUU7SUFDbkQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBQSxxQkFBTSxFQUFDLFlBQVksRUFBRSxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDYixNQUFNLElBQUksaUNBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCxPQUFPO1lBQ0wsV0FBVyxFQUFFLElBQUk7WUFDakIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQztJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsNkJBQTZCO1FBQzdCLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRSxDQUFDO1lBQzNCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxtQkFBbUIsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLElBQUksaUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFDRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssbUJBQW1CLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxJQUFJLGlDQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLElBQUksaUNBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7QUFDSCxDQUFDLENBQUM7QUF2QlcsUUFBQSxNQUFNLFVBdUJqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3VzZXJcIjtcclxuaW1wb3J0IHsgY29tcGFyZVBhc3N3b3JkIH0gZnJvbSBcIi4uL3V0aWxzL2VuY3J5cHRlclwiO1xyXG5cclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IHNpZ24sIHZlcmlmeSB9IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IHsgQmFkUmVxdWVzdEVycm9yIH0gZnJvbSBcIi4uL2Vycm9yL0JhZFJlcXVlc3RFcnJvclwiO1xyXG5pbXBvcnQgKiBhcyB1c2VyU2VydmljZSBmcm9tIFwiLi91c2VyXCI7XHJcbmltcG9ydCBsb2dnZXJXaXRoTmFtZVNwYWNlIGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcclxuY29uc3QgbG9nZ2VyID0gbG9nZ2VyV2l0aE5hbWVTcGFjZShcImF1dGhTZXJ2aWNlXCIpO1xyXG5leHBvcnQgY29uc3QgbG9naW4gPSBhc3luYyAoYm9keTogUGljazxVc2VyLCBcImVtYWlsXCIgfCBcInBhc3N3b3JkXCI+KSA9PiB7XHJcbiAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgdXNlclNlcnZpY2UuZmluZEJ5RW1haWwoYm9keS5lbWFpbCk7XHJcbiAgaWYgKCFleGlzdGluZ1VzZXIpIHtcclxuICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXJyb3IoXCJVc2VyIG5vdCBmb3VuZFwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHVzZXJQYXNzd29yZCA9IGF3YWl0IGNvbXBhcmVQYXNzd29yZChcclxuICAgIGJvZHkucGFzc3dvcmQsXHJcbiAgICBleGlzdGluZ1VzZXIucGFzc3dvcmRcclxuICApO1xyXG4gIGlmICghdXNlclBhc3N3b3JkKSB0aHJvdyBuZXcgQmFkUmVxdWVzdEVycm9yKFwiUGFzc3dvcmQgZG9lc24ndCBtYXRjaFwiKTtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgdXNlclNlcnZpY2UuZ2V0VXNlcihleGlzdGluZ1VzZXIuaWQpO1xyXG4gIGlmICghdXNlcikgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIlVzZXIgbm90IGZvdW5kXCIpO1xyXG4gIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICBpZDogdXNlci5pZCxcclxuICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgcm9sZTogdXNlci5yb2xlLFxyXG4gIH07XHJcbiAgY29uc3Qgc2VjcmV0S2V5ID0gY29uZmlnLmp3dC5zZWNyZXQhO1xyXG5cclxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IHNpZ24ocGF5bG9hZCwgc2VjcmV0S2V5LCB7XHJcbiAgICBleHBpcmVzSW46IGNvbmZpZy5qd3QuYWNjZXNzRXhwaXJhdGlvbixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVmcmVzaFRva2VuID0gc2lnbihwYXlsb2FkLCBzZWNyZXRLZXksIHtcclxuICAgIGV4cGlyZXNJbjogY29uZmlnLmp3dC5yZWZyZXNoVG9rZW5FeHBpcmF0aW9uLFxyXG4gIH0pO1xyXG4gIHJldHVybiB7IGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4gfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dvdXQgPSBhc3luYyAocmVmcmVzaFRva2VuOiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgZGVjb2RlZCA9IHZlcmlmeShyZWZyZXNoVG9rZW4sIGNvbmZpZy5qd3Quc2VjcmV0ISk7XHJcbiAgICBpZiAoIWRlY29kZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEJhZFJlcXVlc3RFcnJvcihcIkludmFsaWQgcmVmcmVzaCB0b2tlblwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhY2Nlc3NUb2tlbjogbnVsbCxcclxuICAgICAgcmVmcmVzaFRva2VuOiBudWxsLFxyXG4gICAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gSGFuZGxlIHNwZWNpZmljIEpXVCBlcnJvcnNcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvci5uYW1lID09PSBcIlRva2VuRXhwaXJlZEVycm9yXCIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEVycm9yKFwiVG9rZW4gaGFzIGV4cGlyZWRcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVycm9yLm5hbWUgPT09IFwiSnNvbldlYlRva2VuRXJyb3JcIikge1xyXG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXJyb3IoXCJJbnZhbGlkIHRva2VuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgQmFkUmVxdWVzdEVycm9yKFwiSW52YWxpZCByZWZyZXNoIHRva2VuXCIpO1xyXG4gIH1cclxufTtcclxuIl19