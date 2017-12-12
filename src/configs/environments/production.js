const parse = require('parse-database-url');

const config = require('./default');

const mongoose = parse(process.env.DATABASE_URL);

config.http.exposeErrors = false;

config.database = {
  username: mongoose.username,
  password: mongoose.password,
  host: mongoose.host,
  database: mongoose.database,
  port: mongoose.port,
  dialect: mongoose.driver,
  options: {
    useMongoClient: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    bufferMaxEntries: 0
  },
  logging: () => {}
};

module.exports = config;
