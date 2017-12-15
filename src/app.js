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

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/apiv1/anuncios', require('./routes/apiv1/items'));
app.use('/apiv1/tags', require('./routes/apiv1/items'));

app.use(errors(configs));

// app.use((err, req, res, next) => {
//   // Es un error de express - validator porque en el response hago validationResult(req).throw();
//   if (err.array) {
//     err.status = 422;
//     const errInfo = err.array({ onlyFirstError: true })[0];
//     err.message = isAPI(req) ?
//       { message: 'Not valid', errors: err.mapped() } : // Para Apis request
//       `Not valid - ${errInfo.param} ${errInfo.msg} `; // Para no Api request
//   }

//   // render the error page
//   res.status(err.status || 500);

//   if (isAPI(req)) { // Si es un API devuelvo
//     res.json({ success: false, err: err.message });
//     return;
//   }

//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   res.render('error');
// });

// // Para que las devolucioes de los api sea json en errors, no html

// function isAPI(req) {
// return req.originalUrl.indexOf('/apiv' === 0); // apiv para que valida la api version cualquiera
// }

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
