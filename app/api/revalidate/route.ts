import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || authHeader !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    )
  }

  revalidateTag("stickers", "default")

  return NextResponse.json({ ok: true, revalidated: true })
}
