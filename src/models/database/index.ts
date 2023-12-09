import { Sequelize, DataTypes, Model } from "sequelize"
import { DB_PATH } from "../../constants"

const sequelize = new Sequelize(DB_PATH, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})
async function testConnection() {
  try {
    const test = await sequelize.authenticate()
    return await sequelize.authenticate()
  } catch (error) {
    return new Error("Cannot establish connection to the server")
  }
}
export { testConnection, DataTypes, Model }
export default sequelize
