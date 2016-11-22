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

	var _Geometry = __webpack_require__(4);

	var _Geometry2 = _interopRequireDefault(_Geometry);

	var _Text = __webpack_require__(9);

	var _Text2 = _interopRequireDefault(_Text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EasyCanvas = {
	  mode: '2d',

	  ver: '1.0.0',

	  Scene: _Scene2.default,

	  Geometry: _Geometry2.default,

	  Text: _Text2.default,

	  assets: [],

	  init: function init(selector) {
	    var urls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    //init container
	    var container = document.querySelector(selector);
	    if (getComputedStyle(container).position === 'static') {
	      container.style.position = 'relative';
	    }
	    EasyCanvas.container = container;

	    //load all assets
	    var loadUrls = urls.map(function (url, i) {
	      return new Promise(function (resolve, reject) {
	        var img = new Image();
	        img.onload = function () {
	          EasyCanvas.assets[i] = img;
	          resolve();
	        };
	        img.onerror = function () {
	          reject(img.src);
	        };
	        img.src = url;
	      });
	    });

	    return Promise.all(loadUrls);
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

	var _ForeLayer = __webpack_require__(8);

	var _ForeLayer2 = _interopRequireDefault(_ForeLayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	  function Scene(container) {
	    _classCallCheck(this, Scene);

	    this.backLayer = new _BackLayer2.default();
	    this.foreLayer = new _ForeLayer2.default();
	    this.mount(container);
	    this.width = container.offsetWidth;
	    this.height = container.offsetHeight;
	  }

	  _createClass(Scene, [{
	    key: 'mount',
	    value: function mount(container) {
	      this.backLayer.mount(container);
	      this.foreLayer.mount(container);
	    }
	  }, {
	    key: 'getRandomPoint',
	    value: function getRandomPoint() {
	      return {
	        x: Math.random() * this.width >> 0,
	        y: Math.random() * this.height >> 0
	      };
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

	var _Geometry = __webpack_require__(4);

	var _Geometry2 = _interopRequireDefault(_Geometry);

	var _FPS = __webpack_require__(7);

	var _FPS2 = _interopRequireDefault(_FPS);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BackLayer = function (_Layer) {
	  _inherits(BackLayer, _Layer);

	  function BackLayer() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { showFPS: true };

	    _classCallCheck(this, BackLayer);

	    var _this = _possibleConstructorReturn(this, (BackLayer.__proto__ || Object.getPrototypeOf(BackLayer)).call(this));

	    Object.assign(_this.config, config);
	    if (_this.config.showFPS) {
	      _this.fps = new _FPS2.default();
	      _this.addGeom(_this.fps);
	    }
	    return _this;
	  }

	  _createClass(BackLayer, [{
	    key: 'createBG',
	    value: function createBG() {
	      var bg = new _Geometry2.default();
	      bg.path.rect(0, 0, this.canvas.width, this.canvas.height);
	      this.addGeom(bg);
	      return bg;
	    }
	  }]);

	  return BackLayer;
	}(_Layer3.default);

	exports.default = BackLayer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Layer = function () {
	  function Layer() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      showAxis: false
	    };

	    _classCallCheck(this, Layer);

	    this.config = config;
	    this.canvas = document.createElement('canvas');
	    this.context = this.canvas.getContext('2d');
	    this.geoms = [];
	    this.texts = [];
	  }

	  _createClass(Layer, [{
	    key: 'mount',
	    value: function mount(container) {
	      container.appendChild(this.canvas);
	      this.canvas.width = container.offsetWidth;
	      this.canvas.height = container.offsetHeight;
	      this.canvas.style.cssText = 'position: absolute; top: 0; left: 0';
	      this.correctPixel();
	      this.setCoordCenter();
	    }
	  }, {
	    key: 'addGeom',
	    value: function addGeom() {
	      for (var _len = arguments.length, geoms = Array(_len), _key = 0; _key < _len; _key++) {
	        geoms[_key] = arguments[_key];
	      }

	      this.geoms = this.geoms.concat(geoms);
	    }
	  }, {
	    key: 'addText',
	    value: function addText() {
	      for (var _len2 = arguments.length, texts = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        texts[_key2] = arguments[_key2];
	      }

	      this.texts = this.texts.concat(texts);
	    }

	    //make line 1px

	  }, {
	    key: 'correctPixel',
	    value: function correctPixel() {
	      this.context.translate(.5, .5);
	    }
	  }, {
	    key: 'setCoordCenter',
	    value: function setCoordCenter() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	      this.coords = { x: x, y: y };
	      this.context.translate(x, y);
	    }
	  }, {
	    key: 'renderAxis',
	    value: function renderAxis() {
	      this.context.beginPath();
	      this.context.moveTo(-this.coords.x, 0);
	      this.context.lineTo(this.canvas.width - this.coords.x, 0);
	      this.context.moveTo(0, -this.coords.y);
	      this.context.lineTo(0, this.canvas.height - this.coords.y);
	      this.context.stroke();
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      //just set size of canvas make context clear
	      var transform = this.context.currentTransform;
	      this.canvas.width = this.canvas.width;
	      this.context.currentTransform = transform;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.showAxis) {
	        this.renderAxis();
	      }
	      this.renderGeoms();
	      this.renderTexts();
	    }
	  }, {
	    key: 'renderGeoms',
	    value: function renderGeoms() {
	      var _this = this;

	      for (var _len3 = arguments.length, geoms = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        geoms[_key3] = arguments[_key3];
	      }

	      if (!geoms.length) {
	        geoms = this.geoms;
	      }

	      geoms.forEach(function (geom) {
	        _this.context.save();
	        var _geom$style = geom.style,
	            stroke = _geom$style.stroke,
	            fill = _geom$style.fill,
	            shadow = _geom$style.shadow,
	            filter = _geom$style.filter;


	        _this.context.currentTransform = _this.context.currentTransform.multiply(geom.transform);

	        var styles = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'filter', 'lineWidth', 'lineCap', 'lineJoin', 'miterLimit'];

	        styles.forEach(function (style) {
	          if (style) {
	            _this.context[style] = geom.style[style];
	          }
	        });

	        if (stroke) {
	          _this.context.strokeStyle = stroke;
	          _this.context.stroke(geom.path);
	        }

	        if (fill) {
	          _this.context.fillStyle = fill;
	          _this.context.fill(geom.path);
	        }

	        _this.context.restore();
	      });
	    }
	  }, {
	    key: 'renderTexts',
	    value: function renderTexts() {
	      var _this2 = this;

	      for (var _len4 = arguments.length, texts = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        texts[_key4] = arguments[_key4];
	      }

	      if (!texts.length) {
	        texts = this.texts;
	      }

	      texts.forEach(function (text) {
	        _this2.context.save();

	        _this2.context.currentTransform = _this2.context.currentTransform.multiply(text.transform);

	        var styles = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'filter', 'font', 'textAlign', 'textBaseline', 'direction'];

	        styles.forEach(function (style) {
	          if (style) {
	            _this2.context[style] = text.style[style];
	          }
	        });

	        //multi line
	        text.content.forEach(function (content, i) {
	          //emulate line-height 
	          if (i > 0) {
	            _this2.context.translate(0, text.style.fontSize * text.style.lineHeight);
	          }

	          if (text.style.stroke) {
	            _this2.context.strokeStyle = text.style.stroke;
	            _this2.context.strokeText(content, 0, 0, text.style.maxWidth);
	          }

	          if (text.style.fill) {
	            _this2.context.fillStyle = text.style.fill;
	            _this2.context.fillText(content, 0, 0, text.style.maxWidth);
	          }
	        });

	        _this2.context.restore();
	      });
	    }
	  }]);

	  return Layer;
	}();

	exports.default = Layer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Transform = __webpack_require__(5);

	var _Transform2 = _interopRequireDefault(_Transform);

	var _Motion = __webpack_require__(6);

	var _Motion2 = _interopRequireDefault(_Motion);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Geometry = function () {
	  function Geometry() {
	    _classCallCheck(this, Geometry);

	    this.path = new Path2D();
	    this.transform = new _Transform2.default();
	    this.motion = new _Motion2.default();
	    this.setStyle();
	  }

	  _createClass(Geometry, [{
	    key: 'combine',
	    value: function combine() {}
	  }, {
	    key: 'setStyle',
	    value: function setStyle() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$stroke = _ref.stroke,
	          stroke = _ref$stroke === undefined ? '' : _ref$stroke,
	          _ref$fill = _ref.fill,
	          fill = _ref$fill === undefined ? '' : _ref$fill,
	          _ref$shadowOffsetX = _ref.shadowOffsetX,
	          shadowOffsetX = _ref$shadowOffsetX === undefined ? '' : _ref$shadowOffsetX,
	          _ref$shadowOffsetY = _ref.shadowOffsetY,
	          shadowOffsetY = _ref$shadowOffsetY === undefined ? '' : _ref$shadowOffsetY,
	          _ref$shadowBlur = _ref.shadowBlur,
	          shadowBlur = _ref$shadowBlur === undefined ? '' : _ref$shadowBlur,
	          _ref$shadowColor = _ref.shadowColor,
	          shadowColor = _ref$shadowColor === undefined ? '' : _ref$shadowColor,
	          _ref$filter = _ref.filter,
	          filter = _ref$filter === undefined ? '' : _ref$filter,
	          _ref$lineWidth = _ref.lineWidth,
	          lineWidth = _ref$lineWidth === undefined ? '' : _ref$lineWidth,
	          _ref$lineCap = _ref.lineCap,
	          lineCap = _ref$lineCap === undefined ? '' : _ref$lineCap,
	          _ref$lineJoin = _ref.lineJoin,
	          lineJoin = _ref$lineJoin === undefined ? '' : _ref$lineJoin,
	          _ref$miterLimit = _ref.miterLimit,
	          miterLimit = _ref$miterLimit === undefined ? '' : _ref$miterLimit;

	      this.style = { stroke: stroke, fill: fill, shadowOffsetX: shadowOffsetX, shadowOffsetY: shadowOffsetY, shadowBlur: shadowBlur, shadowColor: shadowColor,
	        filter: filter, lineWidth: lineWidth, lineCap: lineCap, lineJoin: lineJoin, miterLimit: miterLimit };
	    }
	  }, {
	    key: 'scale',
	    value: function scale(sx, sy) {
	      this.transform.scaleSelf(sx, sy);
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(deg) {
	      this.transform.rotateSelf(deg);
	    }
	  }, {
	    key: 'updatePos',
	    value: function updatePos() {
	      this.pos = this.motion.update(this.pos);
	    }
	  }, {
	    key: 'pos',
	    get: function get() {
	      return {
	        x: this.transform.e,
	        y: this.transform.f
	      };
	    },
	    set: function set(_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y;

	      //分离矩阵的其他方法对position的影响
	      this.transform.e = x;
	      this.transform.f = y;
	    }
	  }]);

	  return Geometry;
	}();

	exports.default = Geometry;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//a polyfill for extending dommatrix fns to svgmatrix
	var Transform = function () {
	  function Transform(matrix) {
	    _classCallCheck(this, Transform);

	    var transform = matrix || document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
	    transform.scaleSelf = this.scaleSelf.bind(transform);
	    transform.rotateSelf = this.rotateSelf.bind(transform);
	    transform.translateSelf = this.translateSelf.bind(transform);
	    return transform;
	  }

	  _createClass(Transform, [{
	    key: "scaleSelf",
	    value: function scaleSelf(sx, sy) {
	      Transform.setTransform(this.scale(sx, sy), this);
	      return this;
	    }
	  }, {
	    key: "rotateSelf",
	    value: function rotateSelf(deg) {
	      Transform.setTransform(this.rotate(deg), this);
	      return this;
	    }
	  }, {
	    key: "translateSelf",
	    value: function translateSelf(dx, dy) {
	      Transform.setTransform(this.translate(dx, dy), this);
	      return this;
	    }
	  }], [{
	    key: "setTransform",
	    value: function setTransform(origin, dist) {
	      ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (v) {
	        dist[v] = origin[v];
	      });
	    }
	  }]);

	  return Transform;
	}();

	exports.default = Transform;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Motion = function () {
	  function Motion() {
	    _classCallCheck(this, Motion);

	    this.setAccel();
	    this.setVel();
	  }

	  _createClass(Motion, [{
	    key: "setVel",
	    value: function setVel() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$x = _ref.x,
	          x = _ref$x === undefined ? 0 : _ref$x,
	          _ref$y = _ref.y,
	          y = _ref$y === undefined ? 0 : _ref$y;

	      this.vel = { x: x, y: y }; //pixel per frame
	    }
	  }, {
	    key: "setAccel",
	    value: function setAccel() {
	      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref2$x = _ref2.x,
	          x = _ref2$x === undefined ? 0 : _ref2$x,
	          _ref2$y = _ref2.y,
	          y = _ref2$y === undefined ? 0 : _ref2$y;

	      this.accel = { x: x, y: y }; //velocity change per frame
	    }

	    //update velocity per frame

	  }, {
	    key: "update",
	    value: function update(pos) {
	      this.vel.x += this.accel.x;
	      this.vel.y += this.accel.y;
	      pos.x += this.vel.x;
	      pos.y += this.vel.y;
	      return pos;
	    }
	  }]);

	  return Motion;
	}();

	exports.default = Motion;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Geometry2 = __webpack_require__(4);

	var _Geometry3 = _interopRequireDefault(_Geometry2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FPS = function (_Geometry) {
	  _inherits(FPS, _Geometry);

	  function FPS() {
	    _classCallCheck(this, FPS);

	    return _possibleConstructorReturn(this, (FPS.__proto__ || Object.getPrototypeOf(FPS)).call(this));
	  }

	  return FPS;
	}(_Geometry3.default);

	exports.default = FPS;

/***/ },
/* 8 */
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

	    return _possibleConstructorReturn(this, (ForeLayer.__proto__ || Object.getPrototypeOf(ForeLayer)).apply(this, arguments));
	  }

	  return ForeLayer;
	}(_Layer3.default);

	exports.default = ForeLayer;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Transform = __webpack_require__(5);

	var _Transform2 = _interopRequireDefault(_Transform);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*todos:
	line-height & auto line-break(after over maxWidth): there is a way to loop measuretext width, but performance?
	*/

	var Text = function () {
	  function Text() {
	    var rawText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    _classCallCheck(this, Text);

	    this._rawText = rawText;
	    this.transform = new _Transform2.default();
	    this.setStyle();
	  }

	  _createClass(Text, [{
	    key: 'setStyle',
	    value: function setStyle() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$stroke = _ref.stroke,
	          stroke = _ref$stroke === undefined ? '' : _ref$stroke,
	          _ref$fill = _ref.fill,
	          fill = _ref$fill === undefined ? '' : _ref$fill,
	          _ref$shadowOffsetX = _ref.shadowOffsetX,
	          shadowOffsetX = _ref$shadowOffsetX === undefined ? '' : _ref$shadowOffsetX,
	          _ref$shadowOffsetY = _ref.shadowOffsetY,
	          shadowOffsetY = _ref$shadowOffsetY === undefined ? '' : _ref$shadowOffsetY,
	          _ref$shadowBlur = _ref.shadowBlur,
	          shadowBlur = _ref$shadowBlur === undefined ? '' : _ref$shadowBlur,
	          _ref$shadowColor = _ref.shadowColor,
	          shadowColor = _ref$shadowColor === undefined ? '' : _ref$shadowColor,
	          _ref$filter = _ref.filter,
	          filter = _ref$filter === undefined ? '' : _ref$filter,
	          _ref$fontSize = _ref.fontSize,
	          fontSize = _ref$fontSize === undefined ? 10 : _ref$fontSize,
	          _ref$fontFamily = _ref.fontFamily,
	          fontFamily = _ref$fontFamily === undefined ? 'sans-serif' : _ref$fontFamily,
	          _ref$lineHeight = _ref.lineHeight,
	          lineHeight = _ref$lineHeight === undefined ? 1 : _ref$lineHeight,
	          _ref$textAlign = _ref.textAlign,
	          textAlign = _ref$textAlign === undefined ? '' : _ref$textAlign,
	          _ref$textBaseline = _ref.textBaseline,
	          textBaseline = _ref$textBaseline === undefined ? 'top' : _ref$textBaseline,
	          _ref$direction = _ref.direction,
	          direction = _ref$direction === undefined ? '' : _ref$direction,
	          _ref$maxWidth = _ref.maxWidth,
	          maxWidth = _ref$maxWidth === undefined ? 9999 : _ref$maxWidth;

	      fontSize = parseInt(fontSize);
	      var font = fontSize + 'px ' + fontFamily;
	      this.style = { stroke: stroke, fill: fill, shadowOffsetX: shadowOffsetX, shadowOffsetY: shadowOffsetY, shadowBlur: shadowBlur, shadowColor: shadowColor,
	        filter: filter, fontSize: fontSize, fontFamily: fontFamily, font: font, lineHeight: lineHeight, textAlign: textAlign, textBaseline: textBaseline, direction: direction, maxWidth: maxWidth };
	    }
	  }, {
	    key: 'scale',
	    value: function scale(sx, sy) {
	      this.transform.scaleSelf(sx, sy);
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(deg) {
	      this.transform.rotateSelf(deg);
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
	  }, {
	    key: 'pos',
	    get: function get() {
	      return {
	        x: this.transform.e,
	        y: this.transform.f
	      };
	    },
	    set: function set(_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y;

	      //分离矩阵的其他方法对position的影响
	      this.transform.e = x;
	      this.transform.f = y;
	    }
	  }]);

	  return Text;
	}();

	exports.default = Text;

/***/ }
/******/ ]);