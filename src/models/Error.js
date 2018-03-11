'use strict';

/**
 * @swagger
 * definitions:
 *   RpcError:
 *     type: object
 *     properties:
 *       code:
 *         type: integer
 *         format: int32
 *       message:
 *         type: string
 */
class RpcError extends Error{

  constructor(message = 'error', code = 500){
    super(message);
    Object.assign(this, { code, message });
  }

  toJSON(){
    const { code, message } = this;
    return { code, message };
  }

}

class InternalError extends RpcError{
  constructor(){
    super('Internal error', 500);
  }
}

class AccessDeniedError extends RpcError{
  constructor(){
    super('Access denied', 403);
  }
}

class NoAccessError extends RpcError{
  constructor(){
    super('No access', 404);
  }
}

class NotFoundError extends RpcError{
  constructor(){
    super('Not found', 404);
  }
}

/**
 * Api Errors
 * @module Error
 */
Object.assign(exports, {
  RpcError,
  InternalError,
  AccessDeniedError,
  NoAccessError,
  NotFoundError
});
