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

  getGeoms() {
    var geoms = [];
    this.geoms.forEach(group => {
      geoms = geoms.concat(group);
    });
    return geoms;
  }

  addGeom(geom) {
    //grouped by styles
    var group;
    let _styleId;
    if (geom._styleUniq) {
      _styleId = Symbol();
    } else {
      _styleId = geom._styleFlat;
    }
    geom._styleId = _styleId;
    if (!this.geoms.has(_styleId)) {
      this.geoms.set(_styleId, []);
    }
    group = this.geoms.get(_styleId);
    group.push(geom);


    //proxy to observe geom style change
    //performance ?
    if (!geom._addGeomBinded) {
      geom._addGeomBinded = true;
      geom.event.on('styleUpdate', () => {
        //change group store when geom style change
        var group = this.geoms.get(geom._styleId);
        group.splice(group.indexOf(geom), 1);
        this.addGeom(geom);
      });
      geom.event.on('combined', () => {
        //remove when combine to other geometry
        var group = this.geoms.get(geom._styleId);
        group.splice(group.indexOf(geom), 1);
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
  }

  render() {
    if (this.config.showAxis) {
      this.renderAxis();
    }
    this.renderGeoms();
    this.renderTexts();
  }

  renderGeoms(...geoms) {
    //render grouped by styles, for performance benifits
    if (!geoms.length) {
      geoms = this.geoms;
    } else {
      geoms = geoms.reduce((ret, geom) => {
        var _styleId = geom._styleId;
        if (!_styleId) {
          if (geom._styleUniq) {
            _styleId = Symbol();
          } else {
            _styleId = geom._styleFlat;
          }
        }
        if (!ret.has(_styleId)) {
          ret.set(_styleId, []);
        }
        ret.get(_styleId).push(geom);
        return ret;
      }, new Map);
    }

    geoms.forEach(group => {
      if (!group.length) {return;}
      this.context.save();
      //group path
      group.groupPath = new Path2D;
      if (group.length > 1) {
        group.forEach(geom => {
          group.groupPath.addPath(geom.path, geom.transform);
        });
      } else {
        group.groupPath.addPath(group[0].path);
        this.context.currentTransform = this.context.currentTransform.multiply(group[0].transform);
      }

      let {stroke, fill, rules} = group[0].style;

      for (var rule in rules) {
        this.context[rule] = rules[rule];
      }

      if (stroke) {
        this.context.strokeStyle = stroke;
        this.context.stroke(group.groupPath);
      } 

      if (fill) {
        this.context.fillStyle = fill;
        this.context.fill(group.groupPath);
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

}

export default Layer;