import z from "zod"

const envSchema = z.object({
  PORT: z.string().default("3000"),

  DB_DIALECT: z.literal("sqlite").or(z.literal("mysql")),
  DB_DATABASE: z.string(),
  DB_LOG: z.string().optional(),
  DB_USER: z.string().default(""),
  DB_PASS: z.string().default(""),
  DB_HOST: z.string().default(""),
})

const res = envSchema.safeParse(process.env)
if (!res.success) {
  const errors = res.error.errors.map((err) => err.path.join(", ") + ":\t" + err.message).join("\n")
  console.error(errors)
  process.exit(1)
}

const ENV = res.data

export default ENV
