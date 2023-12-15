//import { DataTypes, Model } from "sequelize";
import { DataTypes, Model } from "./database";
const { STRING, DATEONLY } = DataTypes;
import Sequelize from "sequelize";
import sequelize from "./database";
import Auth from "./auth";

class User extends Model {
  get id(): string {
    return this.getDataValue("id");
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
User.hasOne(Auth, { foreignKey: "userId" });
Auth.belongsTo(User, { foreignKey: "userId" });
// (async () => await User.sync({ alter: true }))();
//;(async () => await User.drop())()
export default User;
