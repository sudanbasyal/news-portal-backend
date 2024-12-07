"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFormData = void 0;
exports.validateReqQuery = validateReqQuery;
exports.validateReqBody = validateReqBody;
exports.validateReqParams = validateReqParams;
const BadRequestError_1 = require("../error/BadRequestError");
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)("ValidatorMiddleware");
function validateReqQuery(schema) {
    return (req, res, next) => {
        logger.info("Validating query params");
        const { error, value } = schema.validate(req.query);
        if (error) {
            logger.error("Error validating query params", { error });
            console.log(error);
            next(new BadRequestError_1.BadRequestError(error.message));
        }
        req.query = value;
        next();
    };
}
function validateReqBody(schema) {
    return (req, res, next) => {
        logger.info("Validating request body");
        const { error, value } = schema.validate(req.body);
        if (error) {
            logger.error("Error validating request body", { error });
            next(new BadRequestError_1.BadRequestError(error.message));
        }
        req.body = value;
        next();
    };
}
function validateReqParams(schema) {
    logger.info("Validating request params");
    return (req, res, next) => {
        logger.info("Validating request params");
        const { error, value } = schema.validate(req.params);
        if (error) {
            logger.error("Error validating request params", { error });
            next(new BadRequestError_1.BadRequestError(error.message));
        }
        req.params = value;
        next();
    };
}
const validateFormData = (schema) => {
    logger.info("Validating form data");
    return (req, res, next) => {
        try {
            logger.info("Validating form data");
            const { error } = schema.validate(req.body);
            if (error) {
                throw new BadRequestError_1.BadRequestError(error.details[0].message);
            }
            next();
        }
        catch (error) {
            logger.error("Error validating form data", { error });
            next(error);
        }
    };
};
exports.validateFormData = validateFormData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmUvdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9BLDRDQWVDO0FBRUQsMENBY0M7QUFFRCw4Q0FhQztBQW5ERCw4REFBMkQ7QUFDM0QsNkRBQWtEO0FBRWxELE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQW1CLEVBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUxRCxTQUFnQixnQkFBZ0IsQ0FBQyxNQUFjO0lBQzdDLE9BQU8sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdkMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRCxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxpQ0FBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVsQixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFnQixlQUFlLENBQUMsTUFBYztJQUM1QyxPQUFPLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxJQUFJLGlDQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRWpCLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQWdCLGlCQUFpQixDQUFDLE1BQWM7SUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyRCxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLElBQUksaUNBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRU0sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFO0lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNwQyxPQUFPLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFDekQsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUNWLE1BQU0sSUFBSSxpQ0FBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUVELElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBakJXLFFBQUEsZ0JBQWdCLG9CQWlCM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcImpvaVwiO1xyXG5pbXBvcnQgeyBCYWRSZXF1ZXN0RXJyb3IgfSBmcm9tIFwiLi4vZXJyb3IvQmFkUmVxdWVzdEVycm9yXCI7XHJcbmltcG9ydCBsb2dnZXJXaXRoTmFtZVNwYWNlIGZyb20gXCIuLi91dGlscy9sb2dnZXJcIjtcclxuXHJcbmNvbnN0IGxvZ2dlciA9IGxvZ2dlcldpdGhOYW1lU3BhY2UoXCJWYWxpZGF0b3JNaWRkbGV3YXJlXCIpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUmVxUXVlcnkoc2NoZW1hOiBTY2hlbWEpIHtcclxuICByZXR1cm4gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBsb2dnZXIuaW5mbyhcIlZhbGlkYXRpbmcgcXVlcnkgcGFyYW1zXCIpO1xyXG4gICAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IHNjaGVtYS52YWxpZGF0ZShyZXEucXVlcnkpO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICBsb2dnZXIuZXJyb3IoXCJFcnJvciB2YWxpZGF0aW5nIHF1ZXJ5IHBhcmFtc1wiLCB7IGVycm9yIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIG5leHQobmV3IEJhZFJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxLnF1ZXJ5ID0gdmFsdWU7XHJcblxyXG4gICAgbmV4dCgpO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVJlcUJvZHkoc2NoZW1hOiBTY2hlbWEpIHtcclxuICByZXR1cm4gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBsb2dnZXIuaW5mbyhcIlZhbGlkYXRpbmcgcmVxdWVzdCBib2R5XCIpO1xyXG5cclxuICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUocmVxLmJvZHkpO1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIHZhbGlkYXRpbmcgcmVxdWVzdCBib2R5XCIsIHsgZXJyb3IgfSk7XHJcbiAgICAgIG5leHQobmV3IEJhZFJlcXVlc3RFcnJvcihlcnJvci5tZXNzYWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxLmJvZHkgPSB2YWx1ZTtcclxuXHJcbiAgICBuZXh0KCk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUmVxUGFyYW1zKHNjaGVtYTogU2NoZW1hKSB7XHJcbiAgbG9nZ2VyLmluZm8oXCJWYWxpZGF0aW5nIHJlcXVlc3QgcGFyYW1zXCIpO1xyXG4gIHJldHVybiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcclxuICAgIGxvZ2dlci5pbmZvKFwiVmFsaWRhdGluZyByZXF1ZXN0IHBhcmFtc1wiKTtcclxuICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUocmVxLnBhcmFtcyk7XHJcblxyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIGxvZ2dlci5lcnJvcihcIkVycm9yIHZhbGlkYXRpbmcgcmVxdWVzdCBwYXJhbXNcIiwgeyBlcnJvciB9KTtcclxuICAgICAgbmV4dChuZXcgQmFkUmVxdWVzdEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcclxuICAgIH1cclxuICAgIHJlcS5wYXJhbXMgPSB2YWx1ZTtcclxuICAgIG5leHQoKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVGb3JtRGF0YSA9IChzY2hlbWE6IFNjaGVtYSkgPT4ge1xyXG4gIGxvZ2dlci5pbmZvKFwiVmFsaWRhdGluZyBmb3JtIGRhdGFcIik7XHJcbiAgcmV0dXJuIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbG9nZ2VyLmluZm8oXCJWYWxpZGF0aW5nIGZvcm0gZGF0YVwiKTtcclxuICAgICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5KTtcclxuXHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIHRocm93IG5ldyBCYWRSZXF1ZXN0RXJyb3IoZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmV4dCgpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgbG9nZ2VyLmVycm9yKFwiRXJyb3IgdmFsaWRhdGluZyBmb3JtIGRhdGFcIiwgeyBlcnJvciB9KTtcclxuICAgICAgbmV4dChlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuIl19