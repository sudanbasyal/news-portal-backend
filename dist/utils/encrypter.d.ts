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
export declare const hashPassword: (password: string) => Promise<string>;
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
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
