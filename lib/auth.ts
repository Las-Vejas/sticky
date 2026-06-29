import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { betterAuth } from "better-auth"
import { toNextJsHandler, nextCookies } from "better-auth/next-js"
import { genericOAuth } from "better-auth/plugins/generic-oauth"

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
    genericOAuth({
      config: [
        {
          providerId: "hackclub",
          discoveryUrl: hackClubDiscoveryUrl,
          authorizationUrl: hackClubAuthorizationUrl,
          tokenUrl: hackClubTokenUrl,
          userInfoUrl: hackClubUserInfoUrl,
          issuer: hackClubIssuer,
          clientId: process.env.HACK_CLUB_AUTH_CLIENT_ID ?? "",
          clientSecret: process.env.HACK_CLUB_AUTH_CLIENT_SECRET ?? "",
          scopes: ["openid", "profile", "email", "name", "slack_id"],
          overrideUserInfo: true,
          mapProfileToUser(profile) {
            const email =
              typeof profile.email === "string" ? profile.email : undefined
            const slackId =
              typeof profile.slack_id === "string" ? profile.slack_id : undefined
            const name =
              typeof profile.name === "string"
                ? profile.name
                : typeof profile.preferred_username === "string"
                  ? profile.preferred_username
                  : email ?? "Hack Club User"
            const image = slackId
              ? `${cachetBaseUrl}/users/${encodeURIComponent(slackId)}/r`
              : typeof profile.picture === "string"
                ? profile.picture
                : typeof profile.avatar_url === "string"
                  ? profile.avatar_url
                  : null

            return {
              email,
              name,
              image,
              slackId,
              emailVerified: Boolean(profile.email_verified),
            }
          },
        },
      ],
    }),
  ],
})

export const { GET, POST } = toNextJsHandler(auth)
