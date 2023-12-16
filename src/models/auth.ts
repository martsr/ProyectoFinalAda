import { DataTypes, Model } from "sequelize";
const { STRING } = DataTypes;
import Sequelize from "sequelize";
import sequelize from "./database";
import UserModel from "./user";

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
    accessToken: {
      type: STRING,
      allowNull: true,
    },
    refreshToken: {
      type: STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Auth",
    tableName: "Auths",
    timestamps: false,
  }
);
(async () => await Auth.sync({ alter: true }))();
//;(async () => await User.drop())()

export default Auth;
