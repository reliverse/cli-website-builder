import { type Config } from "drizzle-kit";

// @ts-expect-error TODO: fix ts
import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["project1_*"],
} satisfies Config;
