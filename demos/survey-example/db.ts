import dbconf from "./config.ts"
import { Client } from "https://deno.land/x/postgres@v0.8.0/mod.ts"

const db = new Client(dbconf)

export { db }
