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
export declare function requireEnv(name: string): string;
