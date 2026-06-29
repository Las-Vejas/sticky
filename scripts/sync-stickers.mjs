import { createClient } from "@tursodatabase/serverless/compat"

const STICKERS_API_URL = "http://stickers.hackclub.com/api/stickers"

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:./sticky.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
})

function asNullableString(value) {
  return typeof value === "string" && value.length > 0 ? value : null
}

function normalizeSticker(sticker, updatedAt) {
  return {
    id: Number(sticker.id),
    name: String(sticker.name),
    cdnUrl: String(sticker.cdn_url),
    artist: asNullableString(sticker.artist),
    event: asNullableString(sticker.event),
    eventUrl: asNullableString(sticker.event_url),
    sheet: sticker.sheet ? 1 : 0,
    shiny: sticker.shiny ? 1 : 0,
    updatedAt,
  }
}

async function ensureStickersTable() {
  await client.execute({
    sql: `
      CREATE TABLE IF NOT EXISTS stickers (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        cdnUrl TEXT NOT NULL,
        artist TEXT,
        event TEXT,
        eventUrl TEXT,
        sheet INTEGER NOT NULL DEFAULT 0,
        shiny INTEGER NOT NULL DEFAULT 0,
        updatedAt INTEGER NOT NULL
      )
    `,
    args: [],
  })
}

async function syncStickers() {
  const response = await fetch(STICKERS_API_URL)

  if (!response.ok) {
    throw new Error(`Sticker API request failed with ${response.status}`)
  }

  const stickers = await response.json()

  if (!Array.isArray(stickers)) {
    throw new Error("Sticker API returned a non-array payload")
  }

  await ensureStickersTable()

  const updatedAt = Date.now()
  const normalizedStickers = stickers.map((sticker) =>
    normalizeSticker(sticker, updatedAt)
  )

  for (const sticker of normalizedStickers) {
    await client.execute({
      sql: `
        INSERT INTO stickers (
          id,
          name,
          cdnUrl,
          artist,
          event,
          eventUrl,
          sheet,
          shiny,
          updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          cdnUrl = excluded.cdnUrl,
          artist = excluded.artist,
          event = excluded.event,
          eventUrl = excluded.eventUrl,
          sheet = excluded.sheet,
          shiny = excluded.shiny,
          updatedAt = excluded.updatedAt
      `,
      args: [
        sticker.id,
        sticker.name,
        sticker.cdnUrl,
        sticker.artist,
        sticker.event,
        sticker.eventUrl,
        sticker.sheet,
        sticker.shiny,
        sticker.updatedAt,
      ],
    })
  }

  const count = await client.execute({
    sql: "SELECT COUNT(*) AS count FROM stickers",
    args: [],
  })

  console.log(
    `Synced ${normalizedStickers.length} stickers. DB now has ${count.rows[0][0]} stickers.`
  )
}

await syncStickers()
