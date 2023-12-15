import { DataTypes, Model } from "./database";
const { STRING, DATEONLY } = DataTypes;
import Sequelize from "sequelize";
import sequelize from "./database";
import Auth from "../models/auth";
import {
  getSalt,
  hashSeasonPassword,
  compareHashes,
} from "../utils/password-hasher";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class UserModel extends Model {
  private static async createHashedSeasonPassword(password: string) {
    const salt = getSalt();
    const hashPassword = hashSeasonPassword(password, salt);
    const hashedPassword = `${salt}:${hashPassword}`;
    return hashedPassword;
  }

  static async createUser(userData: any) {
    const { username, fullname, password, email, nationality } = userData;

    let { birthdate } = userData;
    birthdate = new Date(birthdate);

    await UserModel.findOne({
      where: {
        email,
      },
    });

    const hashedPassword = this.createHashedSeasonPassword(password);

    const newUser = await UserModel.create({
      username,
      fullname,
      email,
      birthdate,
      nationality,
    });
    await Auth.create({
      userId: newUser.dataValues.id,
      password: hashedPassword,
    });
    return {
      message: `User ${fullname} created successfully`,
      id: newUser.dataValues.id,
    };
  }
  static async getUserInfo(userId: string) {
    const userInfo = await UserModel.findByPk(userId);
    return { userInfo };
  }

  static async getAll() {
    const users = await UserModel.findAll({ limit: 10 });
    return users;
  }
  static async updateUser(userData: any) {
    const { id, username, fullname, password, email, nationality } = userData;
    let { birthdate } = userData;
    birthdate = new Date(birthdate);

    const user = await UserModel.findByPk(id);
    if (user) {
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
        const auth = await Auth.findOne({
          where: { userId: id },
        });
        if (auth) {
          await auth.update({ password });
          await auth.save();
        }
      }
    }
    return { message: "User succesfully updated" };
  }
  static async login(userCredentials: any) {
    const { email, password } = userCredentials;
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      const auth = await Auth.findOne({
        where: { userId: user.dataValues.id },
      });
      if (auth) {
        const [salt, dbHashedPassword] = auth.dataValues.password.split(":");
        const hashedPassword = hashSeasonPassword(password, salt);
        const equalPasswords = compareHashes(dbHashedPassword, hashedPassword);

        if (equalPasswords) {
          const accessToken = generateAccessToken(password);
          const refreshToken = generateRefreshToken(password);

          await auth.update({ accessToken, refreshToken });
          await auth.save();
          return {
            message: "User logged successfully!",
            accessToken,
            refreshToken,
          };
        }
      }
    }
    return { error: "Wrong credentials" };
  }

  static async deleteUser(userId: string) {
    await UserModel.destroy({
      where: {
        userId,
      },
    });
    await Auth.destroy({
      where: {
        userId: userId,
      },
    });
    return { message: "User successfully deleted", id: userId };
  }
}

UserModel.init(
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    fullname: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    birthdate: {
      type: DATEONLY,
      allowNull: false,
    },
    nationality: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: false,
  }
);

(async () => await UserModel.sync({ alter: true }))();
//;(async () => await User.drop())()
export default UserModel;
