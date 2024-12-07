"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
/**
 * Hashes a plain-text password using bcrypt with a predefined number of salt rounds.
 *
 * @param {string} password - The plain-text password to hash.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 * @throws {Error} - If there is an issue generating the hash.
 *
 * @example
 * const hashedPassword = await hashPassword('myPassword');
 * console.log(hashedPassword); // Logs the hashed password
 */
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
/**
 * Compares a plain-text password with a hashed password to verify if they match.
 *
 * @param {string} password - The plain-text password provided by the user.
 * @param {string} hash - The hashed password stored in the database.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, `false` otherwise.
 * @throws {Error} - If there is an issue during the comparison process.
 *
 * @example
 * const isMatch = await comparePassword('myPassword', hashedPassword);
 * console.log(isMatch); // Logs true if the password matches, false otherwise
 */
const comparePassword = async (password, hash) => {
    return bcryptjs_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2VuY3J5cHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBRXRCOzs7Ozs7Ozs7O0dBVUc7QUFDSSxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsUUFBZ0IsRUFBbUIsRUFBRTtJQUN0RSxNQUFNLElBQUksR0FBRyxNQUFNLGtCQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sSUFBSSxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBSlcsUUFBQSxZQUFZLGdCQUl2QjtBQUVGOzs7Ozs7Ozs7OztHQVdHO0FBQ0ksTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUNsQyxRQUFnQixFQUNoQixJQUFZLEVBQ00sRUFBRTtJQUNwQixPQUFPLGtCQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFMVyxRQUFBLGVBQWUsbUJBSzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJjcnlwdGpzIGZyb20gXCJiY3J5cHRqc1wiO1xyXG5cclxuY29uc3Qgc2FsdFJvdW5kcyA9IDEwO1xyXG5cclxuLyoqXHJcbiAqIEhhc2hlcyBhIHBsYWluLXRleHQgcGFzc3dvcmQgdXNpbmcgYmNyeXB0IHdpdGggYSBwcmVkZWZpbmVkIG51bWJlciBvZiBzYWx0IHJvdW5kcy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIC0gVGhlIHBsYWluLXRleHQgcGFzc3dvcmQgdG8gaGFzaC5cclxuICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgaGFzaGVkIHBhc3N3b3JkLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gLSBJZiB0aGVyZSBpcyBhbiBpc3N1ZSBnZW5lcmF0aW5nIHRoZSBoYXNoLlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2hQYXNzd29yZCgnbXlQYXNzd29yZCcpO1xyXG4gKiBjb25zb2xlLmxvZyhoYXNoZWRQYXNzd29yZCk7IC8vIExvZ3MgdGhlIGhhc2hlZCBwYXNzd29yZFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IGFzeW5jIChwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICBjb25zdCBzYWx0ID0gYXdhaXQgYmNyeXB0anMuZ2VuU2FsdChzYWx0Um91bmRzKTtcclxuICBjb25zdCBoYXNoID0gYXdhaXQgYmNyeXB0anMuaGFzaChwYXNzd29yZCwgc2FsdCk7XHJcbiAgcmV0dXJuIGhhc2g7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcGFyZXMgYSBwbGFpbi10ZXh0IHBhc3N3b3JkIHdpdGggYSBoYXNoZWQgcGFzc3dvcmQgdG8gdmVyaWZ5IGlmIHRoZXkgbWF0Y2guXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCAtIFRoZSBwbGFpbi10ZXh0IHBhc3N3b3JkIHByb3ZpZGVkIGJ5IHRoZSB1c2VyLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaGFzaCAtIFRoZSBoYXNoZWQgcGFzc3dvcmQgc3RvcmVkIGluIHRoZSBkYXRhYmFzZS5cclxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYHRydWVgIGlmIHRoZSBwYXNzd29yZHMgbWF0Y2gsIGBmYWxzZWAgb3RoZXJ3aXNlLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gLSBJZiB0aGVyZSBpcyBhbiBpc3N1ZSBkdXJpbmcgdGhlIGNvbXBhcmlzb24gcHJvY2Vzcy5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogY29uc3QgaXNNYXRjaCA9IGF3YWl0IGNvbXBhcmVQYXNzd29yZCgnbXlQYXNzd29yZCcsIGhhc2hlZFBhc3N3b3JkKTtcclxuICogY29uc29sZS5sb2coaXNNYXRjaCk7IC8vIExvZ3MgdHJ1ZSBpZiB0aGUgcGFzc3dvcmQgbWF0Y2hlcywgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29tcGFyZVBhc3N3b3JkID0gYXN5bmMgKFxyXG4gIHBhc3N3b3JkOiBzdHJpbmcsXHJcbiAgaGFzaDogc3RyaW5nLFxyXG4pOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcclxuICByZXR1cm4gYmNyeXB0anMuY29tcGFyZShwYXNzd29yZCwgaGFzaCk7XHJcbn07XHJcbiJdfQ==