'use strict';

const path = require('path');
const chalk = require('chalk');
const configs = require('../../src/configs');
const conn = require('../../db/connectMongoose');
const fs = require('fs');

conn.openUri(process.env.DATABASE_URL);

function getJsonForModel(model) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${model}.json`, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error: ${err}`);
        reject(err, model);
      }
      resolve(JSON.parse(data), model);
    });
  });
}

function saveItem(item) {
  return new Promise((resolve, reject) => {
    item.save((err, itemSaved) => {
      if (err) {
        reject(err);
      } else {
        resolve(itemSaved);
      }
    });
  });
}

function saveDataGeneric(items, modelName) {
  return new Promise((resolve, reject) => {
    console.log(chalk.yellow('Save Items for Model ', modelName));
    for (let i = 0; i < items.length; i++) {
      const Model = require(path.resolve(`./src/models/${modelName}`));
      const item = new Model(items[i]);
      saveItem(item)
        .then((itemSaved) => {
          console.log(chalk.blue(`Saved: ${itemSaved}`));
          resolve();
        })
        .catch((error) => {
          console.log(chalk.blue(`Error ${error} while saving data.`));
          reject();
        });
    }
  });
}

async function populateDb() {
  const items = await getJsonForModel('items');
  await saveDataGeneric(items.items, 'item');
  const users = await getJsonForModel('users');
  await saveDataGeneric(users.users, 'user');
  return true;
}

conn.on('error', (err) => {
  console.log('err', err);
  process.exit(1);
}).once('open', () => {
  if (configs.setup.executeSeeds) {
    populateDb()
      .then()
      .catch(() => {
        console.log('error on populate database');
      });
  }
});
