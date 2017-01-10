import ECObject from './ECObject'


let geomIndex = 0;

class Geometry extends ECObject {

  constructor({
    observable = false
  } = {}) {
    super();
    this.id = '__geom__' + geomIndex++;
    this.path = new Path2D;
    this.children = [];
    this.observable = observable;
    this.setStyle();
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

}

export default Geometry;