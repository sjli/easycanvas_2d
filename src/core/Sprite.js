import Transform from './Transform'
import Motion from './Motion'
import Frame from './Frame'

let spriteIndex = 0;

class Sprite {

  constructor({
    name = '',
    img = null,
    width = 0,
    height = 0,
    cols = 1,
    rows = 1,
    frameRate = 60,
    autoStart = true
  } = {}) {
    if (!img) {return;}

    this.width = width || img.width / cols >> 0;
    this.height = height || img.height / rows >> 0;

    if (!this.width || !this.height) {return;}

    this.id = '__sprite__' + spriteIndex++;
    this.name = name || this.id;
    this.index = 0;
    this.img = img;
    this.cols = cols;
    this.rows = rows;
    this.frames = cols * rows;
    this.frameRate = frameRate;

    //use unique canvas for better performance
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.transform = new Transform;
    this.motion = new Motion;
    this.frame = new Frame(this.update.bind(this), this.frameRate);
    if (autoStart) {
      this.frame.start();
    }
  }

  render() {
    let row = this.index / this.rows >> 0;
    let col = this.index % this.cols;
    this.canvas.width = this.canvas.width; //clear canvas
    this.context.drawImage(this.img, col * this.width, 0, this.width, this.height, 0, 0, this.width, this.height);
  }

  update() {
    this.index = (this.index + 1) % this.frames;
    this.render();
  }

  get pos() {
    return this.motion.pos;
  }

  set pos([x, y] = [0, 0]) {
    let pos = this.motion.pos;
    let dx = x - pos[0];
    let dy = y - pos[1];
    if (dx === 0 && dy === 0) {return;}
    this.motion.pos[0] = x;
    this.motion.pos[1] = y;
    this.transform.multiplySelf({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: dx,
      f: dy
    });
  }

  updatePos() {
    this.motion.update();
    let pos = [this.motion.pos[0], this.motion.pos[1]];
    let {e, f} = this.transform;
    this.transform.multiplySelf({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: pos[0] - e,
      f: pos[1] - f
    });
  }

  scale(...args) {
    this.transform.scaleSelf.apply(this.transform, args);
  }

  rotate(...args) {
    this.transform.rotateSelf.apply(this.transform, args);
  }

  translate(dx, dy) {
    var pos = this.pos;
    this.pos = [pos[0] + dx, pos[1] + dy];
  }

  flipX() {
    this.transform.flipX();
  }

  transformOrigin(x, y) {
    this.transform.setOrigin(x, y);
  }

}

export default Sprite;