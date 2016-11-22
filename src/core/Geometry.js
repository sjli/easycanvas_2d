import Transform from './Transform'
import Motion from './Motion'

class Geometry {

  constructor() {
    this.path = new Path2D;
    this.transform = new Transform;
    this.motion = new Motion;
    this.setStyle();
  }

  combine() {

  }

  setStyle({
    stroke = '',
    fill = '',
    shadowOffsetX = '',
    shadowOffsetY = '',
    shadowBlur = '',
    shadowColor = '',
    filter = '',
    lineWidth = '',
    lineCap = '',
    lineJoin = '',
    miterLimit = ''
  } = {}) {
    this.style = {stroke, fill, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor,
                 filter, lineWidth, lineCap, lineJoin, miterLimit};
  }

  get pos() {    
    return {
      x: this.transform.e,
      y: this.transform.f
    }
  }

  set pos({x, y}) {
    //分离矩阵的其他方法对position的影响
    this.transform.e = x;
    this.transform.f = y;
  }

  scale(sx, sy) {
    this.transform.scaleSelf(sx, sy);
  }

  rotate(deg) {
    this.transform.rotateSelf(deg);
  }

  updatePos() {
    this.pos = this.motion.update(this.pos);
  }

}

export default Geometry;