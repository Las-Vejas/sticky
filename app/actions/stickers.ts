"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { userStickers } from "@/lib/schema"
import { eq, and } from "drizzle-orm"
import { headers } from "next/headers"

export async function addStickerToCollection(stickerId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Not authenticated")
  }

  const now = new Date()
  const existing = await db
    .select()
    .from(userStickers)
    .where(
      and(
        eq(userStickers.userId, session.user.id),
        eq(userStickers.stickerId, stickerId)
      )
    )

  if (existing.length > 0) {
    await db
      .update(userStickers)
      .set({
        quantity: existing[0].quantity + 1,
        updatedAt: now,
      })
      .where(
        and(
          eq(userStickers.userId, session.user.id),
          eq(userStickers.stickerId, stickerId)
        )
      )
  } else {
    await db.insert(userStickers).values({
      userId: session.user.id,
      stickerId,
      quantity: 1,
      acquiredAt: now,
      updatedAt: now,
    })
  }
}

export async function removeStickerFromCollection(stickerId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error("Not authenticated")
  }

  await db
    .delete(userStickers)
    .where(
      and(
        eq(userStickers.userId, session.user.id),
        eq(userStickers.stickerId, stickerId)
      )
    )
}

export async function getUserStickers() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return []
  }

  return await db
    .select()
    .from(userStickers)
    .where(eq(userStickers.userId, session.user.id))
}
