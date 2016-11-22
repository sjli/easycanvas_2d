class Layer {

  constructor(config = {
    showAxis: false
  }) {
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.geoms = [];
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

  addGeom(...geoms) {
    this.geoms = this.geoms.concat(geoms);
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

    geoms.forEach((geom) => {
      this.context.save();
      let {stroke, fill, shadow, filter} = geom.style;

      this.context.currentTransform = this.context.currentTransform.multiply(geom.transform);

      let styles = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor', 
                  'filter', 'lineWidth', 'lineCap', 'lineJoin', 'miterLimit'];

      styles.forEach((style) => {
        if (style) {
          this.context[style] = geom.style[style];
        }
      });

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
        if (style) {
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

}

export default Layer;