import Geometry from './Geometry';
import Text from './Text';
import Layer from './Layer';
import Frame from './Frame';

let textRate = 50; //40frame
let refreshRate = 2; //2frame

class FPS extends Layer {

  constructor(config = {
    width: 100,
    height: 100
  }) {
    super();
    Object.assign(this.config, config);

    this._lastTick = +(new Date);
    this._tick = 0;
    this._fps = 60;
    this._data = new Uint8Array(100);
    this.box = new Geometry;
    this.text = new Text;

    [].fill.call(this._data, 60);
    this.text.content = this._fps + ' fps';
    this.box.path.rect(0, 0, 100, 100);

    this.box.setStyle({
      fill: '#39393c'
    });
    this.text.setStyle({
      fill: '#05ed05'
    });
  }

  _renderLines() {
    let path = new Path2D;
    let data = this._data;
    let len = data.byteLength;
    // round by 4, to make more smoothing curve
    path.moveTo(0, 100 - data[0] >> 2 << 2);
    for (let i = 1; i < len; i++) {
      path.lineTo(i, 100 - data[i] >> 2 << 2);
    };
    this.context.save();
    this.context.strokeStyle = '#05ed05';
    this.context.stroke(path);
    this.context.restore();
  }

  show() {
    this.frame = new Frame(() => {
      this.update();
      this.renderGeoms(this.box);
      this.renderTexts(this.text);
      this._renderLines();
    });
    this.frame.start();
  }

  hide() {
    this.frame.stop();
    this.clear();
  }

  update() {
    this._tick++;

    //update fps
    if (this._tick % refreshRate === 0) {
      this._curTick = +(new Date);
      this._fps = (1000 / (this._curTick - this._lastTick) * refreshRate).toFixed(1);
      this._lastTick = this._curTick;
    }

    //update points
    let _old = new Uint8Array(this._data.buffer, 1);
    this._data.set(_old);
    this._data[99] = this._fps;
    
    if (this._tick % textRate === 0) {
      this.text.content = this._fps + ' fps';
    }
  }

}

export default FPS;