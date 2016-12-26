class Layer {

  constructor(config = {
    showAxis: false
  }) {
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.geoms = new Map;
    this.texts = [];
  }

  mount(container) {
    container.appendChild(this.canvas);
    this.canvas.width = container.offsetWidth;
    this.canvas.height = container.offsetHeight;
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
    //just set size of canvas make context clear
    var transform = this.context.currentTransform;
    this.canvas.width = this.canvas.width;
    this.context.currentTransform = transform;
    this.context.clearHitRegions();
  }

  render() {
    if (this.config.showAxis) {
      this.renderAxis();
    }
    this.renderGeoms();
    this.renderTexts();
  }

  renderGeoms(...geoms) {

    if (!geoms.length) {
      geoms = this.geoms;
    }

    geoms.forEach(geom => {

      this.context.save();
      
      this.context.currentTransform = this.context.currentTransform.multiply(geom.transform);

      //add hit region
      this.context.addHitRegion({
        path: geom.path,
        id: geom.id
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

    texts.forEach((text) => {
      this.context.save();

      this.context.currentTransform = this.context.currentTransform.multiply(text.transform);

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

  on(type, handler) {
    this.canvas.addEventListener(type, handler);
  }

  off(type, handler) {
    this.canvas.removeEventListener(type, handler);
  }

}

export default Layer;