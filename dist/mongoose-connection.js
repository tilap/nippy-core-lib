'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function getMongoConnection() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var url = _ref.url;
  var id = _ref.id;
  var _ref$logger = _ref.logger;
  var logger = _ref$logger === undefined ? console : _ref$logger;
  var _ref$retry = _ref.retry;
  var retry = _ref$retry === undefined ? 1000 : _ref$retry;

  var connect = function connect(url) {
    return _mongoose2.default.createConnection(url, function (err) {
      if (err) setTimeout(function () {
        return connect(url);
      }, retry);
    });
  };

  var db = connect(url);
  db.on('connecting', function () {
    return logger.info('connecting...');
  });
  db.on('error', function (err) {
    return logger.error('error: ' + (err.message || err));
  });
  db.on('connected', function () {
    return logger.info('connected');
  });
  db.once('open', function () {
    return logger.info('connection opened');
  });
  db.on('reconnected', function () {
    return logger.info('reconnected');
  });
  db.on('disconnected', function () {
    return logger.warn('disconnected, will retry every ' + retry + 'ms');
  });
  return db;
}; /*
    * A simple mongoose db connection with log and connection retry on error
    */