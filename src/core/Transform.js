//a polyfill for extending dommatrix fns to svgmatrix
class Transform {

  constructor(matrix) {
    var transform = matrix || document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
    transform.scaleSelf = this.scaleSelf.bind(transform);
    transform.rotateSelf = this.rotateSelf.bind(transform);
    transform.translateSelf = this.translateSelf.bind(transform);
    return transform;
  }

  scaleSelf(sx, sy) {
    Transform.setTransform(this.scale(sx, sy), this);
    return this;
  }

  rotateSelf(deg) {
    Transform.setTransform(this.rotate(deg), this);
    return this;
  }

  translateSelf(dx, dy) {
    Transform.setTransform(this.translate(dx, dy), this);
    return this;
  }

  static setTransform(origin, dist) {
    ['a', 'b', 'c', 'd', 'e', 'f'].forEach(v => {
      dist[v] = origin[v];
    });
  }

}

export default Transform;