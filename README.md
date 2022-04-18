# node-learning
node codeing
### Project feature

- Node Express app(Node 16)
- Restful API
- JWT
- Test coverage
- Code formatting(eslint)
- DB(postgres)

### Creating a PostgreSQL database(assumes you use a Mac)
We’ll begin this tutorial by installing PostgreSQL, creating a new user, creating a database, and initializing a table with schema and some data.
- `brew install postgresql`
- `brew services start postgresql`   start postgresql service
- `psql postgres`  we’ve entered into a new connection
- postgres=#` \conninfo`  You are connected to database "postgres" as user "your_username" via socket in "/tmp" at port "5432".
- postgres=# `CREATE ROLE me WITH LOGIN PASSWORD 'password';` Creating a role in Postgres
- postgres=# `ALTER ROLE me CREATEDB`;
- `psql -d postgres -U me`
- postgres=> `CREATE DATABASE api;`
- postgres=> `\c api`  You are now connected to database "api" as user "me".
At this point, we’re finished with all of our PostgreSQL tasks.

### Running the project
Use your favourite node version manager to ensure you are running the correct versions of node and npm.
- Creating a PostgreSQL database.
- Open one terminals `cd` project root and  run `npm install` to install dependencies.
- Then run `node app.js`.
- Open http://localhost:3000/ to view it in the browser.

### Test

- run `npm run test`

### API:
-  getUsers:    get '/users'
- getUserById: get '/users/:id'
- createUser: post '/users'
- updateUser: put  /users/:id'
- deleteUser: delete '/users/:id'

### screenshots
<img width="878" alt="image" src="https://user-images.githubusercontent.com/103567907/163751757-cb116ead-d0ba-4463-90be-4621e8350306.png">
