# denodoc

A fullstack typescript (Deno+framework?+babel/sucrase?) project, a manual+tutorials static markdown engine.

We still need to figure the correct stack, but the fullstack typscript around deno is the proposed challenge.

### Features :
* multilingual
* version based (each manual is freezed with a release)

### Test demos-deno

Install deno : 

* https://deno.land/manual/getting_started/installation

hello-aleph is a hello world with aleph framework :

* https://alephjs.org/docs/get-started

it used the last release v0.3.0.alpha.18

```
deno install --unstable -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.18/cli.ts
cd demo-deno/hello
aleph dev
```

the site is here
http://localhost:8080

it is broken for now on win10 powershell but work fine on linux


hello-abs is a hello world with abc framework :



hello-oak is a hello world with oak framework :
