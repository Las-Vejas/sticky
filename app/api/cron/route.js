import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { syncStickers } from "../../../scripts/sync-stickers.mjs"

export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET(request) {
  const userAgent = request.headers.get("user-agent")
  const schedule = request.headers.get("x-vercel-cron-schedule")

  if (process.env.VERCEL === "1" && userAgent !== "vercel-cron/1.0") {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    )
  }

  const result = await syncStickers()

  revalidateTag("stickers")

  return NextResponse.json({
    ok: true,
    schedule,
    ...result,
  })
}
