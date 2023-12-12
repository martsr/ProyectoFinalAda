import { DataTypes, Model } from "sequelize"
const { STRING, DATE, UUID } = DataTypes
import Sequelize from "sequelize"
import sequelize from "./database"

class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      type: UUID,
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
      type: DATE,
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

export default User
