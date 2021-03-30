# Denodoc

Temporary name.

A fullstack typescript (Deno+Oak+templating?+babel/sucrase?) project, a manual+tutorials static markdown engine.

We still need to figure the correct stack, but the fullstack typescript around deno is the proposed challenge.

### Features :
* multilingual
* version based (each manual is freezed with a release)

### Inspirations :

* https://linuxjourney.com/
* https://docs.godotengine.org/en/stable/index.html
* https://projects.raspberrypi.org/en/projects/

### Test demos-deno

Differents tests to decide which framework

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

hello-aleph is a hello world with aleph framework :

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

hello-abc is a hello world with abc framework :

```
cd demos/hello-abc
deno run --allow-net ./server.ts
```

#### OAK

hello-oak is a hello world with oak framework :

todo


#### Ressources :

* templating engine : https://deno.land/x/view_engine@v1.4.5
* awesome deno :
    * https://github.com/denolib/awesome-deno
    * https://github.com/denoone/awesome-deno
* sucrase : https://sucrase.io/
* markdown : https://github.com/ubersl0th/markdown

#### Content :

The doc content on another repository for a temporary static website, maybe using it directly as a submodule ?

Git submodules :
* https://stackoverflow.com/questions/36554810/how-to-link-folder-from-a-git-repo-to-another-repo
