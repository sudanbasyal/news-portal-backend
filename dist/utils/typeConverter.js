"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeNamingStrategy = void 0;
const typeorm_1 = require("typeorm");
const StringUtils_1 = require("typeorm/util/StringUtils");
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
class SnakeNamingStrategy extends typeorm_1.DefaultNamingStrategy {
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
    tableName(targetName, userSpecifiedName) {
        return userSpecifiedName ? userSpecifiedName : (0, StringUtils_1.snakeCase)(targetName);
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
    columnName(propertyName, customName, embeddedPrefixes) {
        return ((0, StringUtils_1.snakeCase)(embeddedPrefixes.join("_")) +
            (customName ? customName : (0, StringUtils_1.snakeCase)(propertyName)));
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
    relationName(propertyName) {
        return (0, StringUtils_1.snakeCase)(propertyName);
    }
}
exports.SnakeNamingStrategy = SnakeNamingStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90eXBlQ29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUF5RTtBQUN6RSwwREFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBYSxtQkFDWCxTQUFRLCtCQUFxQjtJQUc3Qjs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUyxDQUFDLFVBQWtCLEVBQUUsaUJBQXFDO1FBQ2pFLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFBLHVCQUFTLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsVUFBVSxDQUNSLFlBQW9CLEVBQ3BCLFVBQThCLEVBQzlCLGdCQUEwQjtRQUUxQixPQUFPLENBQ0wsSUFBQSx1QkFBUyxFQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFBLHVCQUFTLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FDcEQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLENBQUMsWUFBb0I7UUFDL0IsT0FBTyxJQUFBLHVCQUFTLEVBQUMsWUFBWSxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBdkRELGtEQXVEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZmF1bHROYW1pbmdTdHJhdGVneSwgTmFtaW5nU3RyYXRlZ3lJbnRlcmZhY2UgfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBzbmFrZUNhc2UgfSBmcm9tIFwidHlwZW9ybS91dGlsL1N0cmluZ1V0aWxzXCI7XHJcblxyXG4vKipcclxuICogQ3VzdG9tIG5hbWluZyBzdHJhdGVneSBmb3IgVHlwZU9STSB0aGF0IGNvbnZlcnRzIHRhYmxlIGFuZCBjb2x1bW4gbmFtZXMgdG8gc25ha2VfY2FzZS5cclxuICpcclxuICogVGhpcyBzdHJhdGVneSBlbnN1cmVzIHRoYXQgYWxsIGRhdGFiYXNlIHRhYmxlcyBhbmQgY29sdW1ucyBmb2xsb3cgdGhlIHNuYWtlX2Nhc2UgbmFtaW5nIGNvbnZlbnRpb24sXHJcbiAqIHdoaWNoIGlzIGNvbW1vbiBpbiBTUUwgZGF0YWJhc2VzIGFuZCBpbXByb3ZlcyBjb25zaXN0ZW5jeSBiZXR3ZWVuIGNvZGUgYW5kIGRhdGFiYXNlIHNjaGVtYXMuXHJcbiAqXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXh0ZW5kcyB7RGVmYXVsdE5hbWluZ1N0cmF0ZWd5fVxyXG4gKiBAaW1wbGVtZW50cyB7TmFtaW5nU3RyYXRlZ3lJbnRlcmZhY2V9XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIGNvbnN0IGNvbm5lY3Rpb25PcHRpb25zID0ge1xyXG4gKiAgIG5hbWluZ1N0cmF0ZWd5OiBuZXcgU25ha2VOYW1pbmdTdHJhdGVneSgpLFxyXG4gKiAgIC8vIG90aGVyIG9wdGlvbnNcclxuICogfTtcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTbmFrZU5hbWluZ1N0cmF0ZWd5XHJcbiAgZXh0ZW5kcyBEZWZhdWx0TmFtaW5nU3RyYXRlZ3lcclxuICBpbXBsZW1lbnRzIE5hbWluZ1N0cmF0ZWd5SW50ZXJmYWNlXHJcbntcclxuICAvKipcclxuICAgKiBHZW5lcmF0ZXMgYSB0YWJsZSBuYW1lIGluIHNuYWtlX2Nhc2UgZm9ybWF0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IGVudGl0eS5cclxuICAgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZH0gdXNlclNwZWNpZmllZE5hbWUgLSBBIHVzZXItc3BlY2lmaWVkIHRhYmxlIG5hbWUgKG9wdGlvbmFsKS5cclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBzbmFrZV9jYXNlIGZvcm1hdHRlZCB0YWJsZSBuYW1lLlxyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBjb25zdCB0YWJsZU5hbWUgPSBzdHJhdGVneS50YWJsZU5hbWUoJ1VzZXInLCB1bmRlZmluZWQpO1xyXG4gICAqIGNvbnNvbGUubG9nKHRhYmxlTmFtZSk7IC8vIE91dHB1dHM6ICd1c2VyJ1xyXG4gICAqL1xyXG4gIHRhYmxlTmFtZSh0YXJnZXROYW1lOiBzdHJpbmcsIHVzZXJTcGVjaWZpZWROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHVzZXJTcGVjaWZpZWROYW1lID8gdXNlclNwZWNpZmllZE5hbWUgOiBzbmFrZUNhc2UodGFyZ2V0TmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmF0ZXMgYSBjb2x1bW4gbmFtZSBpbiBzbmFrZV9jYXNlIGZvcm1hdCwgaW5jbHVkaW5nIGFueSBlbWJlZGRlZCBwcmVmaXhlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkuXHJcbiAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IGN1c3RvbU5hbWUgLSBBIGN1c3RvbSBjb2x1bW4gbmFtZSAob3B0aW9uYWwpLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGVtYmVkZGVkUHJlZml4ZXMgLSBBIGxpc3Qgb2YgZW1iZWRkZWQgcHJlZml4ZXMgKG9wdGlvbmFsKS5cclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBzbmFrZV9jYXNlIGZvcm1hdHRlZCBjb2x1bW4gbmFtZS5cclxuICAgKlxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogY29uc3QgY29sdW1uTmFtZSA9IHN0cmF0ZWd5LmNvbHVtbk5hbWUoJ2ZpcnN0TmFtZScsIHVuZGVmaW5lZCwgW10pO1xyXG4gICAqIGNvbnNvbGUubG9nKGNvbHVtbk5hbWUpOyAvLyBPdXRwdXRzOiAnZmlyc3RfbmFtZSdcclxuICAgKi9cclxuICBjb2x1bW5OYW1lKFxyXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmcsXHJcbiAgICBjdXN0b21OYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgICBlbWJlZGRlZFByZWZpeGVzOiBzdHJpbmdbXSxcclxuICApOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgc25ha2VDYXNlKGVtYmVkZGVkUHJlZml4ZXMuam9pbihcIl9cIikpICtcclxuICAgICAgKGN1c3RvbU5hbWUgPyBjdXN0b21OYW1lIDogc25ha2VDYXNlKHByb3BlcnR5TmFtZSkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVydHMgYSByZWxhdGlvbiBuYW1lIHRvIHNuYWtlX2Nhc2UgZm9ybWF0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByZWxhdGlvbiBwcm9wZXJ0eS5cclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBzbmFrZV9jYXNlIGZvcm1hdHRlZCByZWxhdGlvbiBuYW1lLlxyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBjb25zdCByZWxhdGlvbk5hbWUgPSBzdHJhdGVneS5yZWxhdGlvbk5hbWUoJ3VzZXJQb3N0cycpO1xyXG4gICAqIGNvbnNvbGUubG9nKHJlbGF0aW9uTmFtZSk7IC8vIE91dHB1dHM6ICd1c2VyX3Bvc3RzJ1xyXG4gICAqL1xyXG4gIHJlbGF0aW9uTmFtZShwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gc25ha2VDYXNlKHByb3BlcnR5TmFtZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==