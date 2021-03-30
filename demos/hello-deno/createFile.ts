const encoder = new TextEncoder()
const greetText = encoder.encode('Hello World\nMy name is Ego')

await Deno.writeFile('greet.txt', greetText)