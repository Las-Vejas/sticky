#!/bin/bash

STICKERS_DIR="public/stickers"
mkdir -p "$STICKERS_DIR"

echo "Fetching sticker list..."
STICKERS=$(curl -s https://stickers.hackclub.com/api/stickers)

echo "Downloading stickers..."
echo "$STICKERS" | jq -r '.[] | "\(.id)|\(.cdn_url)"' | while IFS='|' read -r id url; do
  curl -L -s -o "$STICKERS_DIR/$id.png" "$url"
  echo "Downloaded $id"
done

echo "✓ Done!"
