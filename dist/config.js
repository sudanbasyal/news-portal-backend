"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const envDataHandler_1 = require("./utils/envDataHandler");
dotenv_1.default.config({ path: __dirname + "/../.env" });
const config = {
  apiUrl: (0, envDataHandler_1.requireEnv)("API_URL"),
  port: (0, envDataHandler_1.requireEnv)("PORT"),
  jwt: {
    secret: (0, envDataHandler_1.requireEnv)("JWT_SECRET"),
    accessExpiration: parseInt(
      (0, envDataHandler_1.requireEnv)("ACCESS_TOKEN_EXPIRY")
    ),
    refreshTokenExpiration: parseInt(
      (0, envDataHandler_1.requireEnv)("REFRESH_TOKEN_EXPIRY")
    ),
  },
  database: {
    name: (0, envDataHandler_1.requireEnv)("DB_NAME"),
    type: "postgres",
    host: (0, envDataHandler_1.requireEnv)("DB_HOST"),
    port: parseInt((0, envDataHandler_1.requireEnv)("DB_PORT")),
    username: (0, envDataHandler_1.requireEnv)("DB_USERNAME"),
    password: (0, envDataHandler_1.requireEnv)("DB_PASSWORD"),
    database: (0, envDataHandler_1.requireEnv)("DB_DATABASE"),
    synchronize: false,
    logging: false,
    entities: [__dirname + "/entity/**/*.js"],
    migrations: [__dirname + "/migration/**/*.js"],
    subscribers: [__dirname + "/subscriber/**/*.js"],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    ssl: {
      rejectUnauthorized: false //comment ssl in cpanel
    },
  },
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE0QjtBQUU1Qix5RUFBZ0U7QUFDaEUsMkRBQW9EO0FBR3BELGdCQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBRWhELE1BQU0sTUFBTSxHQUFZO0lBQ3RCLE1BQU0sRUFBRSxJQUFBLDJCQUFVLEVBQUMsU0FBUyxDQUFDO0lBQzdCLElBQUksRUFBRSxJQUFBLDJCQUFVLEVBQUMsTUFBTSxDQUFDO0lBQ3hCLEdBQUcsRUFBRTtRQUNILE1BQU0sRUFBRSxJQUFBLDJCQUFVLEVBQUMsWUFBWSxDQUFDO1FBQ2hDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxJQUFBLDJCQUFVLEVBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM3RCxzQkFBc0IsRUFBRSxRQUFRLENBQUMsSUFBQSwyQkFBVSxFQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDckU7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsSUFBQSwyQkFBVSxFQUFDLFNBQVMsQ0FBQztRQUMzQixJQUFJLEVBQUUsVUFBVTtRQUNoQixJQUFJLEVBQUUsSUFBQSwyQkFBVSxFQUFDLFNBQVMsQ0FBQztRQUMzQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUEsMkJBQVUsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxRQUFRLEVBQUUsSUFBQSwyQkFBVSxFQUFDLGFBQWEsQ0FBQztRQUNuQyxRQUFRLEVBQUUsSUFBQSwyQkFBVSxFQUFDLGFBQWEsQ0FBQztRQUNuQyxRQUFRLEVBQUUsSUFBQSwyQkFBVSxFQUFDLGFBQWEsQ0FBQztRQUNuQyxXQUFXLEVBQUUsS0FBSztRQUNsQixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1FBQ2hDLFVBQVUsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ3JDLFdBQVcsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1FBQ3ZDLGNBQWMsRUFBRSxJQUFJLCtDQUFtQixFQUFFO1FBQ3pDLFNBQVM7UUFDVCw4QkFBOEI7UUFDOUIsS0FBSztLQUNOO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiO1xyXG5cclxuaW1wb3J0IHsgU25ha2VOYW1pbmdTdHJhdGVneSB9IGZyb20gXCJ0eXBlb3JtLW5hbWluZy1zdHJhdGVnaWVzXCI7XHJcbmltcG9ydCB7IHJlcXVpcmVFbnYgfSBmcm9tIFwiLi91dGlscy9lbnZEYXRhSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBJQ29uZmlnIH0gZnJvbSBcIi4vaW50ZXJmYWNlL2NvbmZpZ3VyYXRpb25cIjtcclxuXHJcbmRvdGVudi5jb25maWcoeyBwYXRoOiBfX2Rpcm5hbWUgKyBcIi8uLi8uZW52XCIgfSk7XHJcblxyXG5jb25zdCBjb25maWc6IElDb25maWcgPSB7XHJcbiAgYXBpVXJsOiByZXF1aXJlRW52KFwiQVBJX1VSTFwiKSxcclxuICBwb3J0OiByZXF1aXJlRW52KFwiUE9SVFwiKSxcclxuICBqd3Q6IHtcclxuICAgIHNlY3JldDogcmVxdWlyZUVudihcIkpXVF9TRUNSRVRcIiksXHJcbiAgICBhY2Nlc3NFeHBpcmF0aW9uOiBwYXJzZUludChyZXF1aXJlRW52KFwiQUNDRVNTX1RPS0VOX0VYUElSWVwiKSksXHJcbiAgICByZWZyZXNoVG9rZW5FeHBpcmF0aW9uOiBwYXJzZUludChyZXF1aXJlRW52KFwiUkVGUkVTSF9UT0tFTl9FWFBJUllcIikpLFxyXG4gIH0sXHJcbiAgZGF0YWJhc2U6IHtcclxuICAgIG5hbWU6IHJlcXVpcmVFbnYoXCJEQl9OQU1FXCIpLFxyXG4gICAgdHlwZTogXCJwb3N0Z3Jlc1wiLFxyXG4gICAgaG9zdDogcmVxdWlyZUVudihcIkRCX0hPU1RcIiksXHJcbiAgICBwb3J0OiBwYXJzZUludChyZXF1aXJlRW52KFwiREJfUE9SVFwiKSksXHJcbiAgICB1c2VybmFtZTogcmVxdWlyZUVudihcIkRCX1VTRVJOQU1FXCIpLFxyXG4gICAgcGFzc3dvcmQ6IHJlcXVpcmVFbnYoXCJEQl9QQVNTV09SRFwiKSxcclxuICAgIGRhdGFiYXNlOiByZXF1aXJlRW52KFwiREJfREFUQUJBU0VcIiksXHJcbiAgICBzeW5jaHJvbml6ZTogZmFsc2UsXHJcbiAgICBsb2dnaW5nOiBmYWxzZSxcclxuICAgIGVudGl0aWVzOiBbXCJzcmMvZW50aXR5LyoqLyoudHNcIl0sXHJcbiAgICBtaWdyYXRpb25zOiBbXCJzcmMvbWlncmF0aW9uLyoqLyoudHNcIl0sXHJcbiAgICBzdWJzY3JpYmVyczogW1wic3JjL3N1YnNjcmliZXIvKiovKi50c1wiXSxcclxuICAgIG5hbWluZ1N0cmF0ZWd5OiBuZXcgU25ha2VOYW1pbmdTdHJhdGVneSgpLFxyXG4gICAgLy8gc3NsOiB7XHJcbiAgICAvLyAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2VcclxuICAgIC8vIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuIl19
