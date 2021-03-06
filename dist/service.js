'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_EventEmitter) {
  (0, _inherits3.default)(Service, _EventEmitter);

  function Service() {
    (0, _classCallCheck3.default)(this, Service);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Service).call(this));

    _this.context = {};
    _this.logger = null;
    _this.acl = null;
    _this.serviceFactory = null;
    _this.defaultModelName = '';
    return _this;
  }

  // EventEmitter --------------------------------------------------------------


  (0, _createClass3.default)(Service, [{
    key: 'addEvent',
    value: function addEvent(name, cb) {
      this.on(name, cb.bind(this));
      return this;
    }

    // Service factory -----------------------------------------------------------

  }, {
    key: 'getServiceFactory',
    value: function getServiceFactory() {
      this.assert(this.hasServiceFactory(), new Error('No service factory provided'));
      return this.serviceFactory;
    }
  }, {
    key: 'setServiceFactory',
    value: function setServiceFactory(serviceFactory) {
      this.serviceFactory = serviceFactory;
      return this;
    }
  }, {
    key: 'hasServiceFactory',
    value: function hasServiceFactory() {
      return this.serviceFactory !== null;
    }
  }, {
    key: 'getService',
    value: function getService(serviceId) {
      this.assert(this.hasServiceFactory(), new Error('No service factory available'));
      var service = this.getServiceFactory().get(serviceId);

      // if (this.hasContextUser() && service.setContextUser) service.setContextUser(this.getContextUser());
      // if (this.hasAcl() && service.setAcl) {
      //   service.setAcl(this.getAcl());
      // }

      // if (this.hasServiceFactory() && service.setServiceFactory) service.setServiceFactory(this.getServiceFactory);
      // if (this.hasModelLoader() && service.setModelLoader) service.setModelLoader(this.getModelLoader());
      // if (this.hasLogger() && service.setLogger) service.setLogger(this.getLogger());

      return service;
    }

    // Context --------------------------------------------------------------

  }, {
    key: 'setContext',
    value: function setContext(key, value) {
      this.context[key] = value;
      return this;
    }
  }, {
    key: 'getContext',
    value: function getContext(key) {
      return this.hasContext(key) ? this.context[key] : null;
    }
  }, {
    key: 'hasContext',
    value: function hasContext(key) {
      return this.context.hasOwnProperty(key);
    }

    // Acl -----------------------------------------------------------------------

  }, {
    key: 'setAcl',
    value: function setAcl(acl) {
      this.acl = acl;
      return this;
    }
  }, {
    key: 'getAcl',
    value: function getAcl() {
      this.assert(this.hasAcl(), new Error('acl loader not set'));
      return this.acl;
    }
  }, {
    key: 'hasAcl',
    value: function hasAcl() {
      return this.acl !== null;
    }

    // Model loader --------------------------------------------------------------

  }, {
    key: 'setModelLoader',
    value: function setModelLoader(modelLoader) {
      this.modelLoader = modelLoader;
      return this;
    }
  }, {
    key: 'getModelLoader',
    value: function getModelLoader() {
      this.assert(this.hasModelLoader(), new Error('model loader not set'));
      return this.modelLoader;
    }
  }, {
    key: 'hasModelLoader',
    value: function hasModelLoader() {
      return this.modelLoader != null;
    }
  }, {
    key: 'getModel',
    value: function getModel() {
      var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (!this.modelLoader) throw new Error('No model loader set');
      var modelToLoad = name || this.defaultModelName;
      return this.modelLoader(modelToLoad);
    }

    // Logger --------------------------------------------------------------------

  }, {
    key: 'setLogger',
    value: function setLogger(logger) {
      this.logger = logger;
      return this;
    }
  }, {
    key: 'getLogger',
    value: function getLogger() {
      this.assert(this.hasLogger(), new Error('logger not set'));
      return this.logger;
    }
  }, {
    key: 'hasLogger',
    value: function hasLogger() {
      return this.logger !== null;
    }

    // Assert --------------------------------------------------------------------

  }, {
    key: 'assert',
    value: function assert(condition, error) {
      if (condition) return true;
      if (error.constructor === String) throw new Error(error);
      throw error;
    }
  }]);
  return Service;
}(_events2.default);