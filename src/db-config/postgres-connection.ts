import postgres from "postgres";

export const sql = postgres(process.env.DATABASE_URL as string, {
  ssl: { rejectUnauthorized: false },
});

export const testConnection = async () => {
  try {
    const result = await sql`SELECT * FROM users LIMIT 2`;
    console.log("database connected successfully");
    return "database connected successfully";
  } catch (error) {
    console.error("database connection failed", error);
    return error;
  }
};

