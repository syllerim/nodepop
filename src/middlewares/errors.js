
function isAPI(req) {
  return req.originalUrl.indexOf('/apiv1/') === 0;
}

function setError5xx(err, res, http) {
  let data = {};
  let message = 'Something went wrong';
  if (http.exposeErrors) {
    data = err.stack;
    message = err.message;
  }

  res.status(err.status);

  if (isAPI) {
    res.json({ success: 'false', data, message });
  } else {
    res.locals.message = err.message;
    res.locals.err = req.app.get('env') === 'development' ? err : {};
  }
}

function setError4xx(err, res) {
  let data = {};

  if (err.errors) {
    data = err.errors;
  }

  if (isAPI) {
    res.json({ success: 'false', data, message: err.message });
  } else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  }
}

module.exports = configs => (err, req, res, next) => {
  if (err) {
    let status = err.status || 500;

    if (err.message === 'NO_TOKEN_PROVIDED' || err.message === 'INVALID_CREDENTIALS' || err.message === 'PASSWORD_INVALID' || err.message === 'TOKEN_ERROR') {
      status = 401;
      err.message = req.__(err.msg);
    } else if (err.errors) {
      status = 400;
      if (err.array) {
        status = 422;
        const errInfo = err.array({ onlyFirstError: true })[0];
        err.message = isAPI(req) ? { message: 'Not valid', errors: err.mapped() } : `Not valid - ${errInfo.param} ${req.__(errInfo.msg)} `;
      } else if (err.message === 'VALIDATION_ERROR_FIELDS') {
        status = 422;
        err.message = req.__(err.msg);
      }
    }

    if (configs.logs.enabled) {
      console.error(err);
    }

    err.status = status;
    if (status >= 500) {
      setError5xx(err, res, configs.http);
    } else if (status >= 400) {
      setError4xx(err, res, configs.http);
    }
  }
  next();
};
