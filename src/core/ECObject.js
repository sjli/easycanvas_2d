import Transform from './Transform'
import Motion from './Motion'
import Event from './Event'

class ECObject {

  constructor() {
    this.event = new Event;
    this.transform = new Transform;
    this.motion = new Motion;
  }

  get pos() {
    return [this.transform.e, this.transform.f];
  }

  set pos([x, y] = [0, 0]) {
    let pos = this.pos;
    let dx = x - pos[0];
    let dy = y - pos[1];
    if (dx === 0 && dy === 0) {return;}
    this.translate(dx, dy);
  }

  updatePos() {
    this.motion.update();
    let vel = this.motion.vel;
    if (vel[0] ===0 && vel[1] === 0) {return;}
    this.translate(vel[0], vel[1]);
  }

  scale(...args) {
    this.transform.scaleSelf.apply(this.transform, args);
  }

  rotate(...args) {
    this.transform.rotateSelf.apply(this.transform, args);
  }

  translate(...args) {
    this.transform.translateSelf.apply(this.transform, args);
  }

  flipX() {
    this.transform.flipX();
  }

  flipY() {
    this.transform.flipY();
  }

  transformOrigin(x, y) {
    this.transform.setOrigin(x, y);
  }

}

export default ECObject;