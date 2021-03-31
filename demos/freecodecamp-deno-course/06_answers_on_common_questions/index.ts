import date from "http://127.0.0.1:8000/library.ts";

Deno.writeTextFile(`date.txt`, `Current Date is: ${date()}`);
