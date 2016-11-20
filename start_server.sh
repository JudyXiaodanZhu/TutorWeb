mongoimport --db usersdb --collection users --type json --file users_seed.json --jsonArray
mongoimport --db usersdb --collection courses --type json --file courses_seed.json --jsonArray
nodemon server.js
