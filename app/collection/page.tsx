"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function CollectionPage() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-svh flex flex-col px-6 py-12">
        <div className="max-w-6xl mx-auto w-full text-center">
          <h1 className="text-5xl font-bold mb-3">Your Collection</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sign in to manage your sticker collection
          </p>
          <Button asChild>
            <Link href="/api/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh flex flex-col px-6 py-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-3">Your Collection</h1>
          <p className="text-lg text-muted-foreground">
            Track and manage your sticker collection
          </p>
        </div>

        <div className="mb-8">
          <Button asChild>
            <Link href="/stickers">Browse & Add Stickers</Link>
          </Button>
        </div>

        <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold mb-2">No stickers yet</h2>
          <p className="text-muted-foreground mb-6">
            Start building your collection by exploring available stickers
          </p>
          <Button asChild variant="outline">
            <Link href="/stickers">Browse Stickers</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
