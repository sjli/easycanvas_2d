//a polyfill for extending dommatrix fns to svgmatrix

let cloneTransform = (origin, dist) => {
  ['a', 'b', 'c', 'd', 'e', 'f'].forEach(v => {
    dist[v] = origin[v];
  });
}

let regNoTrans = /((?!translate).{9}|^.{0,8})Self/;

class Transform {

  constructor() {
    let self = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
    //get/set from shadow matrix
    self.__shadow = new DOMMatrix;

    let props = Object.getOwnPropertyNames(SVGMatrix.prototype);
    let selfProps = ["multiplySelf", "preMultiplySelf", "translateSelf",
                     "scaleSelf", "scale3dSelf", "rotateSelf", 
                     "rotateFromVectorSelf", "rotateAxisAngleSelf", 
                     "skewXSelf", "skewYSelf", "invertSelf"];
    let excludes = ['constructor', 'a', 'b', 'c', 'd', 'e', 'f'];
    props = props.concat(selfProps);

    self.setOrigin = (x, y) => {
      self.__originChanged = true;
      self.origin = [x, y];
    }

    props.forEach(prop => {
      if (excludes.indexOf(prop) > -1) {return;}
      self[prop] = (...args) => {
        //transform origin
        if (self.__originChanged && regNoTrans.test(prop)) {
          self.__shadow.translateSelf(self.origin[0], self.origin[1]);
        }

        self.__shadow[prop].apply(self.__shadow, args);

        if (self.__originChanged && regNoTrans.test(prop)) {
          self.__shadow.translateSelf(-self.origin[0], -self.origin[1]);
        }
        cloneTransform(self.__shadow, self);
      }
    });

    return self;
  }

}


export default Transform;