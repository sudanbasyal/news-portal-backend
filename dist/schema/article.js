"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeArticleStatusSchema = exports.updateArticleSchema = exports.addArticleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// export interface Article {
//     title: string;
//     image: string;
//     content: string;
//     viewCount: number;
//     slug: string;
//     status: "draft" | "published" | "archived";
//     isBreaking: boolean;
//   }
// create article schema
exports.addArticleSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    slug: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    isBreaking: joi_1.default.boolean().required(),
});
// update article schema
exports.updateArticleSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    isBreaking: joi_1.default.boolean().required(),
    slug: joi_1.default.string().required(),
});
exports.changeArticleStatusSchema = joi_1.default.object({
    status: joi_1.default.string().valid("draft", "published", "archived").required(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvYXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIsNkJBQTZCO0FBQzdCLHFCQUFxQjtBQUNyQixxQkFBcUI7QUFDckIsdUJBQXVCO0FBQ3ZCLHlCQUF5QjtBQUN6QixvQkFBb0I7QUFDcEIsa0RBQWtEO0FBQ2xELDJCQUEyQjtBQUMzQixNQUFNO0FBRU4sd0JBQXdCO0FBQ1gsUUFBQSxnQkFBZ0IsR0FBRyxhQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3pDLEtBQUssRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzlCLE9BQU8sRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2hDLElBQUksRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdCLE1BQU0sRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQy9CLFVBQVUsRUFBRSxhQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQ3JDLENBQUMsQ0FBQztBQUVILHdCQUF3QjtBQUNYLFFBQUEsbUJBQW1CLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQztJQUM1QyxLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUM5QixPQUFPLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNoQyxNQUFNLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvQixVQUFVLEVBQUUsYUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwQyxJQUFJLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUM5QixDQUFDLENBQUM7QUFFVSxRQUFBLHlCQUF5QixHQUFHLGFBQUcsQ0FBQyxNQUFNLENBQUM7SUFDbEQsTUFBTSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDeEUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpvaSBmcm9tIFwiam9pXCI7XHJcblxyXG4vLyBleHBvcnQgaW50ZXJmYWNlIEFydGljbGUge1xyXG4vLyAgICAgdGl0bGU6IHN0cmluZztcclxuLy8gICAgIGltYWdlOiBzdHJpbmc7XHJcbi8vICAgICBjb250ZW50OiBzdHJpbmc7XHJcbi8vICAgICB2aWV3Q291bnQ6IG51bWJlcjtcclxuLy8gICAgIHNsdWc6IHN0cmluZztcclxuLy8gICAgIHN0YXR1czogXCJkcmFmdFwiIHwgXCJwdWJsaXNoZWRcIiB8IFwiYXJjaGl2ZWRcIjtcclxuLy8gICAgIGlzQnJlYWtpbmc6IGJvb2xlYW47XHJcbi8vICAgfVxyXG5cclxuLy8gY3JlYXRlIGFydGljbGUgc2NoZW1hXHJcbmV4cG9ydCBjb25zdCBhZGRBcnRpY2xlU2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgdGl0bGU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG4gIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG4gIHNsdWc6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG4gIHN0YXR1czogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXHJcbiAgaXNCcmVha2luZzogSm9pLmJvb2xlYW4oKS5yZXF1aXJlZCgpLFxyXG59KTtcclxuXHJcbi8vIHVwZGF0ZSBhcnRpY2xlIHNjaGVtYVxyXG5leHBvcnQgY29uc3QgdXBkYXRlQXJ0aWNsZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIHRpdGxlOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICBjb250ZW50OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICBzdGF0dXM6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG4gIGlzQnJlYWtpbmc6IEpvaS5ib29sZWFuKCkucmVxdWlyZWQoKSxcclxuICBzbHVnOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgY2hhbmdlQXJ0aWNsZVN0YXR1c1NjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIHN0YXR1czogSm9pLnN0cmluZygpLnZhbGlkKFwiZHJhZnRcIiwgXCJwdWJsaXNoZWRcIiwgXCJhcmNoaXZlZFwiKS5yZXF1aXJlZCgpLFxyXG59KTtcclxuIl19