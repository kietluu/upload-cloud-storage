'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _google = require('./google');

var _google2 = _interopRequireDefault(_google);

var _s = require('./s3');

var _s2 = _interopRequireDefault(_s);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var init = function init(config) {
	var type = config.type,
	    rest = _objectWithoutProperties(config, ['type']);

	switch (type) {

		case 'google':
			return new _google2.default(rest);

		case 's3':
			return new _s2.default(rest);

		default:
			return {
				upload: function upload() {
					return Promise.reject('Please make sure type is "google" or "s3"');
				}
			};
	}
};

exports.default = { init: init };