"use client"

import { authClient } from "@/lib/auth-client"

type AuthSwitchProps = {
  loading?: React.ReactNode
  loggedOut: React.ReactNode
  loggedIn: (session: NonNullable<ReturnType<typeof authClient.useSession>["data"]>) => React.ReactNode
}

export function AuthSwitch({
  loading = null,
  loggedOut,
  loggedIn,
}: AuthSwitchProps) {
  const { data, isPending } = authClient.useSession()

  if (isPending) {
    return <>{loading}</>
  }

  if (!data) {
    return <>{loggedOut}</>
  }

  return <>{loggedIn(data)}</>
}
