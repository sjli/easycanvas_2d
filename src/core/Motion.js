class Motion {

  constructor() {
    var _motion = new Uint16Array(6);
    this.pos = new Uint16Array(_motion.buffer, 0, 2);
    this.vel = new Uint16Array(_motion.buffer, 4, 2);
    this.accel = new Uint16Array(_motion.buffer, 8, 2);
  }

  setVel([x, y] = [0, 0]) {
    this.vel[0] = x;
    this.vel[1] = y;
  }

  setAccel([x, y] = [0, 0]) {
    this.accel[0] = x;
    this.accel[1] = y;
  }

  //update velocity per frame
  update() {
    this.vel[0] += this.accel[0];
    this.vel[1] += this.accel[1];
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

}

export default Motion;