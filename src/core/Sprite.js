import ECImage from './ECImage'
import Frame from './Frame'

let spriteIndex = 0;

class Sprite extends ECImage {

  constructor({
    name = '',
    img = null,
    width = 0,
    height = 0,
    cols = 1,
    rows = 1,
    frameRate = 60,
    autoStart = true,
    loop = Infinity
  } = {}) {
    super({name, img});
    if (!img) {return;}

    this.width = width || img.width / cols >> 0;
    this.height = height || img.height / rows >> 0;

    if (!this.width || !this.height) {return;}

    this.id = '__sprite__' + spriteIndex++;
    this.name = name || this.id;
    this.index = 0;
    this.cols = cols;
    this.rows = rows;
    this.frames = cols * rows;
    this.frameRate = frameRate;
    this.loop = loop;

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
    this.frame = new Frame(this.update.bind(this), this.frameRate);
    if (autoStart) {
      this.frame.start();
    }
  }

  render() {
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
    if (this.loop !== Infinity && this.index === this.frames - 1) {
      this.loop--;
      if (this.loop <= 0) {
        this.frame.stop();
        this.event.emit('loopEnd');
        return;
      }
    }
    this.render();
    this.index = (this.index + 1) % this.frames;
    this.event.emit('update');
  }

}

export default Sprite;