import Link from "next/link"

import { LoginButton } from "@/components/login-button"
import { Button } from "@/components/ui/button"

type StickyFooterProps = {
  wordmark?: string
  title?: string
  caption?: string
}

export function Footer({
  wordmark = "sticky",
  title = "Track every sticker.",
  caption = "The oversized wordmark uses a responsive clamp size so it stays dramatic on desktop and still fits on mobile.",
}: StickyFooterProps) {
  return (
    <footer className="mt-24 w-full border-t border-border bg-foreground text-background">
      <div className="mx-auto flex min-h-[42rem] max-w-7xl flex-col justify-between gap-12 px-6 py-12 sm:px-8 sm:py-14">
        <div className="max-w-md space-y-5">
          <h2 className="max-w-sm text-pretty text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-sm text-sm leading-6 text-background/65">
            {caption}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Button
              asChild
              variant="secondary"
              className="rounded-full bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/stickers">Browse stickers</Link>
            </Button>
            <LoginButton
              variant="ghost"
              className="rounded-full px-4 text-background hover:bg-background/10 hover:text-background"
            >
              Sign in
            </LoginButton>
          </div>
        </div>

        <div className="space-y-6">
          <p
            className="overflow-hidden text-[clamp(5.5rem,23vw,13rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-background"
            aria-label={wordmark}
          >
            {wordmark}
          </p>
          <div className="flex flex-col gap-3 border-t border-background/12 pt-4 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Sticky</p>
            <p>Catalog the collection. Show the haul.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
