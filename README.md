# Denodoc

Learning deno repository

### Test demos-deno

Install deno : 

* https://deno.land/manual/getting_started/installation

#### DENO

hello-deno is a hello world with deno only :

```
cd demos/hello-deno
deno run --allow-net .\start.ts
```

the site is here
http://localhost:8000/

#### ALEPH

hello-aleph is a hello world with the *aleph* framework :

* https://alephjs.org/docs/get-started

it used the last release v0.3.0.alpha.18

```
deno install --unstable -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.18/cli.ts
cd demos/hello-aleph
aleph dev
```

the site is here
http://localhost:8080

it is broken for now on win10 powershell but work fine on linux


#### ABC

hello-abc is a hello world with the *abc* framework :

```
cd demos/hello-abc
deno run --allow-net ./server.ts
```

#### OAK

hello-oak is a hello world with the *oak* framework :

```
cd demos/hello-oak
deno run --allow-net ./server.ts
```

the site is here
http://localhost:8080/

#### Ressources :

* awesome deno :
    * https://github.com/denolib/awesome-deno
    * https://github.com/denoone/awesome-deno
* markdown : https://github.com/ubersl0th/markdown
* postgres : https://deno.land/x/postgres@v0.8.0
* denon : https://deno.land/x/denon@2.4.7

