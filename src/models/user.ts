import { DataTypes, Model } from "sequelize"
import Sequelize from "sequelize"
import sequelize from "./database"
import { string } from "zod"
import { getToken, verifiyToken } from "../utils/jwt"
import {
  getSalt,
  hashSeasonPassword,
  compareHashes,
} from "../utils/password-hasher"

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: false,
  }
)
;(async () => await User.sync({ alter: true }))()

abstract class UserModel {
  static createUser = async (userData: any) => {
    const { username, fullname, password, email, birthdate, nationality } =
      userData
    const salt = getSalt()
    const hashedSeasonPassword = hashSeasonPassword(password, salt)
    try {
      const newUser = await User.create({
        username,
        fullname,
        hashedSeasonPassword,
        email,
        birthdate,
        nationality,
      })
      console.log("User created successfully:", newUser.toJSON())
    } catch (error) {
      console.error("Error creating user:", error)
    } finally {
      sequelize.close()
    }
  }
  static getUserInfo = async (userId: string) => {
    try {
      const userFound = await User.findByPk(userId)

      if (userFound) {
        return { userInfo: userFound.toJSON() }
      } else {
        throw new Error("User not found")
      }
    } catch (error) {
      throw error
    }
  }
  //  static async login(userCredentials: any) {
  //     //falta terminar
  //     try {
  //       const { email, password } = userCredentials

  //       const user = await User.findOne({
  //         where: {
  //           email: email,
  //         },
  //       })

  // if (!user) {
  //   throw new Error("User not found")
  // }

  //   const hashedPassword = await User.findOne({where: {
  //     password: password,
  //   },})

  //   const passwordMatch = compareHashes( hashedPassword , password);

  //   if (passwordMatch) {
  //     return {
  //      message: '¡Usuario autenticado correctamente!',
  //      userInfo: user.toJSON(),
  //   };
  //  }

  //  return { error: 'Credenciales incorrectas' };
  //  } catch (error) {
  //   throw error;
  // }
}

export default UserModel
