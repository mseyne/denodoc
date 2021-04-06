import { config, Client } from "./deps.ts"

// config to get the .env data
config({export:true})
const dbconf = {
    user: Deno.env.get('DB_USER'),
    database: Deno.env.get('DB_NAME'),
    password: Deno.env.get('DB_PASSWORD'),
    hostname: Deno.env.get('DB_HOST'),
    port: Deno.env.get('DB_PORT')
}

const db = new Client(dbconf)

export default db
