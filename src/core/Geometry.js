import ECObject from './ECObject'


//extend Path2D
if (Path2D && Path2D.prototype) {
  Path2D.prototype.roundRect = function(x, y, width, height, radius) {
    this.moveTo(x, y + radius);
    this.arc(x + radius, y + radius, radius, -Math.PI, -Math.PI/2, false);
    this.lineTo(x + width - radius, y);
    this.arc(x + width -radius, y + radius, radius, -Math.PI/2, 0, false);
    this.lineTo(x + width, y + height - radius);
    this.arc(x + width -radius, y + height - radius, radius, 0, Math.PI/2, false);
    this.lineTo(x + radius, y + height);
    this.arc(x  + radius, y + height - radius, radius, Math.PI/2, Math.PI, false);
    this.closePath();
  }
}



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
    rules = {},
    methods = {}
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
    var methodKeys = [
      'setLineDash'
    ];
    this.style = this.style || {rules:{}, methods: {}};
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
    methodKeys.forEach(key => {
      if (methods[key]) {
        this.style.methods[key] = methods[key];
      }
    });
    this.event.emit('styleUpdate');
  }

  render(context) {
    
    let {stroke, fill, rules, methods} = this.style;

    for (var rule in rules) {
      context[rule] = rules[rule];
    }

    for (var method in methods) {
      context[method](methods[method]);
    }

    if (stroke) {
      context.strokeStyle = stroke;
      context.stroke(this.path);
    } 

    if (fill) {
      context.fillStyle = fill;
      context.fill(this.path);
    }
    
  }

}

export default Geometry;