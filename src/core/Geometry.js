import Transform from './Transform'
import Motion from './Motion'
import Event from './Event'

let geomIndex = 0;

class Geometry {

  constructor() {
    this.id = '__geom__' + geomIndex++;
    this.event = new Event;
    this.path = new Path2D;
    this.transform = new Transform;
    this.motion = new Motion;
    this.setStyle();
    this.children = [];
  }

  combine(geom) {
    this.path.addPath(geom.path, geom.transform);
    this.children.push(geom);
    geom.event.emit('combined');
  }

  updateCombine() {
    this.path = new Path2D;
    this.children.forEach(geom => {
      this.path.addPath(geom.path, geom.transform);
    })
  }

  get pos() {
    return this.motion.pos;
  }

  set pos([x, y] = [0, 0]) {
    this.motion.pos[0] = x;
    this.motion.pos[1] = y;
    this.transform.e = x;
    this.transform.f = y;
  }

  setStyle({
    stroke = '',
    fill = '',
    rules = {}
  } = {}) {
    var keys = [
      'shadowOffsetX', 
      'shadowOffsetY', 
      'shadowBlur', 
      'shadowColor',
      'filter',  //Warning: filter will obviously lower performance
      'lineWidth', 
      'lineCap', 
      'lineJoin', 
      'miterLimit',
      'globalAlpha'
    ];
    this.style = this.style || {rules:{}};
    if (stroke) {
      this.style.stroke = stroke;
    }
    if (fill) {
      this.style.fill = fill;
    }
    keys.forEach(key => {
      if (rules[key]) {
        this.style.rules[key] = rules[key];
      }
    });
    this.event.emit('styleUpdate');
  }

  scale(sx, sy) {
    this.transform.scaleSelf(sx, sy);
  }

  rotate(deg) {
    this.transform.rotateSelf(deg);
  }

  updatePos() {
    this.motion.update();
    this.transform.e = this.motion.pos[0];
    this.transform.f = this.motion.pos[1];
  }

}

export default Geometry;