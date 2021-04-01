# SURVEY + BLOG + FEATURES (proposal&vote) application

inspiration from a mongo example:
https://github.com/thecodeholic/deno-survey


## DATABASE

Use a postgresql database :

A **config.ts** file is necessary to set the database access,
see *config_example.ts*


## DEV

Installing DENON and configuring a scripts.json file is an option to listen change:

```
denon start
```

else, to start the application :

```
deno run --allow-env --allow-net server.ts
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
