'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('@google-cloud/storage');

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleStorage = function () {
	function GoogleStorage(config) {
		var _this = this;

		_classCallCheck(this, GoogleStorage);

		this.config = null;
		this.storage = null;
		this.bucket = null;

		this.exist = function (filepath) {

			return _fs2.default.existsSync(filepath);
		};

		this.upload = function (filepath, opt) {

			return new Promise(function (resolve, reject) {

				if (!_this.exist(filepath)) return reject('"' + filepath + '" does not exist');

				var _ref = opt || {},
				    dest = _ref.dest,
				    newName = _ref.newName,
				    deleteSource = _ref.deleteSource,
				    contentType = _ref.contentType,
				    _ref$gzip = _ref.gzip,
				    gzip = _ref$gzip === undefined ? true : _ref$gzip;

				if (!dest) dest = '';

				if (!newName) newName = _this.getName(filepath);

				if (!contentType) contentType = _mimeTypes2.default.lookup(filepath);

				var destFileName = (dest + '/' + newName).replace(/\/+/g, '/');

				var writeStreamOpts = {
					gzip: gzip,
					metadata: {
						contentType: contentType
					}
				};

				var writeStream = _this.createWriteStream(destFileName, writeStreamOpts);

				var readStream = _this.createReadStream(filepath);

				readStream.pipe(writeStream);
				writeStream.on('finish', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
					var _ref3, _ref4, metadata;

					return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:

									if (deleteSource) {
										_fs2.default.unlink(filepath, function (err) {
											if (err) console.log(err);
										});
									}

									_context.next = 3;
									return _this.file.getMetadata();

								case 3:
									_ref3 = _context.sent;
									_ref4 = _slicedToArray(_ref3, 1);
									metadata = _ref4[0];

									resolve(metadata);

								case 7:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, _this);
				}))).on('error', function (err) {

					reject(err);
				});
			});
		};

		this.createReadStream = function (filepath) {
			return _fs2.default.createReadStream(filepath);
		};

		this.getName = function (filepath) {

			return filepath.split('/').pop();
		};

		this.config = config;
		this.init();
	}

	_createClass(GoogleStorage, [{
		key: 'init',
		value: function init() {
			var _config = this.config,
			    projectId = _config.projectId,
			    keyFilename = _config.keyFilename,
			    bucketName = _config.bucketName;


			this.storage = new _storage.Storage({
				projectId: projectId,
				keyFilename: keyFilename
			});

			this.bucket = this.storage.bucket(bucketName);
		}
	}, {
		key: 'createWriteStream',
		value: function createWriteStream(dest, opt) {

			this.file = this.bucket.file(dest);

			return this.file.createWriteStream(opt);
		}
	}]);

	return GoogleStorage;
}();

exports.default = GoogleStorage;