//a polyfill for extending dommatrix fns to svgmatrix

let cloneTransform = (origin, dist) => {
  dist.a = origin.a;
  dist.b = origin.b;
  dist.c = origin.c;
  dist.d = origin.d;
  dist.e = origin.e;
  dist.f = origin.f;
}

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
      cloneTransform(origin, this);
      return this;
    }
  });

  let originMultiply = proto.multiply;

  proto.multiply = function(...args) {
    let origin = originMultiply.apply(this, args);
    cloneTransform(origin, this);
    return this;
  }

  //add setTransform 
  proto.setTransform = function(a, b, c, d, e, f) {
    let args = {a, b, c, d, e, f};
    cloneTransform(args, this);
    return this;
  }
}

class Transform {

  constructor() {
    let self = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();

    self.setOrigin = (x, y) => {
      self.__originChanged = true;
      self.origin = [x, y];
    }

    //在性能测试方面svgmatrix与dommatrix没有显著的区别，更多的区别是在dommatrix多了一些封装的方法以及对于3d的支持
    //且2dcontext只支持svgmatrix，因此此处只扩展封装部分self方法
    //polyfill dommatrix methods to svgmatrix
    //if (typeof DOMMatrix === 'undefined') {
      //polyfill dommatrix methods to svgmatrix
      polyfillTransformSelfs();
      return self;
    //}
    //get/set from shadow matrix
    /*self.__shadow = new DOMMatrix;

    let props = Object.getOwnPropertyNames(SVGMatrix.prototype);
    let selfProps = ["multiplySelf", "preMultiplySelf", "translateSelf",
                     "scaleSelf", "scale3dSelf", "rotateSelf", 
                     "rotateFromVectorSelf", "rotateAxisAngleSelf", 
                     "skewXSelf", "skewYSelf", "invertSelf", "flipXSelf", "flipYSelf"];
    let excludes = ['constructor', 'a', 'b', 'c', 'd', 'e', 'f'];
    props = props.concat(selfProps);

    props.forEach(prop => {
      if (excludes.indexOf(prop) > -1) {return;}
      self[prop] = (...args) => {
        let ret;
        //transform origin
        if (self.__originChanged && regTransOrigin.test(prop)) {
          self.__shadow.translateSelf(self.origin[0], self.origin[1]);
        }
        if(args.length && args[0].__shadow) {
          args[0] = args[0].__shadow; //method like multiply error when svgmatrix as arguments on firefox
        }
        if (prop === "flipXSelf" || prop === "flipYSelf") {
          prop = prop.replace('Self', ''); //extend flipXSelf and flipYSelf
        }
        self.__shadow = self.__shadow[prop].apply(self.__shadow, args);

        if (self.__originChanged && regTransOrigin.test(prop)) {
          self.__shadow.translateSelf(-self.origin[0], -self.origin[1]);
        }
        cloneTransform(self.__shadow, self);
        return ret;
      }
    });

    return self;*/
  }

}


export default Transform;