import { Request, Response } from "express"
import User from "../models/user"

class UserController {
  static async createUser(req: Request, res: Response) {
    const { username, fullname, password, email, birthdate, nationality } =
      req.body
    try {
      const newUser = await User.create({
        username,
        fullname,
        password,
        email,
        birthdate,
        nationality,
      })
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({ error: "Error creating user" })
    }
  }

  static async getUserInfo(req: Request, res: Response) {
    const userId = req.params.id
    try {
      const userInfo = await User.findByPk(userId)
      res.status(200).json(userInfo)
    } catch (error) {
      res.status(404).json({ error: "User not found" })
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const users = await User.findAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(404).json({ error: "Users not found" })
    }
  }

  static async loginUser(req: any, res: any) {
    const { email, password } = req.body
    try {
      const loginResult = await User.login({ email, password })
      if (loginResult.userInfo) {
        res.status(200).json(loginResult)
      } else {
        res.status(401).json({ error: "Incorrect credentials" })
      }
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" })
    }
  }
}

export default UserController
