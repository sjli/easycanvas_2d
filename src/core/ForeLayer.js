import Layer from './Layer';
import FPS from './FPS';
import Frame from './Frame';

class ForeLayer extends Layer {

  constructor() {
    super();
    this.fps = new FPS;

  }

  showFPS() {
    var frame = new Frame(() => {
      this.fps.update();
      this.renderGeoms(this.fps.box);
      this.renderTexts(this.fps.text);
    });
    frame.start();
  }

}

export default ForeLayer;