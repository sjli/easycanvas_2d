import Layer from './Layer';
import Geometry from './Geometry';
import FPS from './FPS';

class BackLayer extends Layer {

  constructor(config = {showFPS: true}) {
    super();
    Object.assign(this.config, config);
    if (this.config.showFPS) {
      this.fps = new FPS;
      this.addGeom(this.fps);
    }
  }

  createBG() {
    var bg = new Geometry;
    bg.path.rect(0, 0, this.canvas.width, this.canvas.height);
    this.addGeom(bg);
    return bg;
  }

}

export default BackLayer;