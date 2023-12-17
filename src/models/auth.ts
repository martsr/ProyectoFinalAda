import { DataTypes, Model } from "sequelize";
const { STRING, UUID, UUIDV4 } = DataTypes;

import sequelize from "./database";
import User from "./user";

class Auth extends Model {
  static async createAuth(user: any) {
    const newAuth = await Auth.create({
      userId: user.id,
      password: user.password,
      accessToken: null,
      refreshToken: null,
    });
    return newAuth;
  }
  static async getUserInfo(userID: string) {
    const user = await Auth.findByPk(userID);
    console.log(user);
    if (!user) return false;
    const { userId, accessToken, refreshToken } = await user.dataValues;
    return { userId, accessToken, refreshToken };
  }
}
Auth.init(
  {
    userId: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
      unique: true,
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
// (async () => await Auth.sync({ alter: true }))();
User.hasOne(Auth, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
Auth.belongsTo(User, {
  foreignKey: "userId",
});

// (async () => await Auth.drop())();

export default Auth;
