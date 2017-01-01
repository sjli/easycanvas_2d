//a polyfill for extending dommatrix fns to svgmatrix

let cloneTransform = (origin, dist) => {
  ['a', 'b', 'c', 'd', 'e', 'f'].forEach(v => {
    dist[v] = origin[v];
  });
}

let regNoTrans = /((?!translate).{9}|^.{0,8})Self/;

let polyfillTransformSelfs = () => {
  
  let proto = SVGMatrix.prototype;

  let selfProps = ["translate", "scale", "rotate",
                   "skewX", "skewY", "flipX", "flipY"];

  selfProps.forEach(prop => {
    proto[prop + 'Self'] = function(...args) {
      if (this.__originChanged && prop !== 'translate') {
        this.translateSelf(this.origin[0], this.origin[1]);
      }
      let origin = this[prop].apply(this, args);
      if (this.__originChanged && prop !== 'translate') {
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

}

class Transform {

  constructor() {
    let self = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();

    self.setOrigin = (x, y) => {
      self.__originChanged = true;
      self.origin = [x, y];
    }

    //safari not support DOMMatrix
    if (typeof DOMMatrix === 'undefined') {
      //polyfill dommatrix methods to svgmatrix
      polyfillTransformSelfs();
      return self;
    }
    //get/set from shadow matrix
    self.__shadow = new DOMMatrix;

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
        if (self.__originChanged && regNoTrans.test(prop)) {
          self.__shadow.translateSelf(self.origin[0], self.origin[1]);
        }
        if(args.length && args[0].__shadow) {
          args[0] = args[0].__shadow; //method like multiply error when svgmatrix as arguments on firefox
        }
        if (prop === "flipXSelf" || prop === "flipYSelf") {
          prop = prop.replace('Self', ''); //extend flipXSelf and flipYSelf
        }
        self.__shadow = self.__shadow[prop].apply(self.__shadow, args);

        if (self.__originChanged && regNoTrans.test(prop)) {
          self.__shadow.translateSelf(-self.origin[0], -self.origin[1]);
        }
        cloneTransform(self.__shadow, self);
        return ret;
      }
    });

    return self;
  }

}


export default Transform;