// app.js
import postgres from "postgres"
import { DATABASE_URL } from "../../constants"

const sql = postgres(DATABASE_URL, { ssl: "require" })

async function getPostgresVersion() {
  const response = await sql`select version()`
  console.log(response)
}

getPostgresVersion()
