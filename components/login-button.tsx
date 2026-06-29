"use client"

import { useTransition } from "react"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

type LoginButtonProps = React.ComponentProps<typeof Button> & {
  callbackURL?: string
}

export function LoginButton({
  callbackURL = "/",
  children = "Log In",
  disabled,
  ...props
}: LoginButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await authClient.signIn.oauth2({
        providerId: "hackclub",
        callbackURL,
      })
    })
  }

  return (
    <Button onClick={handleClick} disabled={disabled || isPending} {...props}>
      {isPending ? "Redirecting..." : children}
    </Button>
  )
}
