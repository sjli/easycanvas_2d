import Vector2 from './Vector2'

class Motion {

  constructor() {
    this.pos = new Vector2(); //local position of object
    this.vel = new Vector2(); //current velocity
    this.accel = new Vector2(); //current acceleration
  }

  //update velocity per frame
  update() {
    this.vel.add(this.accel);
    this.pos.add(this.vel);
  }

}

export default Motion;