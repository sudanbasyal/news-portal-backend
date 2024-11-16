import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  try {
    // Number of salt rounds
    const saltRounds = 10;

    // Generate hash
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hash:", hash);
  } catch (err) {
    console.error("Error hashing password:", err);
  }
};

// Convert 123456 to bcrypt hash
