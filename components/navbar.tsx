import { Button } from "./ui/button"

export default function Navbar() {
  return (
    <nav className="flex w-full justify-between p-6">
        <h1 className="font-bold text-2xl">Sticky</h1>
        <div className="flex gap-3">
          <Button variant={"outline"} size={"sm"}>Available stickers</Button>
          <Button variant={"outline"} size={"sm"}>Leaderboard</Button>
          <Button variant={"default"} size={"sm"}>Log In</Button>
          <Button variant={"default"} size={"sm"}>Your collection</Button> 
        </div>
    </nav>
  )
}