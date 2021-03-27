import {serve} from "https://deno.land/std@0.91.0/http/server.ts";

let message:string;
message = "Hello,World!";
const server = serve({port: 8000});

for await (const req of server) {
    console.log('Incoming request');
    req.respond({
        body:message
    });
}