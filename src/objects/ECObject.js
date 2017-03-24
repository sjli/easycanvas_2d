import Vector2 from '../core/Vector2'
import Transform from '../core/Transform'
import Motion from '../core/Motion'
import Event from '../core/Event'

class ECObject {

  constructor() {
    this.event = new Event;
    this.transform = new Transform;
    this.motion = new Motion;
  }

  get pos() {
    return this.motion.pos;
  }

  updateMotion() {
    this.motion.update();
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
    this.transform.flipXSelf();
  }

  flipY() {
    this.transform.flipYSelf();
  }

  transformOrigin(x, y) {
    this.transform.setOrigin(x, y);
  }

  render() {
    //null
  }

}

export default ECObject;