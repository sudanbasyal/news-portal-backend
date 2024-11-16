import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";
import { snakeCase } from "typeorm/util/StringUtils";

/**
 * Custom naming strategy for TypeORM that converts table and column names to snake_case.
 *
 * This strategy ensures that all database tables and columns follow the snake_case naming convention,
 * which is common in SQL databases and improves consistency between code and database schemas.
 *
 * @class
 * @extends {DefaultNamingStrategy}
 * @implements {NamingStrategyInterface}
 *
 * @example
 * const connectionOptions = {
 *   namingStrategy: new SnakeNamingStrategy(),
 *   // other options
 * };
 */
export class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  /**
   * Generates a table name in snake_case format.
   *
   * @param {string} targetName - The name of the target entity.
   * @param {string | undefined} userSpecifiedName - A user-specified table name (optional).
   * @returns {string} - The snake_case formatted table name.
   *
   * @example
   * const tableName = strategy.tableName('User', undefined);
   * console.log(tableName); // Outputs: 'user'
   */
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  /**
   * Generates a column name in snake_case format, including any embedded prefixes.
   *
   * @param {string} propertyName - The name of the property.
   * @param {string | undefined} customName - A custom column name (optional).
   * @param {string[]} embeddedPrefixes - A list of embedded prefixes (optional).
   * @returns {string} - The snake_case formatted column name.
   *
   * @example
   * const columnName = strategy.columnName('firstName', undefined, []);
   * console.log(columnName); // Outputs: 'first_name'
   */
  columnName(
    propertyName: string,
    customName: string | undefined,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.join("_")) +
      (customName ? customName : snakeCase(propertyName))
    );
  }

  /**
   * Converts a relation name to snake_case format.
   *
   * @param {string} propertyName - The name of the relation property.
   * @returns {string} - The snake_case formatted relation name.
   *
   * @example
   * const relationName = strategy.relationName('userPosts');
   * console.log(relationName); // Outputs: 'user_posts'
   */
  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}
