import path from "path"
import { Sequelize } from "sequelize"
import { Umzug, SequelizeStorage } from "umzug"
import { sequelize } from "~/models"
import logger from "~/utils/logger"

const migration = new Umzug({
  migrations: {
    glob: path.join(__dirname, "../../db/migrations/*.js"),
    resolve: ({ name, path, context }) => {
      // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
      const migration = require(path!)
      return {
        name,
        up: () => migration.up(context, Sequelize),
        down: () => migration.down(context, Sequelize),
      }
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: logger,
})

const seeder = new Umzug({
  migrations: {
    glob: path.join(__dirname, "../../db/seeders/*.js"),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: logger,
})

type UseDatabaseOption = {
  seeder: boolean
}
export const useDatabase = async (option?: UseDatabaseOption) => {
  beforeAll(async () => {
    await sequelize.authenticate()
  })

  beforeEach(async () => {
    await migration.up()
    if (option?.seeder) {
      await seeder.up()
    }
  })

  afterEach(async () => {
    await migration.down({ to: 0 })
  })

  afterAll(async () => {
    await sequelize.close()
  })
}
