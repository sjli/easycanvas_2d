
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
    this.__polyfill__transform();
    //polyfill for context.addHitRegion, only work for added objects
    this.__polyfill_hitRegion();
    this.objects = new Map;
  }

  __polyfill__transform() {
    //mozCurrentTransform return array rather than svgmatrix
    let matrix = this.context.currentTransform;
    if (matrix) {return;}
    matrix = this.context.currentTransform = new Transform;

    let selfProps = ['rotate', 'scale', 'translate'];
    let originSetTransform = this.context.setTransform;
    let originTransform = this.context.transform;
    let originSave = this.context.save;
    let originRestore = this.context.restore;

    this.__transform__store = [];

    selfProps.forEach(prop => {
      let origin = this.context[prop];
      this.context[prop] = (...args) => {
        origin.apply(this.context, args);
        matrix[prop + 'Self'].apply(this.context.currentTransform, args);
      }
    });

    this.context.setTransform = (...args) => {
      originSetTransform.apply(this.context, args);
      matrix.setTransform.apply(this.context.currentTransform, args);
    };

    this.context.transform = (...args) => {
      originTransform.apply(this.context, args);
      let tempMatrix = new Transform;
      tempMatrix.setTransform.apply(tempMatrix, args);
      this.context.currentTransform.multiply(tempMatrix);
    };

    this.context.save = () => {
      originSave.apply(this.context);
      let tempMatrix = new Transform;
      let {a, b, c, d, e, f} = this.context.currentTransform;
      tempMatrix.setTransform(a, b, c, d, e, f);
      this.__transform__store.push(tempMatrix);
    }

    this.context.restore = () => {
      originRestore.apply(this.context);
      let matrix = this.__transform__store.pop();
      if (matrix) {
        this.context.currentTransform = matrix;
      }
    }
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
      if (!this.event.__hitRegion_binded) {
        this.event.__hitRegion_binded = true;
        this.event.on('checkHitRegion', checkHandler);
      }
    };

    this.context.clearHitRegions = () => {
      this.__polyfill__regions.clear();
      this.event.clear();
      this.event.__hitRegion_binded = false;
    };

  }

  mount(container) {
    container.appendChild(this.canvas);
    this.canvas.width = this.config.width || container.offsetWidth;
    this.canvas.height = this.config.width || container.offsetHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.canvas.style.cssText = 'position: absolute; top: 0; left: 0';
    this.correctPixel();
    this.setCoordCenter();
  }

  addGeom(geom) {    
    this.objects.set(geom.id, geom);

    //proxy to observe geom style change
    //performance ?
    if (!geom._addGeomBinded) {
      geom._addGeomBinded = true;

      geom.event.on('combined', () => {
        //remove when combine to other geometry
        this.objects.delete(geom.id);
      });

    }
  }

  addText(text) {
    this.objects.set(text.id, text);
  }

  addImage(ecImage) {
    this.objects.set(ecImage.id, ecImage);
  }

  //make line 1px
  correctPixel() {
    this.__correctPixel = 0.5;
    this.context.setTransform(1, 0, 0, 1, this.__correctPixel, this.__correctPixel);
  }

  setCoordCenter(x = 0, y = 0) {
    let matrix = this.context.currentTransform;
    let {e, f} = matrix;
    this.coords = {x, y};
    this.context.translate(x - e + this.__correctPixel, y - f + this.__correctPixel);
  }

  clear() {
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.restore();
    this.context.clearHitRegions();
  }

  render(...objects) {

    if (!objects.length) {
      objects = this.objects;
    }

    objects.forEach(object => {

      this.context.save();

      //set transform
      let {a, b, c, d, e, f} = object.transform;
      this.context.transform(a, b, c, d, e, f);

      //add hit region
      if (object.path && object.observable) {
        this.context.addHitRegion({
          path: object.path,
          id: object.id,
          transform: object.transform //for polyfill
        });
      }

      object.render(this.context);

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
          if (!this.__polyfill__regions) {
            targetId = e.region;
          } else {
            this.event.emit('checkHitRegion', e, (evt) => {
              targetId = evt.region;
            });
          }
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