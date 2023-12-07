import dotenv from "dotenv"
dotenv.config()
import "./index"

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS as string)

export { CREDENTIALS }
