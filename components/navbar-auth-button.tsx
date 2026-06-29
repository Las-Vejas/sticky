"use client"

import { authClient } from "@/lib/auth-client"
import { LoginButton } from "@/components/login-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("")
}

export function NavbarAuthButton() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div className="size-7 rounded-full bg-muted" aria-hidden="true" />
  }

  if (!session) {
    return <LoginButton size="sm" />
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="rounded-full p-0"
      aria-label={`${session.user.name} account`}
    >
      <Avatar size="sm">
        <AvatarImage
          src={session.user.image ?? undefined}
          alt={session.user.name}
        />
        <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
      </Avatar>
    </Button>
  )
}
