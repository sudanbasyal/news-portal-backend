"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./middleware/logger");
const route_1 = __importDefault(require("./route"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
// Serve static files for uploads
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// router middleware
app.use(logger_1.RequestLogger);
app.use(route_1.default);
app.use(errorHandler_1.genericErrorHandler);
// Modify the server startup to wait for DB connection
// const startServer = async () => {
//   try {
//     const app = await initializeApp();
//     app.listen(config.port, () => {
//       console.log(`app is listening on ${config.port}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// };
// startServer();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsNEJBQTBCO0FBQzFCLGdEQUF3QjtBQUV4QixnREFBd0I7QUFDeEIsb0RBQTRCO0FBSTVCLDREQUFnRTtBQUNoRSxnREFBb0Q7QUFDcEQsb0RBQTZCO0FBRzdCLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxnQkFBTSxHQUFFLENBQUMsQ0FBQztBQUVsQixpQ0FBaUM7QUFDakMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXRFLEdBQUcsQ0FBQyxHQUFHLENBQ0wsSUFBQSxjQUFJLEVBQUM7SUFDSCxNQUFNLEVBQUUsR0FBRztJQUNYLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGNBQWMsRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLENBQUM7SUFDckUsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztDQUN2RCxDQUFDLENBQ0gsQ0FBQztBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWpELG9CQUFvQjtBQUVwQixHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFhLENBQUMsQ0FBQztBQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxDQUFDO0FBRWhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0NBQW1CLENBQUMsQ0FBQztBQUU3QixzREFBc0Q7QUFDdEQsb0NBQW9DO0FBQ3BDLFVBQVU7QUFDVix5Q0FBeUM7QUFDekMsc0NBQXNDO0FBQ3RDLDJEQUEyRDtBQUMzRCxVQUFVO0FBQ1Ysc0JBQXNCO0FBQ3RCLHVEQUF1RDtBQUN2RCx1QkFBdUI7QUFDdkIsTUFBTTtBQUNOLEtBQUs7QUFFTCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xyXG5pbXBvcnQgaGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcclxuXHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IGluaXRpYWxpemVEYXRhYmFzZSB9IGZyb20gXCIuL2RhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgZ2VuZXJpY0Vycm9ySGFuZGxlciB9IGZyb20gXCIuL21pZGRsZXdhcmUvZXJyb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IFJlcXVlc3RMb2dnZXIgfSBmcm9tIFwiLi9taWRkbGV3YXJlL2xvZ2dlclwiO1xyXG5pbXBvcnQgcm91dGVyIGZyb20gXCIuL3JvdXRlXCI7XHJcbmltcG9ydCB7IGluaXRpYWxpemVBcHAgfSBmcm9tIFwiLi4vYXBwXCI7XHJcblxyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcblxyXG5hcHAudXNlKGhlbG1ldCgpKTtcclxuXHJcbi8vIFNlcnZlIHN0YXRpYyBmaWxlcyBmb3IgdXBsb2Fkc1xyXG5hcHAudXNlKFwiL3B1YmxpY1wiLCBleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL3B1YmxpY1wiKSkpO1xyXG5cclxuYXBwLnVzZShcclxuICBjb3JzKHtcclxuICAgIG9yaWdpbjogXCIqXCIsXHJcbiAgICBjcmVkZW50aWFsczogdHJ1ZSxcclxuICAgIGFsbG93ZWRIZWFkZXJzOiBbXCJDb250ZW50LVR5cGVcIiwgXCJBdXRob3JpemF0aW9uXCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiXSxcclxuICAgIG1ldGhvZHM6IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJQQVRDSFwiLCBcIkRFTEVURVwiLCBcIk9QVElPTlNcIl0sXHJcbiAgfSlcclxuKTtcclxuXHJcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xyXG5hcHAudXNlKGV4cHJlc3MudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XHJcblxyXG4vLyByb3V0ZXIgbWlkZGxld2FyZVxyXG5cclxuYXBwLnVzZShSZXF1ZXN0TG9nZ2VyKTtcclxuYXBwLnVzZShyb3V0ZXIpO1xyXG5cclxuYXBwLnVzZShnZW5lcmljRXJyb3JIYW5kbGVyKTtcclxuXHJcbi8vIE1vZGlmeSB0aGUgc2VydmVyIHN0YXJ0dXAgdG8gd2FpdCBmb3IgREIgY29ubmVjdGlvblxyXG4vLyBjb25zdCBzdGFydFNlcnZlciA9IGFzeW5jICgpID0+IHtcclxuLy8gICB0cnkge1xyXG4vLyAgICAgY29uc3QgYXBwID0gYXdhaXQgaW5pdGlhbGl6ZUFwcCgpO1xyXG4vLyAgICAgYXBwLmxpc3Rlbihjb25maWcucG9ydCwgKCkgPT4ge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhgYXBwIGlzIGxpc3RlbmluZyBvbiAke2NvbmZpZy5wb3J0fWApO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc3RhcnQgc2VydmVyOlwiLCBlcnJvcik7XHJcbi8vICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbi8vICAgfVxyXG4vLyB9O1xyXG5cclxuLy8gc3RhcnRTZXJ2ZXIoKTtcclxuIl19