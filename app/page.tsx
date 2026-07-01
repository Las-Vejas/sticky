import Link from "next/link"
import { HeroStickers } from "@/components/hero-stickers"
import { AuthButton } from "@/components/auth-button"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { asc, inArray } from "drizzle-orm"
import { stickers } from "@/lib/schema"

export default async function Page() {
  const stickerChoices = [33495, 33512, 33519, 33491, 33542, 33683, 34815, 33669, 33534, 33499, 33724, 33758, 33666, 33617]

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
      <div id="features1">
      </div>
    </div>
  )
}
