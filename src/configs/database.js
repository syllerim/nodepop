module.exports = {
  username: 'root',
  password: 'root',
  host: 'localhost',
  database: 'nodepop',
  port: 27017,
  dialect: 'mongodb',
  options: {
    useMongoClient: true,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Eevery 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  },
  logging: () => {}
};
