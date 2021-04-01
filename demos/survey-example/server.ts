import { Application } from "./deps.ts"
import router from "./routes.ts"

const port = Deno.env.get("PORT") || 8000 
const app = new Application

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen', ({hostname, port, secure}) => {
    console.log(`Listening on ${secure ? 'https' : 'http'}://${hostname || 'localhost'}:${port}.`)
})

await app.listen({ port: +port })
