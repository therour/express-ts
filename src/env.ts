import z from "zod"

const envSchema = z.object({
  NODE_ENV: z
    .literal("development")
    .or(z.literal("production"))
    .or(z.literal("test"))
    .default("production"),
  PORT: z.string().default("3000"),

  DB_DIALECT: z.literal("sqlite").or(z.literal("mysql")).or(z.literal("postgres")),
  DB_DATABASE: z.string(),
  DB_LOG: z.string().optional(),
  DB_USER: z.string().default(""),
  DB_PASS: z.string().default(""),
  DB_HOST: z.string().default(""),
  DB_PORT: z.number().optional(),
  DB_SSL: z
    .literal("true")
    .or(z.literal("false"))
    .default("true")
    .transform((val) => val === "true"),
})

const result = envSchema.safeParse({ ...process.env })
if (!result.success) {
  const errors = result.error.issues
    .map((issue) => issue.path.join(", ") + ":\t" + issue.message)
    .join("\n")
  throw new Error(`Invalid environment variables:\n${errors}`)
}

const ENV = result.data

export default ENV
