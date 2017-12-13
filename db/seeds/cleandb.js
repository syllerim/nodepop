'use strict';

const chalk = require('chalk');
const configs = require('../../src/configs');
const conn = require('../../db/connectMongoose');

function deleteDb(connection) {
  return new Promise((resolve, reject) => {
    connection.db.dropDatabase((err, result) => {
      if (err) {
        console.log(chalk.red('Error while dropping the Database.'));
        reject(err);
      }
      console.log(chalk.green('Database dropped successfuly.', err));
      resolve(result);
    });
  });
}

function closeDb(connection) {
  return new Promise((resolve) => {
    connection.close();
    resolve();
  });
}

async function cleanDB(connection) {
  let done = await deleteDb(connection);
  done = await closeDb(connection);
  return done;
}

conn.on('close', () => {
  if (configs.setup.executeSeeds) {
    console.log(chalk.red('Connection closed'));
    require('./seeds-data');
  }
});

cleanDB(conn)
  .then(() => {
  })
  .catch((err) => {
    console.log(`Error borrando la base de datos mongodb ${err}`);
  });
