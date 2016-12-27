import BackLayer from './BackLayer';
import ForeLayer from './ForeLayer';
import FPS from './FPS';

class Scene {

  constructor(container) {
    this.backLayer = new BackLayer;
    this.foreLayer = new ForeLayer;
    this.fps = new FPS;
    this.mount(container);
    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
  }

  mount(container) {
    this.backLayer.mount(container);
    this.foreLayer.mount(container);
    this.fps.mount(container);
  }

  getRandomPoint() {
    return {
      x: Math.random() * this.width >> 0, 
      y: Math.random() * this.height >> 0
    };
  }

  showFPS() {
    this.fps.show();
  }

  hideFPS() {
    this.fps.hide();
  }

}

export default Scene;