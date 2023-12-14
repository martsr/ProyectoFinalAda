import { DataTypes, Model } from "sequelize"
const { STRING } = DataTypes
import Sequelize from "sequelize"
import sequelize from "./database"
import User from "./user"
class Auth extends Model {}
Auth.init(
  {
    userId: {
      primaryKey: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Auth",
    tableName: "Auths",
    timestamps: false,
  }
)
User.hasOne(Auth, { foreignKey: "userId" })
Auth.belongsTo(User, { foreignKey: "userId" })
;(async () => await Auth.sync({ alter: true }))()

export default Auth

