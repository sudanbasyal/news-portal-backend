import winston from "winston";
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
declare const loggerWithNameSpace: (namespace: string) => winston.Logger;
export default loggerWithNameSpace;
