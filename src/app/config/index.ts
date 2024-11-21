import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  database: process.env.DATABASE_URL,
  bcryptSalt: process.env.BCRYPT_SALT,
  default_pass: process.env.DEFAULT_PASS,
  jwt_token: process.env.JWT_TOKEN,
};
