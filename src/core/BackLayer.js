import Layer from './Layer';
import Geometry from './Geometry';

class BackLayer extends Layer {

  createBG() {
    var bg = new Geometry;
    bg.path.rect(0, 0, this.canvas.width, this.canvas.height);
    this.addGeom(bg);
    return bg;
  }

}

export default BackLayer;