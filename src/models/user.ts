import { string } from "zod"
import { getToken, verifiyToken } from "../utils/jwt"
import {
  getSalt,
  hashSeasonPassword,
  compareHashes,
} from "../utils/password-hasher"
import { Pool } from "pg"

const pool = new Pool({
  user: "avnadmin",
  host: "pg-2ba55a45-ada-proyecto-final-2023.a.aivencloud.com",
  database: "defaultdb",
  password: "AVNS_cn0yb7JegG5yP03Gh2k",
  port: 16946,
})

abstract class UserModel {
  static async createUser(userData: any) {
    const { id, username, fullname, password, email, birthdate, nationality } =
      userData

    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      // Verificar si el usuario ya existe
      const existingUserQuery = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      )

      if (existingUserQuery.rows.length > 0) {
        return { error: "User with this email already exists" }
      }

      // Verificar la complejidad de la contraseña
      if (!this.isPasswordValid(password)) {
        return {
          error:
            "Password must be at least 8 characters long and include numbers, uppercase letters, lowercase letters, and special characters",
        }
      }

      // Hash de la contraseña
      const hashedPassword = hashSeasonPassword(password, salt)

      // Insertar nuevo usuario en la tabla 'users'
      const newUserQuery = await client.query(
        "INSERT INTO users (id, username, fullname, password, email, birthdate, nationality) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [id, username, fullname, hashedPassword, email, birthdate, nationality]
      )

      const userId = newUserQuery.rows[0].id

      await client.query("COMMIT")

      return {
        message: `User ${fullname} created successfully`,
        id: userId,
      }
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }
  static async updateInfo(userId: string, newData: any) {
    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      const updateQuery = await client.query(
        "UPDATE users SET fullname = $1, email = $2 WHERE id = $3",
        [newData.fullname, newData.email, userId]
      )

      await client.query("COMMIT")

      return {
        message: `User information updated successfully`,
      }
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }

  static async deleteUser(userId: string) {
    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      // Eliminar información de autenticación
      await client.query("DELETE FROM auths WHERE user_id = $1", [userId])

      // Eliminar información del usuario
      await client.query("DELETE FROM users WHERE id = $1", [userId])

      await client.query("COMMIT")

      return {
        message: `User deleted successfully`,
      }
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }
  static async login(userCredentials: any) {
    const { email, password } = userCredentials

    const client = await pool.connect()

    try {
      const userQuery = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      )

      if (userQuery.rows.length === 0) {
        return { error: "User not found" }
      }

      const userId = userQuery.rows[0].id

      const authQuery = await client.query(
        "SELECT password FROM auths WHERE user_id = $1",
        [userId]
      )

      if (authQuery.rows.length === 0) {
        return { error: "User authentication information not found" }
      }

      const [salt, dbHashedPassword] = authQuery.rows[0].password.split(":")

      const hashedPassword = compareHashes(password, salt)

      if (hashedPassword === dbHashedPassword) {
        const token = getToken({ email, userId })

        return {
          message: "User logged successfully!",
          token,
        }
      }

      return { error: "Wrong credentials" }
    } finally {
      client.release()
    }
  }
  private static isPasswordValid(password: string): boolean {
    // Validar complejidad de la contraseña (ejemplo)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
    return passwordRegex.test(password)
  }
}

export default UserModel
