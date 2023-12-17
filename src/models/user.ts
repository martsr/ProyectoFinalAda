import { DataTypes, Model } from "./database";
const { STRING, DATEONLY, UUID } = DataTypes;
import Sequelize, { UnknownConstraintError } from "sequelize";
import sequelize from "./database";
import Auth from "../models/auth";
import {
  getSalt,
  hashSeasonPassword,
  compareHashes,
} from "../utils/password-hasher";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class User extends Model {
  static associate(models: any) {
    User.hasOne(models.Auth, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "auth",
    });
  }
  private static async createHashedSeasonPassword(password: string) {
    const salt = getSalt();
    const hashPassword = hashSeasonPassword(password, salt).toString("hex");
    const hashedPassword = `${salt}:${hashPassword}`;
    return hashedPassword;
  }

  static async createUser(userData: any) {
    const { username, fullname, password, email, birthdate, nationality } =
      userData;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      return { error: "User with the provided email already exists" };
    }

    const hashedPassword = await this.createHashedSeasonPassword(password);

    const newUser = await User.create({
      username,
      fullname,
      email,
      birthdate,
      nationality,
    });
    await Auth.createAuth({
      id: newUser.dataValues.id,
      password: hashedPassword,
    });

    return {
      message: `User ${fullname} created successfully`,
      id: newUser.dataValues.id,
    };
  }
  static async getUserInfo(email: string) {
    const userInfo = await User.findOne({ where: { email } });
    return { userInfo };
  }

  static async getAll() {
    const users = await User.findAll({ limit: 10 });
    return users;
  }
  static async updateUser(userData: any) {
    const { username, fullname, password, email, birthdate, nationality } =
      userData;

    const user = await User.findOne({ where: { email } });

    if (user) {
      const id = user.dataValues.id;
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
      return 200;
    }
    return 400;
  }
  static async login(userCredentials: any) {
    const { email, password } = userCredentials;

    const user = await User.findOne({ where: { email } });

    if (user) {
      const auth = await Auth.findOne({
        where: { userId: user.dataValues.id },
      });

      if (auth) {
        const [salt, dbHashedPassword] = await auth.dataValues.password.split(
          ":"
        );
        const hashedPassword = hashSeasonPassword(password, salt);
        const equalPasswords = compareHashes(dbHashedPassword, hashedPassword);

        if (equalPasswords) {
          const refreshToken = generateRefreshToken(user.dataValues.id);
          const accessToken = generateAccessToken(user.dataValues.id);

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
    return 404;
  }

  static async logout(email: string) {
    try {
      const user = await User.getUserInfo(email);
      const id = user.userInfo?.dataValues.id;
      await Auth.update({ refreshToken: null }, { where: { userId: id } });
      return 200;
    } catch (error) {
      return 500;
    }
  }

  static async deleteUser(email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) return 400;
    const id = user.dataValues.id;

    try {
      await User.destroy({
        where: {
          id,
        },
      });
      await Auth.destroy({ where: { userId: id } });
      return 200;
    } catch (error) {
      return 400;
    }
  }
}

User.init(
  {
    id: {
      type: UUID,
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
User.hasOne(Auth, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
Auth.belongsTo(User, {
  foreignKey: "userId",
});
// (async () => await User.drop())();
(async () => await User.sync({ alter: true }))();

export default User;
