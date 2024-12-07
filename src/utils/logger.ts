import winston, { format } from "winston";

const logFormat = format.printf((info) => {
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
const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata(),
    logFormat,
  ),
  transports: [new winston.transports.Console()],
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
const loggerWithNameSpace = function (namespace: string) {
  return logger.child({ namespace });
};

export default loggerWithNameSpace;
