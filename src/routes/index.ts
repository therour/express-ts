import { Router } from "express"
import { User } from "../models"
import { z } from "zod"

const router = Router()

router.get("/users", async (req, res) => {
  const users = await User.findAll()
  return res.send(users)
})

const createUserPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

router.post("/users", async (req, res) => {
  try {
    const payload = createUserPayloadSchema.parse(req.body)

    const user = await User.create(payload)
    return res.send(user)
  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: "Invalid JSON" })
  }
})

export default router
