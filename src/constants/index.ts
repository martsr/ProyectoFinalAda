import dotenv from "dotenv";
dotenv.config();
const PORT = Number(process.env.PORT) || 45009;
const ENVIRONMENT = process.env.ENVIRONMENT;
const PEPPER = process.env.PEPPER;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS as string);
export { PORT, ENVIRONMENT, PEPPER, JWT_SECRET_KEY, CREDENTIALS };
