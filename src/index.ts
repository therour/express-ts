import { Server } from "http"
import app from "./app"
import { sequelize } from "./models"
import logger from "./utils/logger"
import config from "./config"

let runningServer: Server
const run = async () => {
  await sequelize.authenticate().then(() => {
    logger.debug("sequelize Connection has been established successfully.")
  })

  const listenPath = `${config.app.host}:${config.app.port}`

  runningServer = app.listen(listenPath, () => {
    logger.debug(`api running on ${listenPath}`)
  })
}
run()

const exitHandler = () => {
  if (runningServer) {
    sequelize.close().then(() => {
      runningServer.close(() => {
        logger.debug("server closed")
        process.exit(1)
      })
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (err: unknown) => {
  logger.error(err)
  exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGTERM", () => {
  logger.info("SIGTERM received")
  if (runningServer) {
    runningServer.close()
  }
})
