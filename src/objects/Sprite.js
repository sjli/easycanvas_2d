import ECImage from './ECImage'
import Animation from '../animation/Animation'

let spriteIndex = 0;

class Sprite extends ECImage {

  constructor({
    name = '',
    img = null,
    width = 0,
    height = 0,
    cols = 1,
    rows = 1,
    frames = 0,
    frameRate = 60,
    observable = true,
  } = {}) {
    super({name, img, observable});
    if (!img) {return;}

    this.width = width || img.width / cols >> 0;
    this.height = height || img.height / rows >> 0;

    if (!this.width || !this.height) {return;}

    this.id = '__sprite__' + spriteIndex++;
    this.name = name || this.id;
    this.index = 0;
    this.cols = cols;
    this.rows = rows;
    this.frames = frames || cols * rows;
    this.frameRate = frameRate;
    this.__actions = new Map;

    //use unique canvas for better performance
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.img = this.canvas;
    this._img = img;
    this.sw = this.dw = this.width;
    this.sh = this.dh = this.height;

    //set transform origin center
    this.transformOrigin(this.width / 2, this.height / 2);

    //animate
    this.animation = new Animation(this.update.bind(this), this.frameRate);
  }

  renderSprite() {
    let row = this.index / this.cols >> 0;
    let col = this.index % this.cols;
    let sw = this._img.width / this.cols >> 0;
    let sh = this._img.height / this.rows >> 0;
    this.context.clearRect(0, 0, this.width, this.height); //clear canvas
    this.context.drawImage(this._img, 
      col * sw, row * sh, sw, sh, 
      0, 0, this.width, this.height
    );
  }

  update() {
    let action = this.__currentAction;
    if (!action) {
      this.stop();
      this.event.emit('noAction');
      return;
    }
    this.renderSprite();

    let addition = action.reverse ? -1 : 1;
    let last = action.start + addition * (action.frames - 1);

    this.index = (this.index + addition) % this.frames;

    if (this.index === last) {
      if (!action.swing) {
        this.index = action.start;
      } else {
        action.start = this.index;
        action.reverse = !action.reverse;
      }
      if (action.loop !== Infinity && action.loop > 0) {
        action.loop--;
        if (action.loop === 0) {
          this.stop();
          this.event.emit('loopEnd');
          return;
        }
      }
    }
    
    this.event.emit('update');
  }

  defineAction({
    name = '',
    start = 0,
    frames = this.frames,
    loop = Infinity,
    reverse = false,
    swing = false,
    frameRate = 0
  }) {
    if (!name) {
      return console.error('action name is required');
    }

    this.__actions.set(name, {
      start,
      frames,
      loop,
      reverse,
      swing,
      frameRate
    });
  }

  action(name) {
    if (!name) {
      return console.error('action name is required');
    }
    let action = this.__actions.get(name);
    if (!action) {
      return console.error('there is no action names ' + name);
    }
    if (this.__currentAction) {
      this.stop();
    }
    this.index = action.start;
    this.__currentAction = Object.assign({}, action);
    this.animation.setRate(action.frameRate || this.frameRate);
    this.animation.start();
  }

  stop() {
    this.animation.stop();
    this.__currentAction = null;
  }

}

export default Sprite;