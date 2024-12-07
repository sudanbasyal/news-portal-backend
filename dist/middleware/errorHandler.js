"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = genericErrorHandler;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const UnauthenticatedError_1 = require("../error/UnauthenticatedError");
const BadRequestError_1 = require("../error/BadRequestError");
const ForbiddenError_1 = require("../error/ForbiddenError");
const ConflictError_1 = require("../error/ConflictError");
const NotFoundError_1 = require("../error/NotFoundError");
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("Errorhandler");
// Mapping error classes to HTTP status codes
const errorResponseMapping = {
    UnauthenticatedError: http_status_codes_1.default.UNAUTHORIZED,
    BadRequestError: http_status_codes_1.default.BAD_REQUEST,
    ForbiddenError: http_status_codes_1.default.FORBIDDEN,
    ConflictError: http_status_codes_1.default.CONFLICT,
    NotFoundError: http_status_codes_1.default.NOT_FOUND,
};
// Error class mapping
const errorClassMapping = {
    UnauthenticatedError: UnauthenticatedError_1.UnauthenticatedError,
    BadRequestError: BadRequestError_1.BadRequestError,
    ForbiddenError: ForbiddenError_1.ForbiddenError,
    ConflictError: ConflictError_1.ConflictError,
    NotFoundError: NotFoundError_1.NotFoundError,
};
// Generic error handler function
function genericErrorHandler(error, req, res, next) {
    if (error.stack) {
        logger.error(error.stack);
    }
    const errorType = Object.keys(errorClassMapping).find((type) => error instanceof
        errorClassMapping[type]);
    if (errorType) {
        return res.status(errorResponseMapping[errorType]).json({
            message: error.message,
        });
    }
    return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmUvZXJyb3JIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBOEJBLGtEQXlCQztBQXZERCwwRUFBZ0Q7QUFFaEQsd0VBQXFFO0FBQ3JFLDhEQUEyRDtBQUMzRCw0REFBeUQ7QUFDekQsMERBQXVEO0FBQ3ZELDBEQUF1RDtBQUN2RCw2REFBa0Q7QUFFbEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBbUIsRUFBQyxjQUFjLENBQUMsQ0FBQztBQUVuRCw2Q0FBNkM7QUFDN0MsTUFBTSxvQkFBb0IsR0FBMkI7SUFDbkQsb0JBQW9CLEVBQUUsMkJBQWUsQ0FBQyxZQUFZO0lBQ2xELGVBQWUsRUFBRSwyQkFBZSxDQUFDLFdBQVc7SUFDNUMsY0FBYyxFQUFFLDJCQUFlLENBQUMsU0FBUztJQUN6QyxhQUFhLEVBQUUsMkJBQWUsQ0FBQyxRQUFRO0lBQ3ZDLGFBQWEsRUFBRSwyQkFBZSxDQUFDLFNBQVM7Q0FDekMsQ0FBQztBQUVGLHNCQUFzQjtBQUN0QixNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLG9CQUFvQixFQUFwQiwyQ0FBb0I7SUFDcEIsZUFBZSxFQUFmLGlDQUFlO0lBQ2YsY0FBYyxFQUFkLCtCQUFjO0lBQ2QsYUFBYSxFQUFiLDZCQUFhO0lBQ2IsYUFBYSxFQUFiLDZCQUFhO0NBQ2QsQ0FBQztBQUVGLGlDQUFpQztBQUNqQyxTQUFnQixtQkFBbUIsQ0FDakMsS0FBWSxFQUNaLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0I7SUFFbEIsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQ25ELENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDUCxLQUFLO1FBQ0wsaUJBQWlCLENBQUMsSUFBc0MsQ0FBQyxDQUM1RCxDQUFDO0lBRUYsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0RCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVELE9BQU8sRUFBRSx1QkFBdUI7S0FDakMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwU3RhdHVzQ29kZXMgZnJvbSBcImh0dHAtc3RhdHVzLWNvZGVzXCI7XHJcbmltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBVbmF1dGhlbnRpY2F0ZWRFcnJvciB9IGZyb20gXCIuLi9lcnJvci9VbmF1dGhlbnRpY2F0ZWRFcnJvclwiO1xyXG5pbXBvcnQgeyBCYWRSZXF1ZXN0RXJyb3IgfSBmcm9tIFwiLi4vZXJyb3IvQmFkUmVxdWVzdEVycm9yXCI7XHJcbmltcG9ydCB7IEZvcmJpZGRlbkVycm9yIH0gZnJvbSBcIi4uL2Vycm9yL0ZvcmJpZGRlbkVycm9yXCI7XHJcbmltcG9ydCB7IENvbmZsaWN0RXJyb3IgfSBmcm9tIFwiLi4vZXJyb3IvQ29uZmxpY3RFcnJvclwiO1xyXG5pbXBvcnQgeyBOb3RGb3VuZEVycm9yIH0gZnJvbSBcIi4uL2Vycm9yL05vdEZvdW5kRXJyb3JcIjtcclxuaW1wb3J0IGxvZ2dlcldpdGhOYW1lU3BhY2UgZnJvbSBcIi4uL3V0aWxzL2xvZ2dlclwiO1xyXG5cclxuY29uc3QgbG9nZ2VyID0gbG9nZ2VyV2l0aE5hbWVTcGFjZShcIkVycm9yaGFuZGxlclwiKTtcclxuXHJcbi8vIE1hcHBpbmcgZXJyb3IgY2xhc3NlcyB0byBIVFRQIHN0YXR1cyBjb2Rlc1xyXG5jb25zdCBlcnJvclJlc3BvbnNlTWFwcGluZzogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICBVbmF1dGhlbnRpY2F0ZWRFcnJvcjogaHR0cFN0YXR1c0NvZGVzLlVOQVVUSE9SSVpFRCxcclxuICBCYWRSZXF1ZXN0RXJyb3I6IGh0dHBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVCxcclxuICBGb3JiaWRkZW5FcnJvcjogaHR0cFN0YXR1c0NvZGVzLkZPUkJJRERFTixcclxuICBDb25mbGljdEVycm9yOiBodHRwU3RhdHVzQ29kZXMuQ09ORkxJQ1QsXHJcbiAgTm90Rm91bmRFcnJvcjogaHR0cFN0YXR1c0NvZGVzLk5PVF9GT1VORCxcclxufTtcclxuXHJcbi8vIEVycm9yIGNsYXNzIG1hcHBpbmdcclxuY29uc3QgZXJyb3JDbGFzc01hcHBpbmcgPSB7XHJcbiAgVW5hdXRoZW50aWNhdGVkRXJyb3IsXHJcbiAgQmFkUmVxdWVzdEVycm9yLFxyXG4gIEZvcmJpZGRlbkVycm9yLFxyXG4gIENvbmZsaWN0RXJyb3IsXHJcbiAgTm90Rm91bmRFcnJvcixcclxufTtcclxuXHJcbi8vIEdlbmVyaWMgZXJyb3IgaGFuZGxlciBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJpY0Vycm9ySGFuZGxlcihcclxuICBlcnJvcjogRXJyb3IsXHJcbiAgcmVxOiBSZXF1ZXN0LFxyXG4gIHJlczogUmVzcG9uc2UsXHJcbiAgbmV4dDogTmV4dEZ1bmN0aW9uLFxyXG4pIHtcclxuICBpZiAoZXJyb3Iuc3RhY2spIHtcclxuICAgIGxvZ2dlci5lcnJvcihlcnJvci5zdGFjayk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBlcnJvclR5cGUgPSBPYmplY3Qua2V5cyhlcnJvckNsYXNzTWFwcGluZykuZmluZChcclxuICAgICh0eXBlKSA9PlxyXG4gICAgICBlcnJvciBpbnN0YW5jZW9mXHJcbiAgICAgIGVycm9yQ2xhc3NNYXBwaW5nW3R5cGUgYXMga2V5b2YgdHlwZW9mIGVycm9yQ2xhc3NNYXBwaW5nXSxcclxuICApO1xyXG5cclxuICBpZiAoZXJyb3JUeXBlKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyhlcnJvclJlc3BvbnNlTWFwcGluZ1tlcnJvclR5cGVdKS5qc29uKHtcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlcy5zdGF0dXMoaHR0cFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUikuanNvbih7XHJcbiAgICBtZXNzYWdlOiBcIkludGVybmFsIHNlcnZlciBlcnJvclwiLFxyXG4gIH0pO1xyXG59XHJcbiJdfQ==