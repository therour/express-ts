import ENV from "../env"

const db = {
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_DATABASE,
  host: ENV.DB_HOST,
  dialect: ENV.DB_DIALECT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },

  // only used when dialect is sqlite
  storage: ENV.DB_DATABASE,

  // enable logging
  logging: ENV.DB_LOG === "true",
}

export const current = db

export default db
