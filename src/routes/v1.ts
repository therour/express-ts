import { Router } from "express"
import { z } from "zod"
import { User } from "~/models"
import logger from "~/utils/logger"

const createUserPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

const router = Router()

router.get("/users", async (req, res) => {
  const users = await User.findAll()
  res.json({ data: users })
})

router.post("/users", async (req, res) => {
  try {
    const payload = createUserPayloadSchema.parse(req.body)

    const user = await User.create(payload)
    res.json({ data: user })
    return
  } catch (err) {
    logger.error(err)
    res.status(400).json({ message: "Invalid JSON" })
    return
  }
})

export default router
