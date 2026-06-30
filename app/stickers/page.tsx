import { asc } from "drizzle-orm"
import { unstable_cache } from "next/cache"
import Image from "next/image"

import { db } from "@/lib/db"
import { stickers } from "@/lib/schema"

const getCachedStickers = unstable_cache(
  async () => db.select().from(stickers).orderBy(asc(stickers.name)),
  ["stickers"],
  {
    tags: ["stickers"],
    revalidate: 3600,
  },
)

export default async function StickersPage() {
  const allStickers = await getCachedStickers()

  return (
    <div className="py-12">
      <div className="flex flex-col gap-3 border-b border-border pb-8 text-center">
        <p className="text-sm font-medium tracking-tight text-muted-foreground ">
          {allStickers.length} stickers
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Available Stickers
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Here&apos;s a collection of the stickers you are able to obtain.
        </p>
      </div>

      <div className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allStickers.map((sticker) => (
          <article
            key={sticker.id}
            className="group flex min-h-full flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex aspect-square items-center justify-center bg-muted p-6">
              <div className="relative size-full">
                <Image
                  src={sticker.cdnUrl}
                  alt={sticker.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="space-y-1">
                <h2 className="line-clamp-2 text-base leading-snug font-semibold">
                  {sticker.name}
                </h2>
                {sticker.artist ? (
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {sticker.artist}
                  </p>
                ) : null}
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                {sticker.event ? (
                  sticker.eventUrl ? (
                    <a
                      href={sticker.eventUrl}
                      className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition hover:text-foreground"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {sticker.event}
                    </a>
                  ) : (
                    <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {sticker.event}
                    </span>
                  )
                ) : null}
                {sticker.sheet ? (
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    Sheet
                  </span>
                ) : null}
                {sticker.shiny ? (
                  <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                    Shiny
                  </span>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
