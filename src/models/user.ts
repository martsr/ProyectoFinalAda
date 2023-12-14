import { DataTypes, Model } from "sequelize"
const { STRING, DATE } = DataTypes
import Sequelize from "sequelize"
import sequelize from "./database"
import Auth from "./auth"
class User extends Model {
  get id(): string {
    return this.getDataValue("id")
  }
}

User.init(
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
    // birthdate: {
    //   type: DATE,
    //   allowNull: false,
    // },
    // birthdate: {
    //   type: DATE("1990-01-01"), // o DataTypes.DATEONLY dependiendo de tus necesidades
    //   allowNull: true,
    // },
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
User.hasOne(Auth, { foreignKey: "userId" })
;(async () => await User.sync({ alter: true }))()
//;(async () => await User.drop())()
export default User

