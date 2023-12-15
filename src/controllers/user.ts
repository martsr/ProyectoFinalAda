import { Request, Response } from "express";
import User from "../models/user";
import Auth from "../models/auth";
import { validateUser, validatePartialUser } from "../schemas/user";
import { string } from "zod";
import {
  getSalt,
  hashSeasonPassword,
  compareHashes,
} from "../utils/password-hasher";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class UserController {
  private static async createPassword(password: string) {
    const salt = getSalt();
    const hashPassword = hashSeasonPassword(password, salt);
    const hashedPassword = `${salt}:${hashPassword}`;
    return hashedPassword;
  }

  static async createUser(req: Request, res: Response) {
    const { username, fullname, password, email, nationality } = req.body;
    let { birthdate } = req.body;
    birthdate = new Date(birthdate);

    try {
      const validatedUser = validateUser({
        username,
        fullname,
        password,
        email,
        nationality,
        birthdate,
      });
      if (!validatedUser.success)
        return res.status(400).json(validatedUser.error);

      const emailExist = await User.findOne({
        where: {
          email,
        },
      });

      if (emailExist) {
        return res
          .status(400)
          .json({ message: "The email already exists: " + email });
      }

      //const hashedPassword = await this.createPassword(password);

      const newUser = await User.create({
        username,
        fullname,
        password,
        //password: hashedPassword,
        email,
        birthdate,
        nationality,
      });

      const newAuth = await Auth.create({
        userId: newUser.id,
        password,
        // password: hashedPassword,
      });

      res.status(201).json(newUser.id);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  }

  static async getUserInfo(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const userInfo = await User.findByPk(userId);
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ error: "Users not found" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { username, fullname, password, email, nationality } = req.body;
      let { birthdate } = req.body;
      birthdate = new Date(birthdate);
      const validatedUser = validatePartialUser({
        username,
        fullname,
        password,
        email,
        nationality,
        birthdate,
      });
      if (!validatedUser.success)
        return res.status(400).json(validatedUser.error);
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.update({
        username,
        fullname,
        password,
        email,
        nationality,
        birthdate,
      });
      await user.save();
      if (password) {
        const auth = await Auth.findOne({ where: { userId: user.id } });
        if (auth) {
          await auth.update({ password });
          await auth.save();
        }
      }

      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      console.log("LOGIN");
      const { email, password } = req.body;
      const validatedUser = validatePartialUser(req.body);
      if (!validatedUser.success)
        return res.status(400).json(validatedUser.error);

      const user = await User.findOne({ where: { email } });
      //const hashedPassword = getSalt();
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const auth = await Auth.findOne({
        where: { userId: user.dataValues.id },
      });
      if (!auth) return res.status(401).json({ error: "Invalid credentials" });

      if (password != auth.dataValues.password)
        return res.status(401).json({ error: "Invalid credentials" });

      const accessToken = generateAccessToken(password);
      const refreshToken = generateRefreshToken(password);
      //Guardar en BD
      return res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await User.destroy({
        where: {
          id,
        },
      });
      await Auth.destroy({
        where: {
          userId: id,
        },
      });
      res.status(200).json({ message: "User deleted successfully", id: id });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
export default UserController;
