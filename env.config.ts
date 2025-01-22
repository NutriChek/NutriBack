import { config } from 'dotenv';

config();

export default process.env as {
  DB_URL: string;

  JWT_SECRET: string;

  GEMINI_API_KEY: string;
  GEMINI_MODEL: string;
};
