"use client"

import { authClient } from "@/lib/auth-client"
import { LoginButton } from "@/components/login-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTransition } from "react"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("")
}

export function AuthButton() {
  const { data: session, isPending } = authClient.useSession()
  const [isSigningOut, startSignOut] = useTransition()

  if (isPending) {
    return <div className="size-7 rounded-full bg-muted" aria-hidden="true" />
  }

  if (!session) {
    return <LoginButton size="sm" />
  }

  const handleSignOut = () => {
    startSignOut(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/"
          },
        },
      })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full">
          <Avatar className="size-7">
            {session.user.image && (
              <AvatarImage src={session.user.image} alt={session.user.name} />
            )}
            <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href="/collection">Your Collection</a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
