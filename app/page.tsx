import Link from "next/link"

import { LoginButton } from "@/components/login-button"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <div
        id="hero"
        className="flex min-h-screen flex-col items-center justify-center"
      >
        <h1 className="text-center text-8xl font-bold">Sticky</h1>
        <div className="flex gap-3 pt-7">
          <Button asChild variant={"ghost"}>
            <Link href="/stickers">Explore the collection</Link>
          </Button>
          <LoginButton />
        </div>
      </div>
      <div id="features1">
        <p>Having trouble tracking your sticker collection?</p>
      </div>
    </div>
  )
}
