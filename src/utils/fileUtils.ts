import fs from "fs/promises";
import path from "path";

// Use Node.js's built-in __dirname directly (CommonJS global)
const baseDir = path.join(__dirname, "../../public");

/**
 * Deletes one or more files from the uploads directory.
 * @param files - Single filename or array of filenames to delete.
 * @returns Promise<void>
 */
export const deleteFiles = async (files: string | string[]): Promise<void> => {
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
      const filePath = path.join(baseDir, cleanFileName);

      console.log(`Checking existence of: ${filePath}`);

      try {
        await fs.access(filePath);
        console.log(`Deleting file: ${filePath}`);
        await fs.unlink(filePath);
      } catch (error) {
        console.log(`File not found, skipping: ${filePath}`);
      }
    });

    await Promise.all(deletePromises);
    console.log("Files deletion process completed");
  } catch (err) {
    console.error("Error deleting files:", err);
    throw err; // Re-throw the error for handling by the caller
  }
};
