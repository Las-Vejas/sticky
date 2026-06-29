import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh p-6">
      <div id="hero" className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold text-center">Sticky</h1>
        <div className="flex gap-3 pt-7">
          <Button variant={"ghost"}>Explore the collection</Button>
          <Button>Log In</Button>
        </div>
      </div>
      <div id="features1">
        <p>Having trouble tracking your sticker collection?</p>
      </div>
      <footer>
        <p className="text-2xl font-bold">Sticky</p>
        <div>
          <a><Button variant={"link"}></Button></a>
        </div>
      </footer>
    </div>
  )
}
