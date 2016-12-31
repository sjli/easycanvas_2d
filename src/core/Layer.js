
import Transform from './Transform'
import Event from './Event'

class Layer {

  constructor(config = {
    showAxis: false
  }) {
    this.config = config;
    this.event = new Event;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    //polyfill for context.addHitRegion, only work for added objects
    this.__polyfill_hitRegion();
    this.geoms = new Map;
    this.texts = [];
    this.images = new Map;
  }

  __polyfill_hitRegion() {

    if (this.context.addHitRegion) {return;}
    
    this.__polyfill__regions = new Map;

    let checkHandler = (e, handler) => {
      let x = e.clientX, y = e.clientY;
      let region, eventObj;
      eventObj = Object.assign({}, e);
      this.__polyfill__regions.forEach((regionObj) => {
        let inPath = this.context.isPointInPath(regionObj.path, x, y);
        if (inPath) {
          eventObj.region = regionObj.id;
        }
      });
      handler(eventObj);
    }

    this.context.addHitRegion = ({path, id, transform}) => {
      if (!path || !id) {
        return console.error('path: ' + path, 'and id: ' + id, 'are both required for polyfill hit region');
      }
      let checkPath = new Path2D;
      checkPath.addPath(path, transform);
      this.__polyfill__regions.set(id, {
        id,
        path: checkPath
      });
      this.event.on('checkHitRegion', checkHandler);
    };

    this.context.clearHitRegions = () => {
      this.__polyfill__regions.clear();
      this.event.remove('checkHitRegion', checkHandler);
    };

  }

  mount(container) {
    container.appendChild(this.canvas);
    this.canvas.width = this.config.width || container.offsetWidth;
    this.canvas.height = this.config.width || container.offsetHeight;
    this.canvas.style.cssText = 'position: absolute; top: 0; left: 0';
    this.correctPixel();
    this.setCoordCenter();
  }

  addGeom(geom) {    
    this.geoms.set(geom.id, geom);

    //proxy to observe geom style change
    //performance ?
    if (!geom._addGeomBinded) {
      geom._addGeomBinded = true;

      geom.event.on('combined', () => {
        //remove when combine to other geometry
        this.geoms.delete(geom.id);
      });

    }
  }

  addText(...texts) {
    this.texts = this.texts.concat(texts);
  }

  addImage({
    name = '',
    img = null,
    sx = 0,
    sy = 0,
    sw = 0,
    sh = 0,
    dx = 0,
    dy = 0,
    dw = 0,
    dh = 0,
    transform = null
  }) {
    if (!name || !img) {
      return console.error('name: ' + name, 'img: ' + img, 'is required');
    }
    let val;
    let path = new Path2D;
    sw = sw || img.width - sx;
    sh = sh || img.height - sh;
    dw = dw || sw;
    dh = dh || sh;
    transform = transform || new Transform;
    path.rect(dx, dy, dw, dh);
    val = {name, img, sx, sy, sw, sh, dx, dy, dw, dh, path, transform};

    this.images.set(name, val);
    return val;
  }

  addSprite({
    sprite = null,
    dx = 0,
    dy = 0
  }) {
    if (!sprite) {
      return console.error('no sprite to be added');
    }
    this.addImage({
      name: sprite.name,
      img: sprite.canvas,
      transform: sprite.transform,
      dx,
      dy
    });
  }

  //make line 1px
  correctPixel() {
    this.context.translate(.5, .5);
  }

  setCoordCenter(x = 0, y = 0) {
    this.coords = {x, y};
    this.context.translate(x, y);
  }

  renderAxis() {
    this.context.beginPath();
    this.context.moveTo(-this.coords.x, 0);
    this.context.lineTo(this.canvas.width - this.coords.x, 0);
    this.context.moveTo(0, -this.coords.y)
    this.context.lineTo(0, this.canvas.height - this.coords.y);
    this.context.stroke();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.clearHitRegions();
  }

  render() {
    if (this.config.showAxis) {
      this.renderAxis();
    }
    this.renderGeoms();
    this.renderTexts();
    this.renderImages();
  }

  renderGeoms(...geoms) {

    if (!geoms.length) {
      geoms = this.geoms;
    }

    geoms.forEach(geom => {

      this.context.save();

      let {a, b, c, d, e, f} = geom.transform;
      
      this.context.transform(a, b, c, d, e, f);

      //add hit region
      this.context.addHitRegion({
        path: geom.path,
        id: geom.id,
        transform: geom.transform //for polyfill
      });
      
      
      let {stroke, fill, rules} = geom.style;

      for (var rule in rules) {
        this.context[rule] = rules[rule];
      }

      if (stroke) {
        this.context.strokeStyle = stroke;
        this.context.stroke(geom.path);
      } 

      if (fill) {
        this.context.fillStyle = fill;
        this.context.fill(geom.path);
      }
      
      this.context.restore();

    });

  }

  renderTexts(...texts) {
    if (!texts.length) {
      texts = this.texts;
    }

    texts.forEach(text => {
      this.context.save();

      let {a, b, c, d, e, f} = text.transform;
      
      this.context.transform(a, b, c, d, e, f);

      let styles = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 'filter', 'font', 
      'textAlign', 'textBaseline', 'direction'];

      styles.forEach((style) => {
        if (text.style[style]) {
          this.context[style] = text.style[style];
        }
      });

      //multi line
      text.content.forEach((content, i) => {
        //emulate line-height 
        if (i > 0) {
          this.context.translate(0, text.style.fontSize * text.style.lineHeight);
        }

        if (text.style.stroke) {
          this.context.strokeStyle = text.style.stroke;
          this.context.strokeText(content, 0, 0, text.style.maxWidth);
        } 

        if (text.style.fill) {
          this.context.fillStyle = text.style.fill;
          this.context.fillText(content, 0, 0, text.style.maxWidth);
        }
      });

      this.context.restore();
    });
  }

  renderImages(...images) {
    if (!images.length) {
      images = this.images;
    }

    images.forEach(image => {
      let {img, sx, sy, sw, sh, dx, dy, dw, dh} = image;
      this.context.save();
      if (image.transform) {
        let {a, b, c, d, e, f} = image.transform;
        this.context.transform(a, b, c, d, e, f);
      }
      //add hit region
      this.context.addHitRegion({
        path: image.path,
        id: image.name,
        transform: image.transform //for polyfill
      });
      this.context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
      this.context.restore();
    });
  }

  //user events
  on(type, handler) {
    if (type === 'drag') {
      let startType = ['mousedown', 'touchstart'];
      let moveType = ['mousemove', 'touchmove'];
      let endType = ['mouseup', 'touchend'];
      let targetId = null;
      let sx, sy, ex, ey;
      startType.forEach(type => {
        this.canvas.addEventListener(type, e => {
          targetId = e.region;
          sx = e.clientX;
          sy = e.clientY;
        });
      });

      endType.forEach(type => {
        this.canvas.addEventListener(type, e => {
          targetId = null;
        });
      });

      moveType.forEach(type => {
        this.canvas.addEventListener(type, e => {
          if (targetId) {
            ex = e.clientX;
            ey = e.clientY;
            e.dx = ex - sx;
            e.dy = ey - sy;
            sx = ex;
            sy = ey;
            handler(e, targetId);
          }
        });
      });
      
      return;
    }

    let wrapHandler = (e) => {
      if (!this.__polyfill__regions) {
        return handler(e);
      } else {
        this.event.emit('checkHitRegion', e, handler);
      }
    }

    this.canvas.addEventListener(type, wrapHandler);
  }

  off(type) {
    this.canvas.removeEventListener(type);
  }

}

export default Layer;