import { Request, Response } from 'express';
import UserModel from '../models/user';

class UserController {
  static async createUser(req: any, res: any) {
    const { username, fullname, password, email, birthdate, nationality } = req.body;
    try {
      await UserModel.createUser({
        username,
        fullname,
        password,
        email,
        birthdate,
        nationality,
      });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  static async getUserInfo(req: any, res: any) {
    const userId = req.params.id;
    try {
      const userInfo = await UserModel.getUserInfo(userId);
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }

  static async loginUser(req: any, res: any) {
    const { email, password } = req.body;
    try {
      const loginResult = await UserModel.login({ email, password });
      if (loginResult.userInfo) {
        res.status(200).json(loginResult);
      } else {
        res.status(401).json({ error: 'Incorrect credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
}

export default UserController;
