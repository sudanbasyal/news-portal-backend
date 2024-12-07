"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (password) => {
    try {
        // Number of salt rounds
        const saltRounds = 10;
        // Generate hash
        const hash = await bcryptjs_1.default.hash(password, saltRounds);
        console.log("hash", hash);
    }
    catch (err) {
        console.error("Error hashing password:", err);
    }
};
exports.hashPassword = hashPassword;
// Convert 123456 to bcrypt hash
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9oYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUE4QjtBQUV2QixNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQ3JELElBQUksQ0FBQztRQUNILHdCQUF3QjtRQUN4QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFdEIsZ0JBQWdCO1FBQ2hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBWFcsUUFBQSxZQUFZLGdCQVd2QjtBQUVGLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gYXN5bmMgKHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gTnVtYmVyIG9mIHNhbHQgcm91bmRzXHJcbiAgICBjb25zdCBzYWx0Um91bmRzID0gMTA7XHJcblxyXG4gICAgLy8gR2VuZXJhdGUgaGFzaFxyXG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCBzYWx0Um91bmRzKTtcclxuICAgIGNvbnNvbGUubG9nKFwiaGFzaFwiLCBoYXNoKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBoYXNoaW5nIHBhc3N3b3JkOlwiLCBlcnIpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIENvbnZlcnQgMTIzNDU2IHRvIGJjcnlwdCBoYXNoXHJcbiJdfQ==