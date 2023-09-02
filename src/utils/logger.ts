import config from "~/config"
import pino from "pino"
import pinoHttp from "pino-http"
import helpers from "./helpers"

const levelByEnvironment = {
  production: "info",
  development: "debug",
  test: "silent",
}

const logger = pino({
  level: levelByEnvironment[config.environment],
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label }
    },
    bindings({ hostname, ...bindings }) {
      /* istanbul ignore next */
      return {
        ...bindings,
        hostname: config.environment !== "production" ? undefined : hostname,
      }
    },
  },
})

const FILTER_HEADERS = ["authorization", "user-agent", "accept"]

export const requestLogger = pinoHttp({
  logger: logger.child({ name: "http" }),
  wrapSerializers: true,
  serializers: {
    req(req) {
      return {
        locals: req.locals,
        method: req.method,
        url: req.url,
        headers: helpers.pick(req.headers, FILTER_HEADERS),
      }
    },
    res() {
      return undefined
    },
  },
  customSuccessMessage(req, res, responseTime) {
    return `${req.method} ${req.url} ${res.statusCode} (${responseTime}ms)`
  },
})

export default logger
