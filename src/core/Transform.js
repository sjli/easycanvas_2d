//a polyfill for extending dommatrix fns to svgmatrix
let regTransOrigin = /(rotate|scale)Self/;

let polyfillTransformSelfs = () => {
  let proto = SVGMatrix.prototype;

  let selfProps = ["translate", "scale", "rotate",
                   "skewX", "skewY", "flipX", "flipY"];

  selfProps.forEach(prop => {
    proto[prop + 'Self'] = function(...args) {
      if (this.__originChanged && /rotate|scale/.test(prop)) {
        this.translateSelf(this.origin[0], this.origin[1]);
      }
      let origin = this[prop].apply(this, args);
      if (this.__originChanged && /rotate|scale/.test(prop)) {
        origin.translateSelf(-this.origin[0], -this.origin[1]);
      }
      this.set(origin);
      return this;
    }
  });

  proto.clone = function() {
    var mtx = createMatrix();
    return mtx.set(this);
  };

  proto.set = function(m, b, c, d, e, f) {
    if (arguments.length === 1) {
      var {a, b, c, d, e, f} = m;
    } else {
      var a = m;
    }
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    return this;
  };
}

function createMatrix() {
  return document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
}

class Transform {

  constructor() {
    let self = createMatrix();

    self.setOrigin = (x, y) => {
      self.__originChanged = true;
      self.origin = [x, y];
    }

    //在性能测试方面svgmatrix与dommatrix没有显著的区别，更多的区别是在dommatrix多了一些封装的方法以及对于3d的支持
    //且2dcontext只支持svgmatrix，因此此处只扩展封装部分self方法
    //polyfill dommatrix methods to svgmatrix
    polyfillTransformSelfs();
    return self;

  }

  static multiply(m1, m2) {
    var mtx = createMatrix();
    mtx.a = m1.a * m2.a + m1.c * m2.b;
    mtx.b = m1.b * m2.a + m1.d * m2.b;
    mtx.c = m1.a * m2.c + m1.c * m2.d;
    mtx.d = m1.b * m2.c + m1.d * m2.d;
    mtx.e = m1.a * m2.e + m1.c * m2.f;
    mtx.f = m1.b * m2.e + m1.d * m2.f;
    return mtx;
  }

  static multiplyVector(m, v) {
    var mtx = createMatrix();
    mtx.a = m.a;
    mtx.b = m.b;
    mtx.c = m.c;
    mtx.d = m.d;
    mtx.e = m.a * v.x + m.c * v.y + m.e;
    mtx.f = m.b * v.x + m.d * v.y + m.f;
    return mtx;
  }

  static vectorMultiply(v, m) {
    var mtx = m.clone();
    mtx.e = m.e + v.x;
    mtx.f = m.f + v.y;
    return mtx;
  }

}


export default Transform;