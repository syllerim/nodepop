const config = require('./development');

config.database.options.logging = false;
config.logs.enabled = false;
config.setup.executeSeeds = true;

module.exports = config;
