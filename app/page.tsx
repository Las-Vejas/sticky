import Link from "next/link"
import { HeroStickers } from "@/components/hero-stickers"
import { AuthButton } from "@/components/auth-button"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { asc, inArray } from "drizzle-orm"
import { stickers } from "@/lib/schema"

export default async function Page() {
  const stickerChoices = [3839758, 3839775, 3839778, 3839782, 3839784, 3839797, 3839799, 3839818, 3839830, 3839877, 3839904, 3839909, 3839908, 3839931]

  const heroStickers = await db
    .select({
      id: stickers.id,
      name: stickers.name,
      cdnUrl: stickers.cdnUrl,
    })
    .from(stickers)
    .where(inArray(stickers.id, stickerChoices))
    .orderBy(asc(stickers.name))
  
  const shuffled = [...heroStickers].sort(() => Math.random() - 0.5)
  const visibleHeroStickers = shuffled.slice(0, 8)

  return (
    <div className="flex min-h-svh flex-col">
      <div
        id="hero"
        className="flex min-h-svh flex-col items-center justify-center overflow-hidden px-6"
      >
        <div className=" z-10">
          <h1 className="text-center text-[clamp(3.5rem,18vw,16rem)] font-bold leading-[0.85] tracking-[-0.08em]">
            Sticky
          </h1>
        </div>
        <HeroStickers stickers={visibleHeroStickers} />
        <div className=" z-10 flex flex-wrap justify-center gap-3 pt-7">
          <Button asChild variant={"outline"}>
            <Link href="/stickers">Explore</Link>
          </Button>
          <AuthButton />
        </div>
      </div>
      <div id="features1" className="">
        <div className="grid grid-cols-2">
          <div className="flex-col items justify-center">
            <h2 className="text-5xl text-center font-bold tracking-tight mb-5">Easy to use UI</h2>
            <p>Just take a snap of your sticker collection, and all of them will be added to your collection!</p>
          </div>
          <div className="flex items justify-center">
            <p>Image of ui goes here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
