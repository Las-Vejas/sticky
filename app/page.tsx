import Link from "next/link"

import { AuthButton } from "@/components/auth-button"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <div
        id="hero"
        className="flex min-h-[72svh]  flex-col items-center justify-start pt-48 sm:pt-48"
      >
        <h1 className="text-center text-[clamp(6rem,18vw,16rem)] font-bold leading-[0.85] tracking-[-0.08em]">
          Sticky
        </h1>
        <div className="flex gap-3 pt-7">
          <Button asChild variant={"outline"}>
            <Link href="/stickers">Explore</Link>
          </Button>
          <AuthButton />
        </div>
      </div>
      <div id="features1">
        <p>Having trouble tracking your sticker collection?</p>
      </div>
    </div>
  )
}
