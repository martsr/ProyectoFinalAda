import { Request, Response } from "express";
import User from "../models/user";
import { validatePartialUser, validateUser } from "../schemas/user";
import logger from "../utils/logger";

class UserController {
  static async createUser(req: Request, res: Response) {
    const { username, fullname, password, email, nationality } = req.body;
    let { birthdate } = req.body;
    birthdate = new Date(birthdate);

    try {
      const validatedData = validateUser({
        username,
        fullname,
        password,
        email,
        birthdate,
        nationality,
      });

      if (!validatedData.success) {
        logger.error("The data entered is incorrect");
        return res.status(400).json({
          message:
            "Incorrect data entered. Please check again. Paswword hast to be at: -least 8 characters long,should include capital letters, numbers and special characters.",
        });
      }

      const response = await User.createUser(validatedData.data);
      logger.info("User succesfully created");
      return res.status(201).json(response);
    } catch (error) {
      logger.error("Error while creating user");
      return res.status(500).json({ message: "Error creating user" });
    }
  }

  static async getUserInfo(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await User.getUserInfo(email);
      res.status(200).json(user);
      logger.info("User found");
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { username, fullname, password, email, nationality } = req.body;
      let dataToValidate = req.body;
      let { birthdate } = req.body;
      if (birthdate) {
        birthdate = new Date(birthdate);
        dataToValidate = {
          username,
          fullname,
          password,
          email,
          birthdate,
          nationality,
        };
      }

      const validatedData = validatePartialUser(dataToValidate);
      if (!validatedData.success) {
        logger.error("Wrong credentials");
        return res.status(400).json({ message: "Wrong credentials" });
      }

      const result = await User.updateUser(validatedData.data);
      logger.info("User has been successfully updated");

      if (result == 400) {
        logger.error("Error updating user");
        return res.status(400).json({ message: "Error updating user" });
      }
      logger.info("User updated successfully");
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      logger.error("Error updating user");
      return res.status(500).json({ message: "Error updating user" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validatedData = validatePartialUser(req.body);
      if (!validatedData.success) {
        logger.error("Wrong credentials");
        return res.status(400).json({ message: "Wrong credentials" });
      }

      const { email, password } = validatedData.data as any;
      const user = await User.login({ email, password });
      if (user == 404) {
        logger.error("Wrong credentials");
        return res.status(500).json({ message: "Wrong credentials" });
      }

      const { accessToken, refreshToken } = user;
      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .set("Authorization", accessToken)
        .send({
          message: "User logged in successfully",
          accessToken: accessToken,
        });
      logger.info("User logged in successfully");
    } catch (error) {
      logger.error("Error in login process");
      return res.status(500).json({ message: "Error in login process" });
    }
  }

  static async logout(req: Request, res: Response) {
    const validatedData = validatePartialUser(req.body);
    if (!validatedData.success) {
      logger.error("Wrong credentials");
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const { email } = validatedData.data as any;

    const userLogOut = await User.logout(email);

    if (userLogOut == 200) {
      logger.info("Sucessful logout");
      return res.status(200).json({ message: "Sucessful logout" });
    }
    logger.error("Error at logout");
    return res.status(500).json({ message: "Error at logout" });
  }

  static async deleteUser(req: Request, res: Response) {
    const validatedData = validatePartialUser(req.body);
    if (!validatedData.success) {
      logger.error("Wrong credentials");
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const { email } = validatedData.data as any;
    const result = await User.deleteUser(email);
    if (result == 400) {
      logger.error("Error deleting user");
      return res.status(500).json({ message: "Error deleting user" });
    }
    logger.info("User successfully deleted");
    return res
      .status(200)
      .json({ message: "User successfully deleted", id: result });
  }
}

export default UserController;
