"use client"

import Image from "next/image"
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
    <Button
      onClick={handleClick}
      variant={"hackclub"}
      disabled={disabled || isPending}
      {...props}
      className="p-2 justify-center align-center"
    >
      {isPending ? (
        "Redirecting..."
      ) : (
        <>
          <Image
            src="/assets/hackclub.svg"
            alt=""
            width={18}
            height={18}
            className="shrink-0 pl-0"
            aria-hidden="true"
          />
          <span>{children}</span>
        </>
      )}
    </Button>
  )
}
