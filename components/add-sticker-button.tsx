"use client"

import { Button } from "@/components/ui/button"
import { addStickerToCollection } from "@/app/actions/stickers"
import { useState } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

export function AddStickerButton({ stickerId }: { stickerId: number }) {
  const [loading, setLoading] = useState(false)
  const { data: session } = authClient.useSession()

  if (!session) {
    return (
      <Button variant="outline" size="sm" asChild>
        <a href="/api/auth/signin">Sign In to Add</a>
      </Button>
    )
  }

  const handleAdd = async () => {
    try {
      setLoading(true)
      await addStickerToCollection(stickerId)
      toast.success("Added to collection")
    } catch (error) {
      toast.error("Failed to add sticker")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={loading}
      size="sm"
      variant="default"
    >
      {loading ? "Adding..." : "Add to Collection"}
    </Button>
  )
}
