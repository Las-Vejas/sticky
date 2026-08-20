import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, "../public/stickers")

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

async function fetchStickers() {
  const res = await fetch("https://stickers.hackclub.com/api/stickers")
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

async function downloadFile(url, filename) {
  const filePath = path.join(publicDir, filename)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download error: ${res.status}`)
  const buffer = await res.arrayBuffer()
  fs.writeFileSync(filePath, Buffer.from(buffer))
}

async function main() {
  try {
    console.log("Fetching sticker list...")
    const stickers = await fetchStickers()
    console.log(`Found ${stickers.length} stickers. Downloading...`)

    let downloaded = 0
    for (const sticker of stickers) {
      try {
        const filename = `${sticker.id}.png`
        await downloadFile(sticker.cdn_url, filename)
        downloaded++
        if (downloaded % 10 === 0) {
          console.log(`Downloaded ${downloaded}/${stickers.length}`)
        }
      } catch (err) {
        console.error(`Failed to download sticker ${sticker.id}: ${err.message}`)
      }
    }

    console.log(`✓ Done! Downloaded ${downloaded}/${stickers.length} stickers to ${publicDir}`)
  } catch (err) {
    console.error("Error:", err)
    process.exit(1)
  }
}

main()
