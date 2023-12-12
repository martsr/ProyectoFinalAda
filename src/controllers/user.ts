import { Request, Response } from "express"
import User from "../models/user"
import { validateUser, validatePartialUser } from "../schemas/user"

class UserController {
  static async createUser(req: Request, res: Response) {
    const { username, fullname, password, email, birthdate, nationality } =
      req.body
    try {
      const emailExist = await User.findOne({
        where: {
          email,
        },
      })
      if (emailExist) {
        return res
          .status(400)
          .json({ message: "The email already exist" + email })
      }
      const newUser = await User.create({
        username,
        fullname,
        password,
        email,
        birthdate,
        nationality,
      })
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(500).json({ error: "Error creating user" })
    }
  }

  static async getUserInfo(req: Request, res: Response) {
    const { id } = req.params
    try {
      const userInfo = await User.findByPk(id)
      if (!userInfo) {
        return res.status(200).json(userInfo)
      }
    } catch (error) {
      return res.status(404).json({ error: "User not found" })
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

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { body } = req

      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      await user.update({ body })
      await user.save()

      res.json(user)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validatedUser = validatePartialUser(req.body)
      if (!validatedUser.success)
        return res.status(400).json(validatedUser.error)

      const { email, password } = validatedUser.data as any
      const loginUser = await User.findOne({ where: { email } })
      if (loginUser) {
        res.status(200).json(loginUser)
        return res.json(loginUser)
      }
    } catch (error) {
      res.status(500).json({ error: "Wrong credentials" })
    }
  }

  // static async logout(req: Request, res: Response) {
  // }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params
      await User.destroy({
        where: {
          id,
        },
      })
      return res.sendStatus(204)
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}
export default UserController
