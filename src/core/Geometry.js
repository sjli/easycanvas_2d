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
    let pos = this.motion.pos;
    let dx = x - pos[0];
    let dy = y - pos[1];
    if (dx === 0 && dy === 0) {return;}
    this.motion.pos[0] = x;
    this.motion.pos[1] = y;
    this.transform.multiplySelf({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: dx,
      f: dy
    });
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

  scale(...args) {
    this.transform.scaleSelf.apply(this.transform, args);
  }

  rotate(...args) {
    this.transform.rotateSelf.apply(this.transform, args);
  }

  translate(dx, dy) {
    var pos = this.pos;
    this.pos = [pos[0] + dx, pos[1] + dy];
  }

  transformOrigin(x, y) {
    this.transform.setOrigin(x, y);
  }

  updatePos() {
    this.motion.update();
    let pos = [this.motion.pos[0], this.motion.pos[1]];
    let {e, f} = this.transform;
    this.transform.multiplySelf({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: pos[0] - e,
      f: pos[1] - f
    });
  }

}

export default Geometry;