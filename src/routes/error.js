'use strict';

const env = require('../config').env;
const Error = require('../models/Error');

function handler(err, req, res, next) {
  let error = err;
  let isError = false;
  for (let errname in Error) {
    if (err instanceof Error[errname]) {
      isError = true;
      break;
    }
  }

  if (!isError) {
    console.log(err);
    error = new Error.InternalError();
  }

  res
    .status(error.code)
    .json(error);
}

module.exports = handler;