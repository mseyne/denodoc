// --allow-read Read current working directory
// console.log(Deno.cwd());

// --allow-read Read file content and output
//let content = await Deno.readTextFile("./read.txt");
//console.log(content);

// --allow-write Write content into file
//await Deno.writeTextFile("./write.txt", "123");
//content = await Deno.readTextFile("./write.txt");
//console.log(content);
// --allow-env Environmental access
// Deno.env.set("TEST_VARIABLE", "Value");
// const value = Deno.env.get("TEST_VARIABLE");
// console.log(value);

// --allow-net Allow network access
//const myTodo = await fetch("https://jsonplaceholder.typicode.com/todos/1")
//  .then((response) => response.json());
//console.log("TODO from jsonplaceholder ", myTodo);
