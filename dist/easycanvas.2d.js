/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Scene = __webpack_require__(1);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _Geometry = __webpack_require__(6);

	var _Geometry2 = _interopRequireDefault(_Geometry);

	var _Text = __webpack_require__(12);

	var _Text2 = _interopRequireDefault(_Text);

	var _ECImage = __webpack_require__(9);

	var _ECImage2 = _interopRequireDefault(_ECImage);

	var _Sprite = __webpack_require__(14);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	var _Frame = __webpack_require__(13);

	var _Frame2 = _interopRequireDefault(_Frame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Array.prototype.forEach = function (handler) {
	  var i = 0,
	      len = this.length;
	  for (; i < len; i++) {
	    handler(this[i], i, this);
	  }
	};

	var EasyCanvas = {
	  mode: '2d',

	  ver: '1.0.0',

	  Scene: _Scene2.default,

	  Geometry: _Geometry2.default,

	  Text: _Text2.default,

	  ECImage: _ECImage2.default,

	  Sprite: _Sprite2.default,

	  Frame: _Frame2.default,

	  assets: new Map(),

	  init: function init(selector) {
	    var assets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    //init container
	    var container = document.querySelector(selector);
	    if (getComputedStyle(container).position === 'static') {
	      container.style.position = 'relative';
	    }
	    EasyCanvas.container = container;

	    //load all assets
	    var loadAssets = assets.map(function (asset, i) {
	      return new Promise(function (resolve, reject) {
	        var img = new Image();
	        img.onload = function () {
	          EasyCanvas.assets.set(asset.name, img);
	          resolve();
	        };
	        img.onerror = function () {
	          reject(asset.url);
	        };
	        img.src = asset.url;
	      });
	    });

	    return Promise.all(loadAssets);
	  },

	  addScene: function addScene() {
	    return new _Scene2.default(EasyCanvas.container);
	  }

	};

	window.EC = EasyCanvas;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BackLayer = __webpack_require__(2);

	var _BackLayer2 = _interopRequireDefault(_BackLayer);

	var _ForeLayer = __webpack_require__(10);

	var _ForeLayer2 = _interopRequireDefault(_ForeLayer);

	var _FPS = __webpack_require__(11);

	var _FPS2 = _interopRequireDefault(_FPS);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	  function Scene(container) {
	    _classCallCheck(this, Scene);

	    this.backLayer = new _BackLayer2.default();
	    this.foreLayer = new _ForeLayer2.default();
	    this.fps = new _FPS2.default();
	    this.mount(container);
	    this.width = container.offsetWidth;
	    this.height = container.offsetHeight;
	  }

	  _createClass(Scene, [{
	    key: 'mount',
	    value: function mount(container) {
	      this.backLayer.mount(container);
	      this.foreLayer.mount(container);
	      this.fps.mount(container);
	    }
	  }, {
	    key: 'getRandomPoint',
	    value: function getRandomPoint() {
	      return {
	        x: Math.random() * this.width >> 0,
	        y: Math.random() * this.height >> 0
	      };
	    }
	  }, {
	    key: 'showFPS',
	    value: function showFPS() {
	      this.fps.show();
	    }
	  }, {
	    key: 'hideFPS',
	    value: function hideFPS() {
	      this.fps.hide();
	    }
	  }]);

	  return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Layer2 = __webpack_require__(3);

	var _Layer3 = _interopRequireDefault(_Layer2);

	var _Geometry = __webpack_require__(6);

	var _Geometry2 = _interopRequireDefault(_Geometry);

	var _ECImage = __webpack_require__(9);

	var _ECImage2 = _interopRequireDefault(_ECImage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BackLayer = function (_Layer) {
	  _inherits(BackLayer, _Layer);

	  function BackLayer() {
	    _classCallCheck(this, BackLayer);

	    return _possibleConstructorReturn(this, (BackLayer.__proto__ || Object.getPrototypeOf(BackLayer)).apply(this, arguments));
	  }

	  _createClass(BackLayer, [{
	    key: 'createBG',
	    value: function createBG() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$img = _ref.img,
	          img = _ref$img === undefined ? null : _ref$img,
	          _ref$fill = _ref.fill,
	          fill = _ref$fill === undefined ? '' : _ref$fill;

	      if (img) {
	        var ecImg = new _ECImage2.default({
	          name: 'bg',
	          img: img,
	          dw: this.canvas.width,
	          dh: this.canvas.height
	        });
	        this.addImage(ecImg);
	      } else if (fill) {
	        var bg = new _Geometry2.default();
	        bg.path.rect(0, 0, this.canvas.width, this.canvas.height);
	        this.addGeom(bg);
	        bg.setStyle({
	          fill: fill
	        });
	        return bg;
	      }
	    }
	  }]);

	  return BackLayer;
	}(_Layer3.default);

	exports.default = BackLayer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Transform = __webpack_require__(4);

	var _Transform2 = _interopRequireDefault(_Transform);

	var _Event = __webpack_require__(5);

	var _Event2 = _interopRequireDefault(_Event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Layer = function () {
	  function Layer() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      showAxis: false
	    };

	    _classCallCheck(this, Layer);

	    this.config = config;
	    this.event = new _Event2.default();
	    this.canvas = document.createElement('canvas');
	    this.context = this.canvas.getContext('2d');
	    this.__polyfill__transform();
	    //polyfill for context.addHitRegion, only work for added objects
	    this.__polyfill_hitRegion();
	    this.objects = new Map();
	  }

	  _createClass(Layer, [{
	    key: '__polyfill__transform',
	    value: function __polyfill__transform() {
	      var _this = this;

	      //mozCurrentTransform return array rather than svgmatrix
	      var matrix = this.context.currentTransform;
	      if (matrix) {
	        return;
	      }
	      matrix = this.context.currentTransform = new _Transform2.default();

	      var selfProps = ['rotate', 'scale', 'translate'];
	      var originSetTransform = this.context.setTransform;
	      var originTransform = this.context.transform;
	      var originSave = this.context.save;
	      var originRestore = this.context.restore;

	      this.__transform__store = [];

	      selfProps.forEach(function (prop) {
	        var origin = _this.context[prop];
	        _this.context[prop] = function () {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          origin.apply(_this.context, args);
	          matrix[prop + 'Self'].apply(_this.context.currentTransform, args);
	        };
	      });

	      this.context.setTransform = function () {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }

	        originSetTransform.apply(_this.context, args);
	        matrix.setTransform.apply(_this.context.currentTransform, args);
	      };

	      this.context.transform = function () {
	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	          args[_key3] = arguments[_key3];
	        }

	        originTransform.apply(_this.context, args);
	        var tempMatrix = new _Transform2.default();
	        tempMatrix.setTransform.apply(tempMatrix, args);
	        _this.context.currentTransform.multiply(tempMatrix);
	      };

	      this.context.save = function () {
	        originSave.apply(_this.context);
	        var tempMatrix = new _Transform2.default();
	        var _context$currentTrans = _this.context.currentTransform,
	            a = _context$currentTrans.a,
	            b = _context$currentTrans.b,
	            c = _context$currentTrans.c,
	            d = _context$currentTrans.d,
	            e = _context$currentTrans.e,
	            f = _context$currentTrans.f;

	        tempMatrix.setTransform(a, b, c, d, e, f);
	        _this.__transform__store.push(tempMatrix);
	      };

	      this.context.restore = function () {
	        originRestore.apply(_this.context);
	        var matrix = _this.__transform__store.pop();
	        if (matrix) {
	          _this.context.currentTransform = matrix;
	        }
	      };
	    }
	  }, {
	    key: '__polyfill_hitRegion',
	    value: function __polyfill_hitRegion() {
	      var _this2 = this;

	      if (this.context.addHitRegion) {
	        return;
	      }

	      this.__polyfill__regions = new Map();

	      var checkHandler = function checkHandler(e, handler) {
	        var x = e.clientX,
	            y = e.clientY;
	        var region = void 0,
	            eventObj = void 0;
	        eventObj = Object.assign({}, e);
	        _this2.__polyfill__regions.forEach(function (regionObj) {
	          var inPath = _this2.context.isPointInPath(regionObj.path, x, y);
	          if (inPath) {
	            eventObj.region = regionObj.id;
	          }
	        });
	        handler(eventObj);
	      };

	      this.context.addHitRegion = function (_ref) {
	        var path = _ref.path,
	            id = _ref.id,
	            transform = _ref.transform;

	        if (!path || !id) {
	          return console.error('path: ' + path, 'and id: ' + id, 'are both required for polyfill hit region');
	        }
	        var checkPath = new Path2D();
	        checkPath.addPath(path, transform);
	        _this2.__polyfill__regions.set(id, {
	          id: id,
	          path: checkPath
	        });
	        if (!_this2.event.__hitRegion_binded) {
	          _this2.event.__hitRegion_binded = true;
	          _this2.event.on('checkHitRegion', checkHandler);
	        }
	      };

	      this.context.clearHitRegions = function () {
	        _this2.__polyfill__regions.clear();
	        _this2.event.clear();
	        _this2.event.__hitRegion_binded = false;
	      };
	    }
	  }, {
	    key: 'mount',
	    value: function mount(container) {
	      container.appendChild(this.canvas);
	      this.canvas.width = this.config.width || container.offsetWidth;
	      this.canvas.height = this.config.width || container.offsetHeight;
	      this.width = this.canvas.width;
	      this.height = this.canvas.height;
	      this.canvas.style.cssText = 'position: absolute; top: 0; left: 0';
	      this.correctPixel();
	      this.setCoordCenter();
	    }
	  }, {
	    key: 'addGeom',
	    value: function addGeom(geom) {
	      var _this3 = this;

	      this.objects.set(geom.id, geom);

	      //proxy to observe geom style change
	      //performance ?
	      if (!geom._addGeomBinded) {
	        geom._addGeomBinded = true;

	        geom.event.on('combined', function () {
	          //remove when combine to other geometry
	          _this3.objects.delete(geom.id);
	        });
	      }
	    }
	  }, {
	    key: 'addText',
	    value: function addText(text) {
	      this.objects.set(text.id, text);
	    }
	  }, {
	    key: 'addImage',
	    value: function addImage(ecImage) {
	      this.objects.set(ecImage.id, ecImage);
	    }

	    //make line 1px

	  }, {
	    key: 'correctPixel',
	    value: function correctPixel() {
	      this.__correctPixel = 0.5;
	      this.context.setTransform(1, 0, 0, 1, this.__correctPixel, this.__correctPixel);
	    }
	  }, {
	    key: 'setCoordCenter',
	    value: function setCoordCenter() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      var matrix = this.context.currentTransform;
	      var e = matrix.e,
	          f = matrix.f;

	      this.coords = { x: x, y: y };
	      this.context.translate(x - e + this.__correctPixel, y - f + this.__correctPixel);
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.context.save();
	      this.context.setTransform(1, 0, 0, 1, 0, 0);
	      this.context.clearRect(0, 0, this.width, this.height);
	      this.context.restore();
	      this.context.clearHitRegions();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      for (var _len4 = arguments.length, objects = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        objects[_key4] = arguments[_key4];
	      }

	      if (!objects.length) {
	        objects = this.objects;
	      }

	      objects.forEach(function (object) {

	        _this4.context.save();

	        //set transform
	        var _object$transform = object.transform,
	            a = _object$transform.a,
	            b = _object$transform.b,
	            c = _object$transform.c,
	            d = _object$transform.d,
	            e = _object$transform.e,
	            f = _object$transform.f;

	        _this4.context.transform(a, b, c, d, e, f);

	        //add hit region
	        if (object.path && object.observable) {
	          _this4.context.addHitRegion({
	            path: object.path,
	            id: object.id,
	            transform: object.transform //for polyfill
	          });
	        }

	        object.render(_this4.context);

	        _this4.context.restore();
	      });
	    }

	    //user events

	  }, {
	    key: 'on',
	    value: function on(type, handler) {
	      var _this5 = this;

	      if (type === 'drag') {
	        var _ret = function () {
	          var startType = ['mousedown', 'touchstart'];
	          var moveType = ['mousemove', 'touchmove'];
	          var endType = ['mouseup', 'touchend'];
	          var targetId = null;
	          var sx = void 0,
	              sy = void 0,
	              ex = void 0,
	              ey = void 0;
	          startType.forEach(function (type) {
	            _this5.canvas.addEventListener(type, function (e) {
	              if (!_this5.__polyfill__regions) {
	                targetId = e.region;
	              } else {
	                _this5.event.emit('checkHitRegion', e, function (evt) {
	                  targetId = evt.region;
	                });
	              }
	              sx = e.clientX;
	              sy = e.clientY;
	            });
	          });

	          endType.forEach(function (type) {
	            _this5.canvas.addEventListener(type, function (e) {
	              targetId = null;
	            });
	          });

	          moveType.forEach(function (type) {
	            _this5.canvas.addEventListener(type, function (e) {
	              if (targetId) {
	                ex = e.clientX;
	                ey = e.clientY;
	                e.dx = ex - sx;
	                e.dy = ey - sy;
	                sx = ex;
	                sy = ey;
	                handler(e, targetId);
	              }
	            });
	          });

	          return {
	            v: void 0
	          };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }

	      var wrapHandler = function wrapHandler(e) {
	        if (!_this5.__polyfill__regions) {
	          return handler(e);
	        } else {
	          _this5.event.emit('checkHitRegion', e, handler);
	        }
	      };

	      this.canvas.addEventListener(type, wrapHandler);
	    }
	  }, {
	    key: 'off',
	    value: function off(type) {
	      this.canvas.removeEventListener(type);
	    }
	  }]);

	  return Layer;
	}();

	exports.default = Layer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//a polyfill for extending dommatrix fns to svgmatrix

	var cloneTransform = function cloneTransform(origin, dist) {
	  dist.a = origin.a;
	  dist.b = origin.b;
	  dist.c = origin.c;
	  dist.d = origin.d;
	  dist.e = origin.e;
	  dist.f = origin.f;
	};

	var regTransOrigin = /(rotate|scale)Self/;

	var polyfillTransformSelfs = function polyfillTransformSelfs() {
	  var proto = SVGMatrix.prototype;

	  var selfProps = ["translate", "scale", "rotate", "skewX", "skewY", "flipX", "flipY"];

	  selfProps.forEach(function (prop) {
	    proto[prop + 'Self'] = function () {
	      if (this.__originChanged && /rotate|scale/.test(prop)) {
	        this.translateSelf(this.origin[0], this.origin[1]);
	      }

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      var origin = this[prop].apply(this, args);
	      if (this.__originChanged && /rotate|scale/.test(prop)) {
	        origin.translateSelf(-this.origin[0], -this.origin[1]);
	      }
	      cloneTransform(origin, this);
	      return this;
	    };
	  });

	  //add setTransform 
	  proto.clone = function (origin) {
	    cloneTransform(origin, this);
	    return this;
	  };

	  proto.setTransform = function (a, b, c, d, e, f) {
	    var args = { a: a, b: b, c: c, d: d, e: e, f: f };
	    cloneTransform(args, this);
	    return this;
	  };
	};

	var Transform = function Transform() {
	  _classCallCheck(this, Transform);

	  var self = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();

	  self.setOrigin = function (x, y) {
	    self.__originChanged = true;
	    self.origin = [x, y];
	  };

	  //在性能测试方面svgmatrix与dommatrix没有显著的区别，更多的区别是在dommatrix多了一些封装的方法以及对于3d的支持
	  //且2dcontext只支持svgmatrix，因此此处只扩展封装部分self方法
	  //polyfill dommatrix methods to svgmatrix
	  polyfillTransformSelfs();
	  return self;
	};

	exports.default = Transform;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//code from http://www.datchley.name/es6-eventemitter/

	var Event = function () {
	  function Event() {
	    _classCallCheck(this, Event);

	    this.listeners = new Map();
	  }

	  _createClass(Event, [{
	    key: "on",
	    value: function on(label, callback) {
	      this.listeners.has(label) || this.listeners.set(label, []);
	      this.listeners.get(label).push(callback);
	    }
	  }, {
	    key: "remove",
	    value: function remove(label, callback) {
	      var listeners = this.listeners.get(label),
	          index = void 0;

	      if (listeners && listeners.length) {
	        index = listeners.indexOf(callback);
	        if (index > -1) {
	          listeners.splice(index, 1);
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.listeners.clear();
	    }
	  }, {
	    key: "emit",
	    value: function emit(label) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var listeners = this.listeners.get(label);
	      if (listeners && listeners.length) {
	        listeners.forEach(function (listener) {
	          listener.apply(undefined, args);
	        });
	        return true;
	      }
	      return false;
	    }
	  }]);

	  return Event;
	}();

	exports.default = Event;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ECObject2 = __webpack_require__(7);

	var _ECObject3 = _interopRequireDefault(_ECObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var geomIndex = 0;

	var Geometry = function (_ECObject) {
	  _inherits(Geometry, _ECObject);

	  function Geometry() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$observable = _ref.observable,
	        observable = _ref$observable === undefined ? false : _ref$observable;

	    _classCallCheck(this, Geometry);

	    var _this = _possibleConstructorReturn(this, (Geometry.__proto__ || Object.getPrototypeOf(Geometry)).call(this));

	    _this.id = '__geom__' + geomIndex++;
	    _this.path = new Path2D();
	    _this.children = [];
	    _this.observable = observable;
	    _this.setStyle();
	    return _this;
	  }

	  _createClass(Geometry, [{
	    key: 'combine',
	    value: function combine(geom) {
	      this.path.addPath(geom.path, geom.transform);
	      this.children.push(geom);
	      geom.event.emit('combined');
	    }
	  }, {
	    key: 'updateCombine',
	    value: function updateCombine() {
	      var _this2 = this;

	      this.path = new Path2D();
	      this.children.forEach(function (geom) {
	        _this2.path.addPath(geom.path, geom.transform);
	      });
	    }
	  }, {
	    key: 'setStyle',
	    value: function setStyle() {
	      var _this3 = this;

	      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref2$stroke = _ref2.stroke,
	          stroke = _ref2$stroke === undefined ? '' : _ref2$stroke,
	          _ref2$fill = _ref2.fill,
	          fill = _ref2$fill === undefined ? '' : _ref2$fill,
	          _ref2$rules = _ref2.rules,
	          rules = _ref2$rules === undefined ? {} : _ref2$rules;

	      var keys = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'filter', //Warning: filter will obviously lower performance
	      'lineWidth', 'lineCap', 'lineJoin', 'miterLimit', 'globalAlpha'];
	      this.style = this.style || { rules: {} };
	      if (stroke) {
	        this.style.stroke = stroke;
	      }
	      if (fill) {
	        this.style.fill = fill;
	      }
	      keys.forEach(function (key) {
	        if (rules[key]) {
	          _this3.style.rules[key] = rules[key];
	        }
	      });
	      this.event.emit('styleUpdate');
	    }
	  }, {
	    key: 'render',
	    value: function render(context) {
	      var _style = this.style,
	          stroke = _style.stroke,
	          fill = _style.fill,
	          rules = _style.rules;


	      for (var rule in rules) {
	        context[rule] = rules[rule];
	      }

	      if (stroke) {
	        context.strokeStyle = stroke;
	        context.stroke(this.path);
	      }

	      if (fill) {
	        context.fillStyle = fill;
	        context.fill(this.path);
	      }
	    }
	  }]);

	  return Geometry;
	}(_ECObject3.default);

	exports.default = Geometry;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Transform = __webpack_require__(4);

	var _Transform2 = _interopRequireDefault(_Transform);

	var _Motion = __webpack_require__(8);

	var _Motion2 = _interopRequireDefault(_Motion);

	var _Event = __webpack_require__(5);

	var _Event2 = _interopRequireDefault(_Event);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ECObject = function () {
	  function ECObject() {
	    _classCallCheck(this, ECObject);

	    this.event = new _Event2.default();
	    this.transform = new _Transform2.default();
	    this.motion = new _Motion2.default();
	  }

	  _createClass(ECObject, [{
	    key: 'updatePos',
	    value: function updatePos() {
	      this.motion.update();
	      var vel = this.motion.vel;
	      if (vel[0] === 0 && vel[1] === 0) {
	        return;
	      }
	      this.translate(vel[0], vel[1]);
	    }
	  }, {
	    key: 'scale',
	    value: function scale() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      this.transform.scaleSelf.apply(this.transform, args);
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      this.transform.rotateSelf.apply(this.transform, args);
	    }
	  }, {
	    key: 'translate',
	    value: function translate() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      this.transform.translateSelf.apply(this.transform, args);
	    }
	  }, {
	    key: 'flipX',
	    value: function flipX() {
	      this.transform.flipXSelf();
	    }
	  }, {
	    key: 'flipY',
	    value: function flipY() {
	      this.transform.flipYSelf();
	    }
	  }, {
	    key: 'transformOrigin',
	    value: function transformOrigin(x, y) {
	      this.transform.setOrigin(x, y);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      //null
	    }
	  }, {
	    key: 'pos',
	    get: function get() {
	      return [this.transform.e, this.transform.f];
	    },
	    set: function set() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0],
	          _ref2 = _slicedToArray(_ref, 2),
	          x = _ref2[0],
	          y = _ref2[1];

	      var pos = this.pos;
	      var dx = x - pos[0];
	      var dy = y - pos[1];
	      if (dx === 0 && dy === 0) {
	        return;
	      }
	      this.translate(dx, dy);
	    }
	  }]);

	  return ECObject;
	}();

	exports.default = ECObject;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Motion = function () {
	  function Motion() {
	    _classCallCheck(this, Motion);

	    var _motion = new Float32Array(6);
	    this.pos = new Float32Array(_motion.buffer, 0, 2);
	    this.vel = new Float32Array(_motion.buffer, 8, 2);
	    this.accel = new Float32Array(_motion.buffer, 16, 2);
	  }

	  _createClass(Motion, [{
	    key: "setVel",
	    value: function setVel() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0],
	          _ref2 = _slicedToArray(_ref, 2),
	          x = _ref2[0],
	          y = _ref2[1];

	      this.vel[0] = x;
	      this.vel[1] = y;
	    }
	  }, {
	    key: "setAccel",
	    value: function setAccel() {
	      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0],
	          _ref4 = _slicedToArray(_ref3, 2),
	          x = _ref4[0],
	          y = _ref4[1];

	      this.accel[0] = x;
	      this.accel[1] = y;
	    }

	    //update velocity per frame

	  }, {
	    key: "update",
	    value: function update() {
	      this.vel[0] += this.accel[0];
	      this.vel[1] += this.accel[1];
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
	    }
	  }]);

	  return Motion;
	}();

	exports.default = Motion;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ECObject2 = __webpack_require__(7);

	var _ECObject3 = _interopRequireDefault(_ECObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var imageIndex = 0;

	var ECImage = function (_ECObject) {
	  _inherits(ECImage, _ECObject);

	  function ECImage(_ref) {
	    var _ref$name = _ref.name,
	        name = _ref$name === undefined ? '' : _ref$name,
	        _ref$img = _ref.img,
	        img = _ref$img === undefined ? null : _ref$img,
	        _ref$sx = _ref.sx,
	        sx = _ref$sx === undefined ? 0 : _ref$sx,
	        _ref$sy = _ref.sy,
	        sy = _ref$sy === undefined ? 0 : _ref$sy,
	        _ref$sw = _ref.sw,
	        sw = _ref$sw === undefined ? img.width - sx : _ref$sw,
	        _ref$sh = _ref.sh,
	        sh = _ref$sh === undefined ? img.height - sy : _ref$sh,
	        _ref$dx = _ref.dx,
	        dx = _ref$dx === undefined ? 0 : _ref$dx,
	        _ref$dy = _ref.dy,
	        dy = _ref$dy === undefined ? 0 : _ref$dy,
	        _ref$dw = _ref.dw,
	        dw = _ref$dw === undefined ? sw : _ref$dw,
	        _ref$dh = _ref.dh,
	        dh = _ref$dh === undefined ? sh : _ref$dh,
	        _ref$observable = _ref.observable,
	        observable = _ref$observable === undefined ? false : _ref$observable;

	    _classCallCheck(this, ECImage);

	    var _this = _possibleConstructorReturn(this, (ECImage.__proto__ || Object.getPrototypeOf(ECImage)).call(this));

	    _this.id = '__image__' + imageIndex++;
	    var path = new Path2D();
	    path.rect(dx, dy, dw, dh);
	    Object.assign(_this, { name: name, img: img, sx: sx, sy: sy, sw: sw, sh: sh, dx: dx, dy: dy, dw: dw, dh: dh, path: path, observable: observable });
	    return _this;
	  }

	  _createClass(ECImage, [{
	    key: 'render',
	    value: function render(context) {
	      var img = this.img,
	          sx = this.sx,
	          sy = this.sy,
	          sw = this.sw,
	          sh = this.sh,
	          dx = this.dx,
	          dy = this.dy,
	          dw = this.dw,
	          dh = this.dh;


	      context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
	    }
	  }]);

	  return ECImage;
	}(_ECObject3.default);

	exports.default = ECImage;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Layer2 = __webpack_require__(3);

	var _Layer3 = _interopRequireDefault(_Layer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ForeLayer = function (_Layer) {
	  _inherits(ForeLayer, _Layer);

	  function ForeLayer() {
	    _classCallCheck(this, ForeLayer);

	    return _possibleConstructorReturn(this, (ForeLayer.__proto__ || Object.getPrototypeOf(ForeLayer)).call(this));
	  }

	  return ForeLayer;
	}(_Layer3.default);

	exports.default = ForeLayer;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Geometry = __webpack_require__(6);

	var _Geometry2 = _interopRequireDefault(_Geometry);

	var _Text = __webpack_require__(12);

	var _Text2 = _interopRequireDefault(_Text);

	var _Layer2 = __webpack_require__(3);

	var _Layer3 = _interopRequireDefault(_Layer2);

	var _Frame = __webpack_require__(13);

	var _Frame2 = _interopRequireDefault(_Frame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var textRate = 50; //40frame
	var refreshRate = 2; //2frame

	var FPS = function (_Layer) {
	  _inherits(FPS, _Layer);

	  function FPS() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      width: 100,
	      height: 100
	    };

	    _classCallCheck(this, FPS);

	    var _this = _possibleConstructorReturn(this, (FPS.__proto__ || Object.getPrototypeOf(FPS)).call(this));

	    Object.assign(_this.config, config);

	    _this._lastTick = +new Date();
	    _this._tick = 0;
	    _this._fps = 60;
	    _this._data = new Uint8Array(100);
	    _this.box = new _Geometry2.default();
	    _this.text = new _Text2.default();

	    [].fill.call(_this._data, 60);
	    _this.text.content = _this._fps + ' fps';
	    _this.box.path.rect(0, 0, 100, 100);

	    _this.box.setStyle({
	      fill: '#39393c'
	    });
	    _this.text.setStyle({
	      fill: '#05ed05'
	    });
	    return _this;
	  }

	  _createClass(FPS, [{
	    key: '_renderLines',
	    value: function _renderLines() {
	      var path = new Path2D();
	      var data = this._data;
	      var len = data.byteLength;
	      // round by 4, to make more smoothing curve
	      path.moveTo(0, 100 - data[0] >> 2 << 2);
	      for (var i = 1; i < len; i++) {
	        path.lineTo(i, 100 - data[i] >> 2 << 2);
	      };
	      this.context.save();
	      this.context.strokeStyle = '#05ed05';
	      this.context.stroke(path);
	      this.context.restore();
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      var _this2 = this;

	      this.frame = new _Frame2.default(function () {
	        _this2.update();
	        _this2.render(_this2.box, _this2.text);
	        _this2._renderLines();
	      });
	      this.frame.start();
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.frame.stop();
	      this.clear();
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this._tick++;

	      //update fps
	      if (this._tick % refreshRate === 0) {
	        this._curTick = +new Date();
	        this._fps = (1000 / (this._curTick - this._lastTick) * refreshRate).toFixed(1);
	        this._lastTick = this._curTick;
	      }

	      //update points
	      var _old = new Uint8Array(this._data.buffer, 1);
	      this._data.set(_old);
	      this._data[99] = this._fps;

	      if (this._tick % textRate === 0) {
	        this.text.content = this._fps + ' fps';
	      }
	    }
	  }]);

	  return FPS;
	}(_Layer3.default);

	exports.default = FPS;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ECObject2 = __webpack_require__(7);

	var _ECObject3 = _interopRequireDefault(_ECObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*todos:
	line-height & auto line-break(after over maxWidth): there is a way to loop measuretext width, but performance?
	*/

	var textIndex = 0;

	var Text = function (_ECObject) {
	  _inherits(Text, _ECObject);

	  function Text() {
	    var rawText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    _classCallCheck(this, Text);

	    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

	    _this.id = '__text__' + textIndex++;
	    _this._rawText = rawText;
	    _this.setStyle();
	    return _this;
	  }

	  _createClass(Text, [{
	    key: 'setStyle',
	    value: function setStyle() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$stroke = _ref.stroke,
	          stroke = _ref$stroke === undefined ? '' : _ref$stroke,
	          _ref$fill = _ref.fill,
	          fill = _ref$fill === undefined ? '' : _ref$fill,
	          _ref$rules = _ref.rules,
	          rules = _ref$rules === undefined ? {} : _ref$rules;

	      var defaultRules = {
	        shadowOffsetX: '',
	        shadowOffsetY: '',
	        shadowBlur: '',
	        shadowColor: '',
	        filter: '',
	        fontSize: 10,
	        fontFamily: 'sans-serif',
	        lineHeight: 1,
	        textAlign: '',
	        textBaseline: 'top', //default start as the left-top corn, same as dom
	        direction: '',
	        maxWidth: 9999
	      };
	      this.style = this.style || { rules: defaultRules };
	      Object.assign(this.style.rules, rules);

	      this.style.rules.fontSize = parseInt(this.style.rules.fontSize);
	      this.style.rules.font = this.style.rules.fontSize + 'px ' + this.style.rules.fontFamily;

	      if (stroke) {
	        this.style.stroke = stroke;
	      }
	      if (fill) {
	        this.style.fill = fill;
	      }

	      this.event.emit('styleUpdate');
	    }
	  }, {
	    key: 'render',
	    value: function render(context) {
	      var _style = this.style,
	          stroke = _style.stroke,
	          fill = _style.fill,
	          rules = _style.rules;


	      for (var rule in rules) {
	        context[rule] = rules[rule];
	      }

	      //multi line
	      this.content.forEach(function (content, i) {
	        //emulate line-height 
	        if (i > 0) {
	          context.translate(0, rules.fontSize * rules.lineHeight);
	        }

	        if (stroke) {
	          context.strokeStyle = stroke;
	          context.strokeText(content, 0, 0, rules.maxWidth);
	        }

	        if (fill) {
	          context.fillStyle = fill;
	          context.fillText(content, 0, 0, rules.maxWidth);
	        }
	      });
	    }
	  }, {
	    key: 'content',
	    get: function get() {
	      return this._rawText.split(/\n|\<br\>/);
	    },
	    set: function set() {
	      var rawText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      this._rawText = rawText;
	    }
	  }]);

	  return Text;
	}(_ECObject3.default);

	exports.default = Text;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//animation frame
	var frames = [];

	var Frame = function () {
	  function Frame(handler, rate) {
	    var _this = this;

	    _classCallCheck(this, Frame);

	    if (typeof handler !== 'function') {
	      throw new Error('request handler must be a function');
	    }
	    if (rate && !isNaN(rate)) {
	      this.fpsInterval = 1000 / rate;
	    }
	    this.handler = function () {
	      _this.requestId = requestAnimationFrame(_this.handler);
	      if (!_this.fpsInterval) {
	        handler();
	      } else {

	        //throttle to a specific frame rate
	        var now = Date.now();

	        if (now - _this.lastTime > _this.fpsInterval) {
	          _this.lastTime = now;
	          handler();
	        }
	      }
	    };
	    this.requestId = null;
	    frames.push(this);
	  }

	  _createClass(Frame, [{
	    key: 'start',
	    value: function start(flagAll) {
	      if (this.requestId) {
	        if (!flagAll) {
	          console.log('this frame already started');
	        }
	        return;
	      }
	      this.lastTime = Date.now();
	      this.requestId = requestAnimationFrame(this.handler);
	    }
	  }, {
	    key: 'stop',
	    value: function stop(flagAll) {
	      if (!this.requestId) {
	        if (!flagAll) {
	          console.log('this frame already stoped');
	        }
	        return;
	      }
	      cancelAnimationFrame(this.requestId);
	      this.requestId = null;
	    }
	  }], [{
	    key: 'startAll',
	    value: function startAll() {
	      frames.forEach(function (frame) {
	        frame.start(true);
	      });
	    }
	  }, {
	    key: 'stopAll',
	    value: function stopAll() {
	      frames.forEach(function (frame) {
	        frame.stop(true);
	      });
	    }
	  }]);

	  return Frame;
	}();

	exports.default = Frame;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ECImage2 = __webpack_require__(9);

	var _ECImage3 = _interopRequireDefault(_ECImage2);

	var _Frame = __webpack_require__(13);

	var _Frame2 = _interopRequireDefault(_Frame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var spriteIndex = 0;

	var Sprite = function (_ECImage) {
	  _inherits(Sprite, _ECImage);

	  function Sprite() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$name = _ref.name,
	        name = _ref$name === undefined ? '' : _ref$name,
	        _ref$img = _ref.img,
	        img = _ref$img === undefined ? null : _ref$img,
	        _ref$width = _ref.width,
	        width = _ref$width === undefined ? 0 : _ref$width,
	        _ref$height = _ref.height,
	        height = _ref$height === undefined ? 0 : _ref$height,
	        _ref$cols = _ref.cols,
	        cols = _ref$cols === undefined ? 1 : _ref$cols,
	        _ref$rows = _ref.rows,
	        rows = _ref$rows === undefined ? 1 : _ref$rows,
	        _ref$frames = _ref.frames,
	        frames = _ref$frames === undefined ? 0 : _ref$frames,
	        _ref$frameRate = _ref.frameRate,
	        frameRate = _ref$frameRate === undefined ? 60 : _ref$frameRate,
	        _ref$autoStart = _ref.autoStart,
	        autoStart = _ref$autoStart === undefined ? true : _ref$autoStart,
	        _ref$loop = _ref.loop,
	        loop = _ref$loop === undefined ? Infinity : _ref$loop,
	        _ref$observable = _ref.observable,
	        observable = _ref$observable === undefined ? true : _ref$observable;

	    _classCallCheck(this, Sprite);

	    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, { name: name, img: img, observable: observable }));

	    if (!img) {
	      return _possibleConstructorReturn(_this);
	    }

	    _this.width = width || img.width / cols >> 0;
	    _this.height = height || img.height / rows >> 0;

	    if (!_this.width || !_this.height) {
	      return _possibleConstructorReturn(_this);
	    }

	    _this.id = '__sprite__' + spriteIndex++;
	    _this.name = name || _this.id;
	    _this.index = 0;
	    _this.cols = cols;
	    _this.rows = rows;
	    _this.frames = frames || cols * rows;
	    _this.frameRate = frameRate;
	    _this.loop = loop;

	    //use unique canvas for better performance
	    _this.canvas = document.createElement('canvas');
	    _this.context = _this.canvas.getContext('2d');
	    _this.canvas.width = _this.width;
	    _this.canvas.height = _this.height;
	    _this.img = _this.canvas;
	    _this._img = img;
	    _this.sw = _this.dw = _this.width;
	    _this.sh = _this.dh = _this.height;

	    //set transform origin center
	    _this.transformOrigin(_this.width / 2, _this.height / 2);

	    //animate
	    _this.frame = new _Frame2.default(_this.update.bind(_this), _this.frameRate);
	    if (autoStart) {
	      _this.frame.start();
	    }
	    return _this;
	  }

	  _createClass(Sprite, [{
	    key: 'renderSprite',
	    value: function renderSprite() {
	      var row = this.index / this.cols >> 0;
	      var col = this.index % this.cols;
	      var sw = this._img.width / this.cols >> 0;
	      var sh = this._img.height / this.rows >> 0;
	      this.context.clearRect(0, 0, this.width, this.height); //clear canvas
	      this.context.drawImage(this._img, col * sw, row * sh, sw, sh, 0, 0, this.width, this.height);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.loop !== Infinity && this.index === this.frames - 1) {
	        this.loop--;
	        if (this.loop <= 0) {
	          this.frame.stop();
	          this.event.emit('loopEnd');
	          return;
	        }
	      }
	      this.renderSprite();
	      this.index = (this.index + 1) % this.frames;
	      this.event.emit('update');
	    }
	  }]);

	  return Sprite;
	}(_ECImage3.default);

	exports.default = Sprite;

/***/ }
/******/ ]);