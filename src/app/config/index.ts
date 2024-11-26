import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  database: process.env.DATABASE_URL,
  bcryptSalt: process.env.BCRYPT_SALT,
  default_pass: process.env.DEFAULT_PASS,
  jwt_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRES_IN,
};
