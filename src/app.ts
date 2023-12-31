import express, { ErrorRequestHandler } from "express"
import cors from "cors"
import router from "./routes"
import logger, { requestLogger } from "./utils/logger"
import config from "./config"

const app = express()

app
  .disable("x-powered-by")
  .use(requestLogger)
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(
    cors({
      origin: config.app.cors.origin,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )

app.use("/", router)

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(err)
  return res.status(500).send("Something broke!")
}

app.use(errorHandler)

export default app
