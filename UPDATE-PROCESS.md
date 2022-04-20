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
