const dbName = process.env.DB_DATABASE
const testDbName = dbName ? (dbName.endsWith("test") ? dbName : `${dbName}_test`) : "test"

Object.assign(process.env, {
  NODE_ENV: "test",
  DB_DIALECT: "mysql",
  DB_DATABASE: testDbName,
})
