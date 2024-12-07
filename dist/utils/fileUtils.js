"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Use Node.js's built-in __dirname directly (CommonJS global)
const baseDir = path_1.default.join(__dirname, "../../public");
/**
 * Deletes one or more files from the uploads directory.
 * @param files - Single filename or array of filenames to delete.
 * @returns Promise<void>
 */
const deleteFiles = async (files) => {
    try {
        // Convert single filename to an array if necessary
        const fileArray = Array.isArray(files) ? files : [files];
        const deletePromises = fileArray.map(async (file) => {
            // Skip if file is empty or null
            if (!file) {
                console.log("Empty filename provided, skipping");
                return;
            }
            // Remove any leading slashes from the filename
            const cleanFileName = file.replace(/^\/+/, "");
            const filePath = path_1.default.join(baseDir, cleanFileName);
            console.log(`Checking existence of: ${filePath}`);
            try {
                await promises_1.default.access(filePath);
                console.log(`Deleting file: ${filePath}`);
                await promises_1.default.unlink(filePath);
            }
            catch (error) {
                console.log(`File not found, skipping: ${filePath}`);
            }
        });
        await Promise.all(deletePromises);
        console.log("Files deletion process completed");
    }
    catch (err) {
        console.error("Error deleting files:", err);
        throw err; // Re-throw the error for handling by the caller
    }
};
exports.deleteFiles = deleteFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2ZpbGVVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyREFBNkI7QUFDN0IsZ0RBQXdCO0FBRXhCLDhEQUE4RDtBQUM5RCxNQUFNLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUVyRDs7OztHQUlHO0FBQ0ksTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLEtBQXdCLEVBQWlCLEVBQUU7SUFDM0UsSUFBSSxDQUFDO1FBQ0gsbURBQW1EO1FBQ25ELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6RCxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNsRCxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztnQkFDakQsT0FBTztZQUNULENBQUM7WUFFRCwrQ0FBK0M7WUFDL0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDL0MsTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUVsRCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxrQkFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxrQkFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxDQUFDLENBQUMsZ0RBQWdEO0lBQzdELENBQUM7QUFDSCxDQUFDLENBQUM7QUFqQ1csUUFBQSxXQUFXLGVBaUN0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tIFwiZnMvcHJvbWlzZXNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIFVzZSBOb2RlLmpzJ3MgYnVpbHQtaW4gX19kaXJuYW1lIGRpcmVjdGx5IChDb21tb25KUyBnbG9iYWwpXHJcbmNvbnN0IGJhc2VEaXIgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL3B1YmxpY1wiKTtcclxuXHJcbi8qKlxyXG4gKiBEZWxldGVzIG9uZSBvciBtb3JlIGZpbGVzIGZyb20gdGhlIHVwbG9hZHMgZGlyZWN0b3J5LlxyXG4gKiBAcGFyYW0gZmlsZXMgLSBTaW5nbGUgZmlsZW5hbWUgb3IgYXJyYXkgb2YgZmlsZW5hbWVzIHRvIGRlbGV0ZS5cclxuICogQHJldHVybnMgUHJvbWlzZTx2b2lkPlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUZpbGVzID0gYXN5bmMgKGZpbGVzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBDb252ZXJ0IHNpbmdsZSBmaWxlbmFtZSB0byBhbiBhcnJheSBpZiBuZWNlc3NhcnlcclxuICAgIGNvbnN0IGZpbGVBcnJheSA9IEFycmF5LmlzQXJyYXkoZmlsZXMpID8gZmlsZXMgOiBbZmlsZXNdO1xyXG5cclxuICAgIGNvbnN0IGRlbGV0ZVByb21pc2VzID0gZmlsZUFycmF5Lm1hcChhc3luYyAoZmlsZSkgPT4ge1xyXG4gICAgICAvLyBTa2lwIGlmIGZpbGUgaXMgZW1wdHkgb3IgbnVsbFxyXG4gICAgICBpZiAoIWZpbGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVtcHR5IGZpbGVuYW1lIHByb3ZpZGVkLCBza2lwcGluZ1wiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbW92ZSBhbnkgbGVhZGluZyBzbGFzaGVzIGZyb20gdGhlIGZpbGVuYW1lXHJcbiAgICAgIGNvbnN0IGNsZWFuRmlsZU5hbWUgPSBmaWxlLnJlcGxhY2UoL15cXC8rLywgXCJcIik7XHJcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VEaXIsIGNsZWFuRmlsZU5hbWUpO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coYENoZWNraW5nIGV4aXN0ZW5jZSBvZjogJHtmaWxlUGF0aH1gKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgZnMuYWNjZXNzKGZpbGVQYXRoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRpbmcgZmlsZTogJHtmaWxlUGF0aH1gKTtcclxuICAgICAgICBhd2FpdCBmcy51bmxpbmsoZmlsZVBhdGgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBGaWxlIG5vdCBmb3VuZCwgc2tpcHBpbmc6ICR7ZmlsZVBhdGh9YCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGF3YWl0IFByb21pc2UuYWxsKGRlbGV0ZVByb21pc2VzKTtcclxuICAgIGNvbnNvbGUubG9nKFwiRmlsZXMgZGVsZXRpb24gcHJvY2VzcyBjb21wbGV0ZWRcIik7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgZmlsZXM6XCIsIGVycik7XHJcbiAgICB0aHJvdyBlcnI7IC8vIFJlLXRocm93IHRoZSBlcnJvciBmb3IgaGFuZGxpbmcgYnkgdGhlIGNhbGxlclxyXG4gIH1cclxufTtcclxuIl19