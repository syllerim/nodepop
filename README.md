### NodePop
This is the software that is executed on server giving services for an app that sell second hand products.

## Requirements

1. [Nodejs](https://nodejs.org/en/) > v8.9.1

2.  [MongoDb] (https://www.mongodb.com/dr/fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.10.tgz/download) > 3.4.10

## Commands

### Setup
1.  Please provide a .env file with the definition of the next variables

PORT=443

NODE_ENV=development||production||seeding||testing

DATABASE_URL=mongodb://domain:xxxxx/nodepop

JWT_SECRET=xxxx

JWT_EXPIRES_IN=Xh

2.  For testing the installation of the database run

- `npm run install-db`

### Testing
- `npm lint` – Add the name of the file .js to verify
- `npm run test`
- `mocha test/integration`
- `mocha test/unitest`
- `mocha test/instance`

### Start
- `npm start` – Start the server by default on development env.