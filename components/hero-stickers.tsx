"use client"

import Image from "next/image"
import { useState } from "react"

type HeroSticker = {
    id: number
    name: string
    cdnUrl: string
}

const initialPositions = [
    { x: 78, y: 18, r: 10 },
    { x: 19.8325, y: 76.3486, r: 9 },
    { x: 80.1761, y: 76.0531, r: -8 },
    { x: 35.3781, y: 25.8451, r: -12 },
    { x: 8.2555, y: 26.5983, r: -12 },
    { x: 64.8318, y: 21.8737, r: 10 },
    { x: 22.9182, y: 47.4749, r: 9 },
    { x: 79.0165, y: 57.4735, r: -8 },
]

const POSITION_DEVIATION = 4

function getSeededUnit(seed: number) {
    const value = Math.sin(seed * 12.9898) * 43758.5453
    return value - Math.floor(value)
}

function getDeterministicOffset(seed: number) {
    return (getSeededUnit(seed) * 2 - 1) * POSITION_DEVIATION
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
}

export function HeroStickers({stickers}: {stickers: HeroSticker[]}) {
    const [positions, setPositions] = useState(() =>
        stickers.map((sticker, i) => {
            const basePosition = initialPositions[i % initialPositions.length]

            return {
                ...basePosition,
                x: clamp(basePosition.x + getDeterministicOffset(sticker.id * 2 + 1), 6, 94),
                y: clamp(basePosition.y + getDeterministicOffset(sticker.id * 2 + 2), 8, 92),
            }
        })
    )

    return (
        <div className="pointer-events-none absolute inset-0 z-15">
            {stickers.map((sticker, index) => {
                const pos = positions[index]
                return (
                    <button key={sticker.id} 
                        type="button" 
                        className="pointer-events-auto absolute touch-none" 
                        style={{left: `${pos.x}%`, top: `${pos.y}%`, transform: `translate(-50%, -50%) rotate(${pos.r}deg)`,}}
                        onPointerDown={(event) => {
                            const startX = event.clientX
                            const startY = event.clientY
                            const start = positions[index]

                            const move = (moveEvent: PointerEvent) => {
                                const dx = ((moveEvent.clientX - startX) / window.innerWidth) * 100
                                const dy = ((moveEvent.clientY - startY) / window.innerHeight) * 100

                                setPositions((prev) =>
                                prev.map((item, i) =>
                                    i === index ? {...item, x: start.x +dx, y: start.y + dy } : item
                            )
                        )
                    }
                    const up = () => {
                        window.removeEventListener("pointermove", move)
                        window.removeEventListener("pointerup", up)
                    }
                    window.addEventListener("pointermove", move)
                    window.addEventListener("pointerup", up)
                }}
                >
                    <div className="size-24 sm:size-32 md:size-36">
                        <Image
                            src={sticker.cdnUrl}
                            alt={sticker.name}
                            fill
                            className="object-contain drop-shadow-xl select-none"
                            draggable={false}
                        />
                    </div>
                </button>
                )
            })}
        </div>
    )
}
