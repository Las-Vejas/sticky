"use client"

import { useTransition } from "react"
import { LogOut, Settings } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { LoginButton } from "@/components/login-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function NavbarAuthButton() {
  const { data: session, isPending } = authClient.useSession()
  const [isSigningOut, startTransition] = useTransition()

  if (isPending) {
    return <div className="size-7 rounded-full bg-muted" aria-hidden="true" />
  }

  if (!session) {
    return <LoginButton size="sm" />
  }

  function handleSignOut() {
    startTransition(async () => {
      await authClient.signOut()
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full p-0"
          aria-label={`${session.user.name} account`}
        >
          <Avatar size="default">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name}
            />
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-[min(18.25rem,calc(100vw-1rem))] gap-0 overflow-hidden rounded-[1.25rem] border border-white/10 bg-neutral text-neutral-content p-0 shadow-2xl ring-1 ring-white/6"
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Avatar className="size-12 border border-white/10 bg-white/5">
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name}
            />
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-[0.95rem] leading-none font-semibold tracking-tight text-white">
              {session.user.name}
            </p>
            <p className="truncate pt-0.5 text-[0.8rem] text-white/60">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-[0.95rem] text-white transition hover:bg-white/4"
        >
          <Settings className="size-[18px] text-white/65" />
          <span>Settings</span>
        </button> */}

        <div className="h-px bg-white/10" />

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-[0.95rem] text-white transition hover:bg-white/4 disabled:opacity-60"
        >
          <LogOut className="size-[18px] text-white/65" />
          <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </PopoverContent>
    </Popover>
  )
}
