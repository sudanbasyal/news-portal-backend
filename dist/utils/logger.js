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
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importStar(require("winston"));
const logFormat = winston_1.format.printf((info) => {
    const formattedNamespace = info.metadata.namespace || "";
    return `${info.metadata.timestamp} [${info.level}] [${formattedNamespace}]: ${info.message}`;
});
/**
 * Creates a Winston logger instance with custom formatting.
 * The logger includes timestamps, log levels, and optional namespace metadata for enhanced log readability.
 *
 * @constant
 * @type {winston.Logger}
 *
 * @example
 * logger.info('This is an info message');
 * logger.error('This is an error message');
 */
const logger = winston_1.default.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.metadata(), logFormat),
    transports: [new winston_1.default.transports.Console()],
});
/**
 * Returns a logger instance with a specific namespace.
 * The namespace is included in every log entry for better traceability.
 *
 * @param {string} namespace - A string representing the namespace for the logger.
 * @returns {winston.Logger} - A Winston logger instance scoped to the specified namespace.
 *
 * @example
 * const userLogger = loggerWithNameSpace('userService');
 * userLogger.info('User created successfully');
 */
const loggerWithNameSpace = function (namespace) {
    return logger.child({ namespace });
};
exports.default = loggerWithNameSpace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTBDO0FBRTFDLE1BQU0sU0FBUyxHQUFHLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDdkMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7SUFDekQsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxLQUFLLE1BQU0sa0JBQWtCLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQy9GLENBQUMsQ0FBQyxDQUFDO0FBRUg7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDO0lBQ2xDLE1BQU0sRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FDcEIsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxFQUNuRCxnQkFBTSxDQUFDLFFBQVEsRUFBRSxFQUNqQixTQUFTLENBQ1Y7SUFDRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLGlCQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0NBQy9DLENBQUMsQ0FBQztBQUVIOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLG1CQUFtQixHQUFHLFVBQVUsU0FBaUI7SUFDckQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFRixrQkFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3aW5zdG9uLCB7IGZvcm1hdCB9IGZyb20gXCJ3aW5zdG9uXCI7XHJcblxyXG5jb25zdCBsb2dGb3JtYXQgPSBmb3JtYXQucHJpbnRmKChpbmZvKSA9PiB7XHJcbiAgY29uc3QgZm9ybWF0dGVkTmFtZXNwYWNlID0gaW5mby5tZXRhZGF0YS5uYW1lc3BhY2UgfHwgXCJcIjtcclxuICByZXR1cm4gYCR7aW5mby5tZXRhZGF0YS50aW1lc3RhbXB9IFske2luZm8ubGV2ZWx9XSBbJHtmb3JtYXR0ZWROYW1lc3BhY2V9XTogJHtpbmZvLm1lc3NhZ2V9YDtcclxufSk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIFdpbnN0b24gbG9nZ2VyIGluc3RhbmNlIHdpdGggY3VzdG9tIGZvcm1hdHRpbmcuXHJcbiAqIFRoZSBsb2dnZXIgaW5jbHVkZXMgdGltZXN0YW1wcywgbG9nIGxldmVscywgYW5kIG9wdGlvbmFsIG5hbWVzcGFjZSBtZXRhZGF0YSBmb3IgZW5oYW5jZWQgbG9nIHJlYWRhYmlsaXR5LlxyXG4gKlxyXG4gKiBAY29uc3RhbnRcclxuICogQHR5cGUge3dpbnN0b24uTG9nZ2VyfVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBsb2dnZXIuaW5mbygnVGhpcyBpcyBhbiBpbmZvIG1lc3NhZ2UnKTtcclxuICogbG9nZ2VyLmVycm9yKCdUaGlzIGlzIGFuIGVycm9yIG1lc3NhZ2UnKTtcclxuICovXHJcbmNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcclxuICBmb3JtYXQ6IGZvcm1hdC5jb21iaW5lKFxyXG4gICAgZm9ybWF0LnRpbWVzdGFtcCh7IGZvcm1hdDogXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIgfSksXHJcbiAgICBmb3JtYXQubWV0YWRhdGEoKSxcclxuICAgIGxvZ0Zvcm1hdCxcclxuICApLFxyXG4gIHRyYW5zcG9ydHM6IFtuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKV0sXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBsb2dnZXIgaW5zdGFuY2Ugd2l0aCBhIHNwZWNpZmljIG5hbWVzcGFjZS5cclxuICogVGhlIG5hbWVzcGFjZSBpcyBpbmNsdWRlZCBpbiBldmVyeSBsb2cgZW50cnkgZm9yIGJldHRlciB0cmFjZWFiaWxpdHkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG5hbWVzcGFjZSBmb3IgdGhlIGxvZ2dlci5cclxuICogQHJldHVybnMge3dpbnN0b24uTG9nZ2VyfSAtIEEgV2luc3RvbiBsb2dnZXIgaW5zdGFuY2Ugc2NvcGVkIHRvIHRoZSBzcGVjaWZpZWQgbmFtZXNwYWNlLlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCB1c2VyTG9nZ2VyID0gbG9nZ2VyV2l0aE5hbWVTcGFjZSgndXNlclNlcnZpY2UnKTtcclxuICogdXNlckxvZ2dlci5pbmZvKCdVc2VyIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAqL1xyXG5jb25zdCBsb2dnZXJXaXRoTmFtZVNwYWNlID0gZnVuY3Rpb24gKG5hbWVzcGFjZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIGxvZ2dlci5jaGlsZCh7IG5hbWVzcGFjZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcldpdGhOYW1lU3BhY2U7XHJcbiJdfQ==