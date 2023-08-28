import { Server } from "http"
import { createServer } from "./server"
import ENV from "./env"
import { sequelize } from "./models"

let runningServer: Server
const run = async () => {
  await sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.")
  })

  const server = createServer()

  runningServer = server.listen(ENV.PORT, () => {
    console.log(`api running on ${ENV.PORT}`)
  })
}
run()

const exitHandler = () => {
  if (runningServer) {
    sequelize.close().then(() => {
      runningServer.close(() => {
        console.log("server closed")
        process.exit(1)
      })
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (err: unknown) => {
  console.error(err)
  exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGTERM", () => {
  console.info("SIGTERM received")
  if (runningServer) {
    runningServer.close()
  }
})
