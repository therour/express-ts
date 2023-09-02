import ENV from "~/env"
import db from "./db"
import app from "./app"

const config = {
  environment: ENV.NODE_ENV,
  app,
  db,
}

export default config
