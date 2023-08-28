import express, { ErrorRequestHandler } from "express"
import morgan from "morgan"
import cors from "cors"
import router from "./routes"

export const createServer = () => {
  const app = express()

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())

  app.use("/", router)

  const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    console.error(err)
    return res.status(500).send("Something broke!")
  }

  app.use(errorHandler)

  return app
}
