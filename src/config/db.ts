import ENV from "../env"

const db = {
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_DATABASE,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: ENV.DB_DIALECT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  ssl: ENV.DB_SSL,

  // only used when dialect is sqlite
  storage: ENV.DB_DATABASE,

  // enable logging
  logging: ENV.DB_LOG === "true",
}

export const current = db

export default db
