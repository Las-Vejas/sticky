# Sticky

An app to track your collection of [Hack Club](https://hackclub.com) stickers!
| Made for hackclub stardance |



This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Database commands

The app uses Turso. Database credentials should live in `.env`:

```bash
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
```

If `TURSO_DATABASE_URL` is empty, the app and scripts fall back to a local
SQLite file at `./sticky.db`.

### Sync stickers

Pulls stickers from <https://stickers.hackclub.com/api/stickers> and upserts
them into the `stickers` table. The script creates the `stickers` table if it
does not already exist.

```bash
npm run sync:stickers
```

### Inspect the remote DB

Replace `<database-name>` with your Turso database name.

```bash
turso db shell <database-name> "SELECT COUNT(*) FROM stickers;"
turso db shell <database-name> "SELECT id, name, cdnUrl FROM stickers LIMIT 10;"
turso db shell <database-name> "SELECT id, name, email, slackId FROM user LIMIT 10;"
```

### Schema source

The Drizzle schema lives in `lib/schema.ts`. Auth tables are `user`, `session`,
`account`, and `verification`; sticker data lives in `stickers`.
