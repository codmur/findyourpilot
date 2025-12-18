import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/integrations/drizzle/db/schema.ts',
  out: './src/integrations/supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
   },
});
