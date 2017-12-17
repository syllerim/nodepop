const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const configs = require('./configs');
const errors = require('./middlewares/errors');
const i18n = require('i18n');

const app = express();

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'es',
  directoryPermissions: '755',
  autoReload: true,
  updateFiles: true
});

app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers to endpoints
app.use('/', index);
app.use('/apiv1/anuncios', require('./routes/apiv1/items'));
app.use('/apiv1/tags', require('./routes/apiv1/items'));
app.use('/apiv1/user', require('./routes/apiv1/users'));

// handle Erros
app.use(errors(configs));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
