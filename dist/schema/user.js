"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdSchema = exports.updateUserBodySchema = exports.createUserBodySchema = exports.getUserQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.getUserQuerySchema = joi_1.default.object({
    q: joi_1.default.string().optional(),
    page: joi_1.default.number()
        .min(1)
        .optional()
        .messages({
        "number.base": "Page must be a number",
        "number.min": "Page must be at least 1",
    })
        .default(1),
    size: joi_1.default.number()
        .min(1)
        .max(10)
        .optional()
        .messages({
        "number.base": "Size must be a number",
        "number.min": "Size must be at least 1",
        "number.max": "Size must be at most 10",
    })
        .default(10),
}).options({ stripUnknown: true });
exports.createUserBodySchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid format",
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "password.uppercase": "Password must have at least one uppercase character",
        "password.lowercase": "Password must have at least one lowercase character",
        "password.special": "Password must have at least one special character",
    })
        .custom((value, helpers) => {
        if (!/[A-Z]/.test(value)) {
            return helpers.error("password.uppercase");
        }
        if (!/[a-z]/.test(value)) {
            return helpers.error("password.lowercase");
        }
        if (!/[!@#$%]/.test(value)) {
            return helpers.error("password.special");
        }
        return value;
    }),
    name: joi_1.default.string().required().messages({
        "any.required": "Name is required",
    }),
    role: joi_1.default.string().required().messages({
        "any.required": "Role is required",
    }),
}).options({
    stripUnknown: true,
});
exports.updateUserBodySchema = joi_1.default.object({
    name: joi_1.default.string().optional().messages({
        "any.required": "Name is required",
    }),
    email: joi_1.default.string().email().optional().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid format",
    }),
    password: joi_1.default.string()
        .optional()
        .min(8)
        .messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "password.uppercase": "Password must have at least one uppercase character",
        "password.lowercase": "Password must have at least one lowercase character",
        "password.special": "Password must have at least one special character",
    })
        .custom((value, helpers) => {
        if (!/[A-Z]/.test(value)) {
            return helpers.error("password.uppercase");
        }
        if (!/[a-z]/.test(value)) {
            return helpers.error("password.lowercase");
        }
        if (!/[!@#$%]/.test(value)) {
            return helpers.error("password.special");
        }
        return value;
    }),
    address: joi_1.default.string().optional().messages({
        "any.required": "Address is required",
        "string.base": "Address must be a string",
    }),
    phoneNumber: joi_1.default.string().optional().messages({
        "any.required": "Phone number is required",
        "string.base": "Phone number must be a string",
    }),
}).options({
    stripUnknown: true,
});
exports.userIdSchema = joi_1.default.object({
    id: joi_1.default.number().required().messages({
        "number.base": "Id must be a number",
        "any.required": "Id is required",
    }),
}).options({ stripUnknown: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4Q0FBc0I7QUFFVCxRQUFBLGtCQUFrQixHQUFHLGFBQUcsQ0FBQyxNQUFNLENBQUM7SUFDM0MsQ0FBQyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDMUIsSUFBSSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDZixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDO1FBQ1IsYUFBYSxFQUFFLHVCQUF1QjtRQUN0QyxZQUFZLEVBQUUseUJBQXlCO0tBQ3hDLENBQUM7U0FDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRWIsSUFBSSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDZixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ04sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNQLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQztRQUNSLGFBQWEsRUFBRSx1QkFBdUI7UUFDdEMsWUFBWSxFQUFFLHlCQUF5QjtRQUN2QyxZQUFZLEVBQUUseUJBQXlCO0tBQ3hDLENBQUM7U0FDRCxPQUFPLENBQUMsRUFBRSxDQUFDO0NBQ2YsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXRCLFFBQUEsb0JBQW9CLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQztJQUM3QyxLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM5QyxjQUFjLEVBQUUsbUJBQW1CO1FBQ25DLGNBQWMsRUFBRSw4QkFBOEI7S0FDL0MsQ0FBQztJQUVGLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO1NBQ25CLFFBQVEsRUFBRTtTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixRQUFRLENBQUM7UUFDUixjQUFjLEVBQUUsc0JBQXNCO1FBQ3RDLFlBQVksRUFBRSx3Q0FBd0M7UUFDdEQsb0JBQW9CLEVBQ2xCLHFEQUFxRDtRQUN2RCxvQkFBb0IsRUFDbEIscURBQXFEO1FBQ3ZELGtCQUFrQixFQUFFLG1EQUFtRDtLQUN4RSxDQUFDO1NBQ0QsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUosSUFBSSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDckMsY0FBYyxFQUFFLGtCQUFrQjtLQUNuQyxDQUFDO0lBQ0YsSUFBSSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDckMsY0FBYyxFQUFFLGtCQUFrQjtLQUNuQyxDQUFDO0NBQ0gsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNULFlBQVksRUFBRSxJQUFJO0NBQ25CLENBQUMsQ0FBQztBQUVVLFFBQUEsb0JBQW9CLEdBQUcsYUFBRyxDQUFDLE1BQU0sQ0FBQztJQUM3QyxJQUFJLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNyQyxjQUFjLEVBQUUsa0JBQWtCO0tBQ25DLENBQUM7SUFFRixLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM5QyxjQUFjLEVBQUUsbUJBQW1CO1FBQ25DLGNBQWMsRUFBRSw4QkFBOEI7S0FDL0MsQ0FBQztJQUVGLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFO1NBQ25CLFFBQVEsRUFBRTtTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDTixRQUFRLENBQUM7UUFDUixjQUFjLEVBQUUsc0JBQXNCO1FBQ3RDLFlBQVksRUFBRSx3Q0FBd0M7UUFDdEQsb0JBQW9CLEVBQ2xCLHFEQUFxRDtRQUN2RCxvQkFBb0IsRUFDbEIscURBQXFEO1FBQ3ZELGtCQUFrQixFQUFFLG1EQUFtRDtLQUN4RSxDQUFDO1NBQ0QsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDekIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUosT0FBTyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDeEMsY0FBYyxFQUFFLHFCQUFxQjtRQUNyQyxhQUFhLEVBQUUsMEJBQTBCO0tBQzFDLENBQUM7SUFFRixXQUFXLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxjQUFjLEVBQUUsMEJBQTBCO1FBQzFDLGFBQWEsRUFBRSwrQkFBK0I7S0FDL0MsQ0FBQztDQUNILENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDVCxZQUFZLEVBQUUsSUFBSTtDQUNuQixDQUFDLENBQUM7QUFFVSxRQUFBLFlBQVksR0FBRyxhQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3JDLEVBQUUsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ25DLGFBQWEsRUFBRSxxQkFBcUI7UUFDcEMsY0FBYyxFQUFFLGdCQUFnQjtLQUNqQyxDQUFDO0NBQ0gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpvaSBmcm9tIFwiam9pXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlclF1ZXJ5U2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgcTogSm9pLnN0cmluZygpLm9wdGlvbmFsKCksXHJcbiAgcGFnZTogSm9pLm51bWJlcigpXHJcbiAgICAubWluKDEpXHJcbiAgICAub3B0aW9uYWwoKVxyXG4gICAgLm1lc3NhZ2VzKHtcclxuICAgICAgXCJudW1iZXIuYmFzZVwiOiBcIlBhZ2UgbXVzdCBiZSBhIG51bWJlclwiLFxyXG4gICAgICBcIm51bWJlci5taW5cIjogXCJQYWdlIG11c3QgYmUgYXQgbGVhc3QgMVwiLFxyXG4gICAgfSlcclxuICAgIC5kZWZhdWx0KDEpLFxyXG5cclxuICBzaXplOiBKb2kubnVtYmVyKClcclxuICAgIC5taW4oMSlcclxuICAgIC5tYXgoMTApXHJcbiAgICAub3B0aW9uYWwoKVxyXG4gICAgLm1lc3NhZ2VzKHtcclxuICAgICAgXCJudW1iZXIuYmFzZVwiOiBcIlNpemUgbXVzdCBiZSBhIG51bWJlclwiLFxyXG4gICAgICBcIm51bWJlci5taW5cIjogXCJTaXplIG11c3QgYmUgYXQgbGVhc3QgMVwiLFxyXG4gICAgICBcIm51bWJlci5tYXhcIjogXCJTaXplIG11c3QgYmUgYXQgbW9zdCAxMFwiLFxyXG4gICAgfSlcclxuICAgIC5kZWZhdWx0KDEwKSxcclxufSkub3B0aW9ucyh7IHN0cmlwVW5rbm93bjogdHJ1ZSB9KTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVVc2VyQm9keVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIGVtYWlsOiBKb2kuc3RyaW5nKCkuZW1haWwoKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgIFwiYW55LnJlcXVpcmVkXCI6IFwiRW1haWwgaXMgcmVxdWlyZWRcIixcclxuICAgIFwic3RyaW5nLmVtYWlsXCI6IFwiRW1haWwgbXVzdCBiZSBhIHZhbGlkIGZvcm1hdFwiLFxyXG4gIH0pLFxyXG5cclxuICBwYXNzd29yZDogSm9pLnN0cmluZygpXHJcbiAgICAucmVxdWlyZWQoKVxyXG4gICAgLm1pbig4KVxyXG4gICAgLm1lc3NhZ2VzKHtcclxuICAgICAgXCJhbnkucmVxdWlyZWRcIjogXCJQYXNzd29yZCBpcyByZXF1aXJlZFwiLFxyXG4gICAgICBcInN0cmluZy5taW5cIjogXCJQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVyc1wiLFxyXG4gICAgICBcInBhc3N3b3JkLnVwcGVyY2FzZVwiOlxyXG4gICAgICAgIFwiUGFzc3dvcmQgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSB1cHBlcmNhc2UgY2hhcmFjdGVyXCIsXHJcbiAgICAgIFwicGFzc3dvcmQubG93ZXJjYXNlXCI6XHJcbiAgICAgICAgXCJQYXNzd29yZCBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGxvd2VyY2FzZSBjaGFyYWN0ZXJcIixcclxuICAgICAgXCJwYXNzd29yZC5zcGVjaWFsXCI6IFwiUGFzc3dvcmQgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBzcGVjaWFsIGNoYXJhY3RlclwiLFxyXG4gICAgfSlcclxuICAgIC5jdXN0b20oKHZhbHVlLCBoZWxwZXJzKSA9PiB7XHJcbiAgICAgIGlmICghL1tBLVpdLy50ZXN0KHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiBoZWxwZXJzLmVycm9yKFwicGFzc3dvcmQudXBwZXJjYXNlXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIS9bYS16XS8udGVzdCh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gaGVscGVycy5lcnJvcihcInBhc3N3b3JkLmxvd2VyY2FzZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEvWyFAIyQlXS8udGVzdCh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gaGVscGVycy5lcnJvcihcInBhc3N3b3JkLnNwZWNpYWxcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0pLFxyXG5cclxuICBuYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICBcImFueS5yZXF1aXJlZFwiOiBcIk5hbWUgaXMgcmVxdWlyZWRcIixcclxuICB9KSxcclxuICByb2xlOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICBcImFueS5yZXF1aXJlZFwiOiBcIlJvbGUgaXMgcmVxdWlyZWRcIixcclxuICB9KSxcclxufSkub3B0aW9ucyh7XHJcbiAgc3RyaXBVbmtub3duOiB0cnVlLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVVc2VyQm9keVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIG5hbWU6IEpvaS5zdHJpbmcoKS5vcHRpb25hbCgpLm1lc3NhZ2VzKHtcclxuICAgIFwiYW55LnJlcXVpcmVkXCI6IFwiTmFtZSBpcyByZXF1aXJlZFwiLFxyXG4gIH0pLFxyXG5cclxuICBlbWFpbDogSm9pLnN0cmluZygpLmVtYWlsKCkub3B0aW9uYWwoKS5tZXNzYWdlcyh7XHJcbiAgICBcImFueS5yZXF1aXJlZFwiOiBcIkVtYWlsIGlzIHJlcXVpcmVkXCIsXHJcbiAgICBcInN0cmluZy5lbWFpbFwiOiBcIkVtYWlsIG11c3QgYmUgYSB2YWxpZCBmb3JtYXRcIixcclxuICB9KSxcclxuXHJcbiAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKVxyXG4gICAgLm9wdGlvbmFsKClcclxuICAgIC5taW4oOClcclxuICAgIC5tZXNzYWdlcyh7XHJcbiAgICAgIFwiYW55LnJlcXVpcmVkXCI6IFwiUGFzc3dvcmQgaXMgcmVxdWlyZWRcIixcclxuICAgICAgXCJzdHJpbmcubWluXCI6IFwiUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcIixcclxuICAgICAgXCJwYXNzd29yZC51cHBlcmNhc2VcIjpcclxuICAgICAgICBcIlBhc3N3b3JkIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgdXBwZXJjYXNlIGNoYXJhY3RlclwiLFxyXG4gICAgICBcInBhc3N3b3JkLmxvd2VyY2FzZVwiOlxyXG4gICAgICAgIFwiUGFzc3dvcmQgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBsb3dlcmNhc2UgY2hhcmFjdGVyXCIsXHJcbiAgICAgIFwicGFzc3dvcmQuc3BlY2lhbFwiOiBcIlBhc3N3b3JkIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIixcclxuICAgIH0pXHJcbiAgICAuY3VzdG9tKCh2YWx1ZSwgaGVscGVycykgPT4ge1xyXG4gICAgICBpZiAoIS9bQS1aXS8udGVzdCh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gaGVscGVycy5lcnJvcihcInBhc3N3b3JkLnVwcGVyY2FzZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEvW2Etel0vLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGhlbHBlcnMuZXJyb3IoXCJwYXNzd29yZC5sb3dlcmNhc2VcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghL1shQCMkJV0vLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGhlbHBlcnMuZXJyb3IoXCJwYXNzd29yZC5zcGVjaWFsXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9KSxcclxuXHJcbiAgYWRkcmVzczogSm9pLnN0cmluZygpLm9wdGlvbmFsKCkubWVzc2FnZXMoe1xyXG4gICAgXCJhbnkucmVxdWlyZWRcIjogXCJBZGRyZXNzIGlzIHJlcXVpcmVkXCIsXHJcbiAgICBcInN0cmluZy5iYXNlXCI6IFwiQWRkcmVzcyBtdXN0IGJlIGEgc3RyaW5nXCIsXHJcbiAgfSksXHJcblxyXG4gIHBob25lTnVtYmVyOiBKb2kuc3RyaW5nKCkub3B0aW9uYWwoKS5tZXNzYWdlcyh7XHJcbiAgICBcImFueS5yZXF1aXJlZFwiOiBcIlBob25lIG51bWJlciBpcyByZXF1aXJlZFwiLFxyXG4gICAgXCJzdHJpbmcuYmFzZVwiOiBcIlBob25lIG51bWJlciBtdXN0IGJlIGEgc3RyaW5nXCIsXHJcbiAgfSksXHJcbn0pLm9wdGlvbnMoe1xyXG4gIHN0cmlwVW5rbm93bjogdHJ1ZSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlcklkU2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgaWQ6IEpvaS5udW1iZXIoKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgIFwibnVtYmVyLmJhc2VcIjogXCJJZCBtdXN0IGJlIGEgbnVtYmVyXCIsXHJcbiAgICBcImFueS5yZXF1aXJlZFwiOiBcIklkIGlzIHJlcXVpcmVkXCIsXHJcbiAgfSksXHJcbn0pLm9wdGlvbnMoeyBzdHJpcFVua25vd246IHRydWUgfSk7XHJcbiJdfQ==