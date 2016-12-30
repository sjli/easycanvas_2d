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

	var _Text = __webpack_require__(11);

	var _Text2 = _interopRequireDefault(_Text);

	var _Sprite = __webpack_require__(13);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	var _Frame = __webpack_require__(12);

	var _Frame2 = _interopRequireDefault(_Frame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EasyCanvas = {
	  mode: '2d',

	  ver: '1.0.0',

	  Scene: _Scene2.default,

	  Geometry: _Geometry2.default,

	  Text: _Text2.default,

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

	var _ForeLayer = __webpack_require__(9);

	var _ForeLayer2 = _interopRequireDefault(_ForeLayer);

	var _FPS = __webpack_require__(10);

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

	var _Geometry = __webpack_require__(4);

	var _Geometry2 = _interopRequireDefault(_Geometry);

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
	        return this.addImage({
	          name: 'bg',
	          img: img,
	          dw: this.canvas.width,
	          dh: this.canvas.height
	        });
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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
	    this.geoms = new Map();
	    this.texts = [];
	    this.images = new Map();
	  }

	  _createClass(Layer, [{
	    key: 'mount',
	    value: function mount(container) {
	      container.appendChild(this.canvas);
	      this.canvas.width = this.config.width || container.offsetWidth;
	      this.canvas.height = this.config.width || container.offsetHeight;
	      this.canvas.style.cssText = 'position: absolute; top: 0; left: 0';
	      this.correctPixel();
	      this.setCoordCenter();
	    }
	  }, {
	    key: 'addGeom',
	    value: function addGeom(geom) {
	      var _this = this;

	      this.geoms.set(geom.id, geom);

	      //proxy to observe geom style change
	      //performance ?
	      if (!geom._addGeomBinded) {
	        geom._addGeomBinded = true;

	        geom.event.on('combined', function () {
	          //remove when combine to other geometry
	          _this.geoms.delete(geom.id);
	        });
	      }
	    }
	  }, {
	    key: 'addText',
	    value: function addText() {
	      for (var _len = arguments.length, texts = Array(_len), _key = 0; _key < _len; _key++) {
	        texts[_key] = arguments[_key];
	      }

	      this.texts = this.texts.concat(texts);
	    }
	  }, {
	    key: 'addImage',
	    value: function addImage(_ref) {
	      var _ref$name = _ref.name,
	          name = _ref$name === undefined ? '' : _ref$name,
	          _ref$img = _ref.img,
	          img = _ref$img === undefined ? null : _ref$img,
	          _ref$sx = _ref.sx,
	          sx = _ref$sx === undefined ? 0 : _ref$sx,
	          _ref$sy = _ref.sy,
	          sy = _ref$sy === undefined ? 0 : _ref$sy,
	          _ref$sw = _ref.sw,
	          sw = _ref$sw === undefined ? 0 : _ref$sw,
	          _ref$sh = _ref.sh,
	          sh = _ref$sh === undefined ? 0 : _ref$sh,
	          _ref$dx = _ref.dx,
	          dx = _ref$dx === undefined ? 0 : _ref$dx,
	          _ref$dy = _ref.dy,
	          dy = _ref$dy === undefined ? 0 : _ref$dy,
	          _ref$dw = _ref.dw,
	          dw = _ref$dw === undefined ? 0 : _ref$dw,
	          _ref$dh = _ref.dh,
	          dh = _ref$dh === undefined ? 0 : _ref$dh,
	          _ref$transform = _ref.transform,
	          transform = _ref$transform === undefined ? null : _ref$transform;

	      if (!name || !img) {
	        return console.error('name: ' + name, 'img: ' + img, 'is required');
	      }
	      var val = void 0;
	      var path = new Path2D();
	      sw = sw || img.width - sx;
	      sh = sh || img.height - sh;
	      dw = dw || sw;
	      dh = dh || sh;
	      path.rect(dx, dy, dw, dh);
	      val = { name: name, img: img, sx: sx, sy: sy, sw: sw, sh: sh, dx: dx, dy: dy, dw: dw, dh: dh, path: path, transform: transform };

	      this.images.set(name, val);
	      return val;
	    }
	  }, {
	    key: 'addSprite',
	    value: function addSprite(_ref2) {
	      var _ref2$sprite = _ref2.sprite,
	          sprite = _ref2$sprite === undefined ? null : _ref2$sprite,
	          _ref2$dx = _ref2.dx,
	          dx = _ref2$dx === undefined ? 0 : _ref2$dx,
	          _ref2$dy = _ref2.dy,
	          dy = _ref2$dy === undefined ? 0 : _ref2$dy;

	      if (!sprite) {
	        return console.error('no sprite to be added');
	      }
	      this.addImage({
	        name: sprite.name,
	        img: sprite.canvas,
	        transform: sprite.transform,
	        dx: dx,
	        dy: dy
	      });
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
	      this.context.clearHitRegions();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.showAxis) {
	        this.renderAxis();
	      }
	      this.renderGeoms();
	      this.renderTexts();
	      this.renderImages();
	    }
	  }, {
	    key: 'renderGeoms',
	    value: function renderGeoms() {
	      var _this2 = this;

	      for (var _len2 = arguments.length, geoms = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        geoms[_key2] = arguments[_key2];
	      }

	      if (!geoms.length) {
	        geoms = this.geoms;
	      }

	      geoms.forEach(function (geom) {

	        _this2.context.save();

	        _this2.context.currentTransform = _this2.context.currentTransform.multiply(geom.transform);

	        //add hit region
	        _this2.context.addHitRegion({
	          path: geom.path,
	          id: geom.id
	        });

	        var _geom$style = geom.style,
	            stroke = _geom$style.stroke,
	            fill = _geom$style.fill,
	            rules = _geom$style.rules;


	        for (var rule in rules) {
	          _this2.context[rule] = rules[rule];
	        }

	        if (stroke) {
	          _this2.context.strokeStyle = stroke;
	          _this2.context.stroke(geom.path);
	        }

	        if (fill) {
	          _this2.context.fillStyle = fill;
	          _this2.context.fill(geom.path);
	        }

	        _this2.context.restore();
	      });
	    }
	  }, {
	    key: 'renderTexts',
	    value: function renderTexts() {
	      var _this3 = this;

	      for (var _len3 = arguments.length, texts = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        texts[_key3] = arguments[_key3];
	      }

	      if (!texts.length) {
	        texts = this.texts;
	      }

	      texts.forEach(function (text) {
	        _this3.context.save();

	        _this3.context.currentTransform = _this3.context.currentTransform.multiply(text.transform);

	        var styles = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'filter', 'font', 'textAlign', 'textBaseline', 'direction'];

	        styles.forEach(function (style) {
	          if (text.style[style]) {
	            _this3.context[style] = text.style[style];
	          }
	        });

	        //multi line
	        text.content.forEach(function (content, i) {
	          //emulate line-height 
	          if (i > 0) {
	            _this3.context.translate(0, text.style.fontSize * text.style.lineHeight);
	          }

	          if (text.style.stroke) {
	            _this3.context.strokeStyle = text.style.stroke;
	            _this3.context.strokeText(content, 0, 0, text.style.maxWidth);
	          }

	          if (text.style.fill) {
	            _this3.context.fillStyle = text.style.fill;
	            _this3.context.fillText(content, 0, 0, text.style.maxWidth);
	          }
	        });

	        _this3.context.restore();
	      });
	    }
	  }, {
	    key: 'renderImages',
	    value: function renderImages() {
	      var _this4 = this;

	      for (var _len4 = arguments.length, images = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        images[_key4] = arguments[_key4];
	      }

	      if (!images.length) {
	        images = this.images;
	      }

	      images.forEach(function (image) {
	        var img = image.img,
	            sx = image.sx,
	            sy = image.sy,
	            sw = image.sw,
	            sh = image.sh,
	            dx = image.dx,
	            dy = image.dy,
	            dw = image.dw,
	            dh = image.dh;

	        _this4.context.save();
	        if (image.transform) {
	          _this4.context.currentTransform = _this4.context.currentTransform.multiply(image.transform);
	        }
	        //add hit region
	        _this4.context.addHitRegion({
	          path: image.path,
	          id: image.name
	        });
	        _this4.context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
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
	              targetId = e.region;
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
	      this.canvas.addEventListener(type, handler);
	    }
	  }, {
	    key: 'off',
	    value: function off(type, handler) {
	      this.canvas.removeEventListener(type, handler);
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

	var _ECObject2 = __webpack_require__(5);

	var _ECObject3 = _interopRequireDefault(_ECObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var geomIndex = 0;

	var Geometry = function (_ECObject) {
	  _inherits(Geometry, _ECObject);

	  function Geometry() {
	    _classCallCheck(this, Geometry);

	    var _this = _possibleConstructorReturn(this, (Geometry.__proto__ || Object.getPrototypeOf(Geometry)).call(this));

	    _this.id = '__geom__' + geomIndex++;
	    _this.path = new Path2D();
	    _this.children = [];
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

	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          _ref$stroke = _ref.stroke,
	          stroke = _ref$stroke === undefined ? '' : _ref$stroke,
	          _ref$fill = _ref.fill,
	          fill = _ref$fill === undefined ? '' : _ref$fill,
	          _ref$rules = _ref.rules,
	          rules = _ref$rules === undefined ? {} : _ref$rules;

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
	  }]);

	  return Geometry;
	}(_ECObject3.default);

	exports.default = Geometry;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Transform = __webpack_require__(6);

	var _Transform2 = _interopRequireDefault(_Transform);

	var _Motion = __webpack_require__(7);

	var _Motion2 = _interopRequireDefault(_Motion);

	var _Event = __webpack_require__(8);

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
	      this.transform.flipX();
	    }
	  }, {
	    key: 'flipY',
	    value: function flipY() {
	      this.transform.flipY();
	    }
	  }, {
	    key: 'transformOrigin',
	    value: function transformOrigin(x, y) {
	      this.transform.setOrigin(x, y);
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
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//a polyfill for extending dommatrix fns to svgmatrix

	var cloneTransform = function cloneTransform(origin, dist) {
	  ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (v) {
	    dist[v] = origin[v];
	  });
	};

	var regNoTrans = /((?!translate).{9}|^.{0,8})Self/;

	var Transform = function Transform() {
	  _classCallCheck(this, Transform);

	  var self = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
	  //get/set from shadow matrix
	  self.__shadow = new DOMMatrix();

	  var props = Object.getOwnPropertyNames(SVGMatrix.prototype);
	  var selfProps = ["multiplySelf", "preMultiplySelf", "translateSelf", "scaleSelf", "scale3dSelf", "rotateSelf", "rotateFromVectorSelf", "rotateAxisAngleSelf", "skewXSelf", "skewYSelf", "invertSelf"];
	  var excludes = ['constructor', 'a', 'b', 'c', 'd', 'e', 'f'];
	  props = props.concat(selfProps);

	  self.setOrigin = function (x, y) {
	    self.__originChanged = true;
	    self.origin = [x, y];
	  };

	  props.forEach(function (prop) {
	    if (excludes.indexOf(prop) > -1) {
	      return;
	    }
	    self[prop] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      var ret = void 0;
	      //transform origin
	      if (self.__originChanged && regNoTrans.test(prop)) {
	        self.__shadow.translateSelf(self.origin[0], self.origin[1]);
	      }
	      self.__shadow = self.__shadow[prop].apply(self.__shadow, args);

	      if (self.__originChanged && regNoTrans.test(prop)) {
	        self.__shadow.translateSelf(-self.origin[0], -self.origin[1]);
	      }
	      cloneTransform(self.__shadow, self);
	      return ret;
	    };
	  });

	  return self;
	};

	exports.default = Transform;

/***/ },
/* 7 */
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

	    var _motion = new Int16Array(6);
	    this.pos = new Int16Array(_motion.buffer, 0, 2);
	    this.vel = new Int16Array(_motion.buffer, 4, 2);
	    this.accel = new Int16Array(_motion.buffer, 8, 2);
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Geometry = __webpack_require__(4);

	var _Geometry2 = _interopRequireDefault(_Geometry);

	var _Text = __webpack_require__(11);

	var _Text2 = _interopRequireDefault(_Text);

	var _Layer2 = __webpack_require__(3);

	var _Layer3 = _interopRequireDefault(_Layer2);

	var _Frame = __webpack_require__(12);

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
	    _this._data = new Uint8Array(100).fill(60);
	    _this.box = new _Geometry2.default();
	    _this.text = new _Text2.default();
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
	        _this2.renderGeoms(_this2.box);
	        _this2.renderTexts(_this2.text);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ECObject2 = __webpack_require__(5);

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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ECObject2 = __webpack_require__(5);

	var _ECObject3 = _interopRequireDefault(_ECObject2);

	var _Frame = __webpack_require__(12);

	var _Frame2 = _interopRequireDefault(_Frame);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var spriteIndex = 0;

	var Sprite = function (_ECObject) {
	  _inherits(Sprite, _ECObject);

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
	        _ref$frameRate = _ref.frameRate,
	        frameRate = _ref$frameRate === undefined ? 60 : _ref$frameRate,
	        _ref$autoStart = _ref.autoStart,
	        autoStart = _ref$autoStart === undefined ? true : _ref$autoStart,
	        _ref$loop = _ref.loop,
	        loop = _ref$loop === undefined ? Infinity : _ref$loop;

	    _classCallCheck(this, Sprite);

	    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

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
	    _this.img = img;
	    _this.cols = cols;
	    _this.rows = rows;
	    _this.frames = cols * rows;
	    _this.frameRate = frameRate;
	    _this.loop = loop;

	    //use unique canvas for better performance
	    _this.canvas = document.createElement('canvas');
	    _this.context = _this.canvas.getContext('2d');
	    _this.canvas.width = _this.width;
	    _this.canvas.height = _this.height;

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
	    key: 'render',
	    value: function render() {
	      var row = this.index / this.cols >> 0;
	      var col = this.index % this.cols;
	      var sw = this.img.width / this.cols;
	      var sh = this.img.height / this.rows;
	      this.canvas.width = this.canvas.width; //clear canvas
	      this.context.drawImage(this.img, col * sw, row * sh, sw, sh, 0, 0, this.width, this.height);
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
	      this.render();
	      this.index = (this.index + 1) % this.frames;
	      this.event.emit('update');
	    }
	  }]);

	  return Sprite;
	}(_ECObject3.default);

	exports.default = Sprite;

/***/ }
/******/ ]);