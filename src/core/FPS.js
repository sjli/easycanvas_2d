import Geometry from './Geometry';
import Text from './Text';

let silence = 30;

class FPS {

  constructor() {
    this._lastTick = +(new Date);
    this._tick = 0;
    this._fps = 0;
    this.box = new Geometry;
    this.text = new Text;
    this.text.content = this._fps + ' fps';
    this.box.path.rect(0, 0, 100, 100);
    this.box.setStyle({
      fill: '#39393c'
    });
    this.text.setStyle({
      fill: '#05ed05'
    });
  }

  update() {
    this._tick++;
    if (this._tick % silence !== 0) {return;}
    this._curTick = +(new Date);
    this._fps = Math.round(1000 / (this._curTick - this._lastTick) * silence);
    this.text.content = this._fps + ' fps';
    this._lastTick = this._curTick;
  }

}

export default FPS;