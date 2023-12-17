import { DataTypes, Model } from "./database"
const { STRING, DATEONLY, UUID } = DataTypes
import Sequelize from "sequelize"
import sequelize from "./database"
import Auth from "../models/auth"
import {
  getSalt,
  hashSeasonPassword,
  compareHashes,
} from "../utils/password-hasher"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt"

class User extends Model {
  static associate(models: any) {
    User.hasOne(models.Auth, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "auth",
    })
  }
  private static async createHashedSeasonPassword(password: string) {
    const salt = getSalt()
    const hashPassword = hashSeasonPassword(password, salt).toString("hex")
    const hashedPassword = `${salt}:${hashPassword}`
    return hashedPassword
  }

  static async createUser(userData: any) {
    const { username, fullname, password, email, birthdate, nationality } =
      userData

    const existingUser = await User.findOne({
      where: {
        email,
      },
    })
    if (existingUser) {
      return { error: "User with the provided email already exists" }
    }

    const hashedPassword = await this.createHashedSeasonPassword(password)

    const newUser = await User.create({
      username,
      fullname,
      email,
      birthdate,
      nationality,
    })
    await Auth.createAuth({
      id: newUser.dataValues.id,
      password: hashedPassword,
    })

    return {
      message: `User ${fullname} created successfully`,
      id: newUser.dataValues.id,
    }
  }
  static async getUserInfo(userId: string) {
    const userInfo = await User.findByPk(userId)
    return { userInfo }
  }

  static async getAll() {
    const users = await User.findAll({ limit: 10 })
    return users
  }
  static async updateUser(userData: any) {
    const { id, username, fullname, password, email, nationality } = userData
    let { birthdate } = userData
    birthdate = new Date(birthdate)

    const user = await User.findByPk(id)
    if (user) {
      await user.update({
        username,
        fullname,
        password,
        email,
        nationality,
        birthdate,
      })
      await user.save()
      if (password) {
        const auth = await Auth.findOne({
          where: { userId: id },
        })
        if (auth) {
          await auth.update({ password })
          await auth.save()
        }
      }
    }
    return { message: "User succesfully updated" }
  }
  static async login(userCredentials: any) {
    const { email, password } = userCredentials
    const user = await User.findOne({ where: { email } })

    if (user) {
      const auth = await Auth.findOne({
        where: { userId: user.dataValues.id },
      })

      if (auth) {
        const [salt, dbHashedPassword] = await auth.dataValues.password.split(
          ":"
        )
        const hashedPassword = hashSeasonPassword(password, salt)
        const equalPasswords = compareHashes(dbHashedPassword, hashedPassword)
        console.log(equalPasswords)
        if (equalPasswords) {
          console.log("entre al if")
          console.log(generateRefreshToken(password))
          const refreshToken = generateRefreshToken(password)

          const accessToken = generateAccessToken(password)
          console.log(accessToken)

          await auth.update({ accessToken, refreshToken })
          await auth.save()
          return {
            message: "User logged successfully!",
            accessToken,
            refreshToken,
          }
        }
      }
    }
    return { error: "Wrong credentials" }
  }

  static async deleteUser(userId: string) {
    await User.destroy({
      where: {
        userId,
      },
    })
    await Auth.destroy({
      where: {
        userId: userId,
      },
    })
    return { message: "User successfully deleted", id: userId }
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
)
;(async () => await User.sync({ alter: true }))()
//;(async () => await UserModel.drop())()
export default User
