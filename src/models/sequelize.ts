import { Sequelize } from "sequelize"
import ENV from "../env"

const sequelize = new Sequelize({
  dialect: ENV.DB_DIALECT,
  storage: ENV.DB_DATABASE,
})

export default sequelize
