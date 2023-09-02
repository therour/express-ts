import ENV from "~/env"
import db from "./db"

const config = {
  environment: ENV.NODE_ENV,
  db,
}

export default config
