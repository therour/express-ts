import ENV from "../env"

const app = {
  host: ENV.HOST,
  port: ENV.PORT,
  cors: {
    origin: ENV.APP_CORS_ORIGIN,
  },
}

export default app
