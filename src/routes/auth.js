'use strict';

const config = require('../config');
const AccessDenied = require('../models/Error').AccessDeniedError;

/**
 * @swagger
 *   securityDefinitions:
 *     BasicAuth:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 */
function BasicAuth(req, def, token, callback){
  if(config.app.apiKey===null || token===config.app.apiKey){
    return callback();
  }
  return req.res
    .status(403)
    .json(new AccessDenied());
}

module.exports = { BasicAuth };
