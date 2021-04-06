# SURVEY + BLOG + FEATURES (proposal&vote) application

inspiration from a mongo example:
https://github.com/thecodeholic/deno-survey


## DATABASE

Use a postgresql database :

A **dotenv** file is necessary to set the database access,
see *env_example* to rename in *.env*


## DEV

Installing DENON and configuring a scripts.json file is an option to listen change:

```
denon start
```

else, to start the application :

```
deno run --allow-env --allow-net --allow-read unstable server.ts
```

## API

### USERS:

POST
GET
PUT
DELETE

### SURVEYS:

POST
GET
PUT
DELETE

### POSTS:
### COMMENTS:
### FEATURES:
### COURSES:
