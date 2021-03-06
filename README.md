### NodePop
This is the software that is executed on server giving services for an app that sell second hand products.

## Requirements

1. [Nodejs](https://nodejs.org/en/) > v8.9.1

2.  [MongoDb] (https://www.mongodb.com/dr/fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.10.tgz/download) > 3.4.10


## Setup Locally with https
1.  Please provide a .env file with the definition of the next variables

PORT=443

NODE_ENV=development||production||seeding||testing

DATABASE_URL=mongodb://domain:xxxxx/nodepop

JWT_SECRET=xxxx

JWT_EXPIRES_IN=Xh

2.  For testing the installation of the database run

- `sudo npm run install-db`

### Testing
- `npm lint` – Add the name of the file .js to verify
- `npm run test`
- `mocha test/integration`
- `mocha test/unitest`
- `mocha test/instance`

### Start
- `sudo npm start` – Start the server by default on development env.

## Production Usage 
The Nodepop Application is hosted on the subdomain `https://nodepop.syllerim.com`, under the domain:

[https://13.59.209.185](https://13.59.209.185)

[https://syllerim.com](https://syllerim.com)

[https://www.syllerim.com](https://www.syllerim.com)


#### Endpoints
This is the list of endpoints the user have access:

- Create User
- Autenticate user
- Get All Items
- Get Tags
- Get Items filtered

Find in the next postman collection the list of endpoints ready for usage.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f4e2adadc30987f9518e)


#### Static files
Static files served on the Nodepop Application are server under the path:
`<nodepop>/images/fileName.png`

Some examples of static files:

[<img src="https://nodepop.syllerim.com/images/api.png" height="72" width="72">](https://nodepop.syllerim.com/images/api.png)


[<img src="https://nodepop.syllerim.com/images/iphone3GS.png" height="72" width="72">](https://nodepop.syllerim.com/images/iphone3GS.png) 

[<img src="https://nodepop.syllerim.com/images/bike.jpg" height="72" width="72">](https://nodepop.syllerim.com/images/bike.jpg)

[<img src="https://nodepop.syllerim.com/images/iphoneX.png" height="72" width="72">](https://nodepop.syllerim.com/images/iphoneX.png) 

[<img src="https://nodepop.syllerim.com/images/appleTV.png" height="72" width="72">](https://nodepop.syllerim.com/images/appleTV.png) 







