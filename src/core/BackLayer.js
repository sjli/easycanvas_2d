import Layer from './Layer';
import Geometry from './Geometry';

class BackLayer extends Layer {

  createBG({
    img = null,
    fill = ''
  } = {}) {
    if (img) {
      return this.addImage({
        name: 'bg', 
        img,
        dw: this.canvas.width,
        dh: this.canvas.height
      });
    } else if (fill) {
      var bg = new Geometry;
      bg.path.rect(0, 0, this.canvas.width, this.canvas.height);
      this.addGeom(bg);
      bg.setStyle({
        fill
      })
      return bg;
    }
  }

}

export default BackLayer;