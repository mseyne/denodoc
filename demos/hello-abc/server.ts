import { Application } from "https://deno.land/x/abc@v1.3.0/mod.ts";

const app = new Application();

app
  .get("/hello", (c) => {
    return "Hello, Abc!";
  })
  .start({ port: 8080 });