1. git pull - gets latest code
2. forever stop app.js - stop the server

OR

1. git pull - gets latest code
2. npm install - in case modified `package.json`
3. restart the server - restart the server so that latest code is running

# If site doesn't work

1. run manually without `forever` (PORT=whatever node app.js)
2. shut down server
    - make sure no processes are running: `ps aux | grep node`
    - kill -9 process_id
3. start

=========

build & deploy tool (github actions... jenkins... circle ci)
on push or on merge... build & deploy

============

website flow:

-   registration & login page
-   once logged in --> Home page

===============

## Registration

### Owasp

### argon2

-   hashing
    -   https://www.npmjs.com/package/argon2
    -   https://github.com/ranisalt/node-argon2/wiki/Options

### passport

============

## DB

### Mongoose

-   Schema types & options

    -   https://mongoosejs.com/docs/schematypes.html

-   methods
    -   populate
    -   https://mongoosejs.com/docs/populate.html
