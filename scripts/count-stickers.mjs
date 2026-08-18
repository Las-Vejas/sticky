import { createClient } from "@tursodatabase/serverless/compat"

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:./sticky.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const result = await client.execute({
  sql: "SELECT COUNT(*) FROM stickers",
  args: [],
})

console.log("Total stickers:", result.rows[0][0])
