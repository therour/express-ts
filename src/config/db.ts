import ENV from "../env"

module.exports = {
  default: {
    username: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_DATABASE,
    host: ENV.DB_HOST,
    dialect: ENV.DB_DIALECT,

    // only used when dialect is sqlite
    storage: ENV.DB_DATABASE,

    // enable logging
    logging: ENV.DB_LOG === "true",
  },
}
