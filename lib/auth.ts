import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { betterAuth } from "better-auth"
import { toNextJsHandler, nextCookies } from "better-auth/next-js"
import { genericOAuth } from "better-auth/plugins/generic-oauth"
import { dash } from "@better-auth/infra"
import { db } from "@/lib/db"
import * as schema from "@/lib/schema"

const hackClubDiscoveryUrl = process.env.HACK_CLUB_AUTH_DISCOVERY_URL
const hackClubAuthorizationUrl = process.env.HACK_CLUB_AUTH_AUTHORIZATION_URL
const hackClubTokenUrl = process.env.HACK_CLUB_AUTH_TOKEN_URL
const hackClubUserInfoUrl = process.env.HACK_CLUB_AUTH_USER_INFO_URL
const hackClubIssuer = process.env.HACK_CLUB_AUTH_ISSUER
const cachetBaseUrl = "https://cachet.dunkirk.sh"

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  basePath: "/api/auth",
  user: {
    additionalFields: {
      slackId: {
        type: "string",
        required: false,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  plugins: [
    nextCookies(),
    dash(),
    genericOAuth({
      config: [
        {
          providerId: "hackclub",
          discoveryUrl: hackClubDiscoveryUrl,
          authorizationUrl: hackClubAuthorizationUrl,
          tokenUrl: hackClubTokenUrl,
          userInfoUrl: hackClubUserInfoUrl,
          clientId: process.env.HACK_CLUB_AUTH_CLIENT_ID ?? "",
          clientSecret: process.env.HACK_CLUB_AUTH_CLIENT_SECRET ?? "",
          scopes: ["openid", "profile", "email", "name", "slack_id"],
          overrideUserInfo: true,
          mapProfileToUser: (profile) => {
  return {
    email: profile.email,
    name: profile.name,
    // Change `null` to `undefined` (or nullish coalescing)
    image: profile.image ?? undefined,
    slackId: profile.slackId,
    emailVerified: profile.emailVerified ?? false,
  }
}
        },
      ],
    }),
  ],
})

export const { GET, POST } = toNextJsHandler(auth)
