import dotenv from "dotenv"
dotenv.config()
const PORT = Number(process.env.PORT) || 45009
const ENVIRONMENT = process.env.ENVIRONMENT
const PEPPER = process.env.PEPPER
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ""
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || ""
const HOST = process.env.HOST
const DATABASE = process.env.DATABASE
const USER = process.env.DB_USER
const PASSWORD = process.env.PASSWORD
const DB_PORT = process.env.DB_PORT
const DB_PATH = `postgres://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}`
export {
  PORT,
  ENVIRONMENT,
  PEPPER,
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  DB_PATH,
}
