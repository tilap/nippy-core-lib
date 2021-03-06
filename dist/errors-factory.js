'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _errorExtend = require('error-extend');

var _errorExtend2 = _interopRequireDefault(_errorExtend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config) {
  var errors = {};
  (0, _keys2.default)(config).forEach(function (errorClassname) {
    var cfg = config[errorClassname];

    if (!cfg.hasOwnProperty('code') || !cfg.hasOwnProperty('message')) {
      throw new Error('Configuration error: each error configuration object requires both "code" and "message" properties');
    }
    var code = cfg.code;
    var defaultMessage = cfg.message;
    var details = cfg.hasOwnProperty('details') && cfg.details === true;

    var init = false;
    if (details) {
      init = function init() {
        var _this = this;

        // Details storage property
        this.details = {};

        // Details setter
        this.addDetail = function () {
          var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

          var property = _ref.property;
          var _ref$kind = _ref.kind;
          var kind = _ref$kind === undefined ? '' : _ref$kind;
          var _ref$message = _ref.message;
          var message = _ref$message === undefined ? '' : _ref$message;
          var _ref$name = _ref.name;
          var name = _ref$name === undefined ? errorClassname : _ref$name;
          var _ref$value = _ref.value;
          var value = _ref$value === undefined ? '' : _ref$value;
          var _ref$properties = _ref.properties;
          var properties = _ref$properties === undefined ? {} : _ref$properties;

          _this.details[property] = {
            message: message,
            name: name,
            kind: kind,
            path: property,
            value: value,
            properties: properties
          };
        };

        // Init from constructor if any detail
        for (var k = 1; k < arguments.length; k++) {
          this.addDetail(arguments[k]);
        }
      };
    }

    errors[errorClassname] = (0, _errorExtend2.default)({ name: errorClassname, code: code, defaultMessage: defaultMessage, init: init });
  });

  return errors;
}; /*
    * Build custom errors from a descriptor config file and optionally add errors details with
    * same format as mongoose error for consistence
    *
    * @example config file
    * ```
    * {
    *   UnauthorizedError: {
    *     code: 401,
    *     message: 'you need to be logged in to access this ressource',
    *   },
    *   ForbiddenError: {
    *     code: 403,
    *     message: 'you are not allow to access this ressource',
    *     details: true,
    *   },
    * }
    * ```
    */