import { createClient } from "@tursodatabase/serverless/compat"
import type { Client } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "@/lib/schema"

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:./sticky.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(turso as Client, { schema })
