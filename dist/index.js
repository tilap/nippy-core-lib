'use strict';

/* eslint-disable global-require */
module.exports = {
  aclFactory: require('./acl-factory.js'),
  apiResponseKoaMiddlewareHelpers: require('./koa/middlewares/api-response-helpers'),
  apiResponseKoaMiddleware: require('./koa/middlewares/api-response'),
  apiResponseRenderer: require('./api-response-renderer.js'),
  Controller: require('./controller.js'),
  errorFactory: require('./errors-factory.js'),
  KoaContextHelper: require('./koa/ctx-helpers'),
  LoggerFactory: require('./logger-factory/logger-factory'),
  LoggerFactoryConfig: require('./logger-factory/logger-factory-config'),
  mongoose: require('mongoose'),
  mongooseConnection: require('./mongoose-connection.js'),
  Router: require('./router.js'),
  Schema: require('./model-schema.js'),
  Service: require('./service.js')
};