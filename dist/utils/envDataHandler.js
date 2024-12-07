"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEnv = requireEnv;
/**
 * Retrieves the value of the specified environment variable.
 * Throws an error if the environment variable is not defined.
 *
 * @param {string} name - The name of the environment variable to retrieve.
 * @returns {string} - The value of the environment variable.
 * @throws {Error} - If the environment variable is not defined.
 *
 * @example
 * const dbHost = requireEnv('DB_HOST');
 * console.log(dbHost); // Logs the value of DB_HOST environment variable
 */
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52RGF0YUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZW52RGF0YUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQSxnQ0FNQztBQWxCRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxJQUFZO0lBQ3JDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxjQUFjLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFJldHJpZXZlcyB0aGUgdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBlbnZpcm9ubWVudCB2YXJpYWJsZS5cclxuICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3QgZGVmaW5lZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgdG8gcmV0cmlldmUuXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIHZhbHVlIG9mIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZS5cclxuICogQHRocm93cyB7RXJyb3J9IC0gSWYgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlIGlzIG5vdCBkZWZpbmVkLlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCBkYkhvc3QgPSByZXF1aXJlRW52KCdEQl9IT1NUJyk7XHJcbiAqIGNvbnNvbGUubG9nKGRiSG9zdCk7IC8vIExvZ3MgdGhlIHZhbHVlIG9mIERCX0hPU1QgZW52aXJvbm1lbnQgdmFyaWFibGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlRW52KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgY29uc3QgdmFsdWUgPSBwcm9jZXNzLmVudltuYW1lXTtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVudmlyb25tZW50IHZhcmlhYmxlICR7bmFtZX0gaXMgcmVxdWlyZWRgKTtcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiJdfQ==