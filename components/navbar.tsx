import Link from "next/link"

import { NavbarAuthButton } from "@/components/navbar-auth-button"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-6">
      <Link href="/" className="text-2xl font-bold">
        Sticky
      </Link>
      <div className="flex gap-3">
        <Button asChild variant={"outline"} size={"sm"}>
          <Link href="/stickers">Available stickers</Link>
        </Button>
        <Button asChild variant={"outline"} size={"sm"}>
          <Link href="/leaderboard">Leaderboard</Link>
        </Button>
        <NavbarAuthButton />
        <Button asChild variant={"default"} size={"sm"}>
          <Link href="/collection">Your collection</Link>
        </Button>
      </div>
    </nav>
  )
}
