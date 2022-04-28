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

### Font

-   Font Awesome (layout.hbs)
    -   https://fontawesome.com/

### passport

-   Used:
    -   auth.js
    -   app.js
    -   login.js
    -   closet.js
-   References:
    -   https://www.geeksforgeeks.org/node-js-authentication-using-passportjs-and-passport-local-mongoose/
    -   https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
    -   https://heynode.com/tutorial/authenticate-users-node-expressjs-and-passportjs/

============

## DB

### Mongoose

-   Schema types & options

    -   https://mongoosejs.com/docs/schematypes.html

-   methods

    -   populate
        -   https://mongoosejs.com/docs/populate.html

-   References:
    -   https://mongoosejs.com/docs/deprecations.html#the-usenewurlparser-option

==============

## modules used that were not introduced in class

1. connect-ensure-login
    - https://www.npmjs.com/package/connect-ensure-login (closet.js)

==================

# CSS Framework

---

## Tailwind

-   https://tailwindcss.com/docs/installation/using-postcss
-   layout.hbs
-   https://tailwindcss.com/docs/configuration
