import { useDatabase } from "../testhelpers/database"
import request from "supertest"
import app from "~/app"
import { User } from "~/models"

useDatabase()

describe("GET /api/v1/users", () => {
  it("returns 200", async () => {
    await User.create({ name: "test", email: "test@email.com" })

    const response = await request(app).get("/api/v1/users")

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      expect.objectContaining({
        name: "test",
        email: "test@email.com",
      }),
    ])
  })
})

describe("POST /api/v1/users", () => {
  it("returns 200", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "test",
      email: "test@email.com",
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "test",
        email: expect.any(String),
      }),
    )
  })

  it("returns 400 when invalid JSON", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "test",
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Invalid JSON",
      }),
    )
  })
})
