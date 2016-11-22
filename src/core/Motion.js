class Motion {

  constructor() {
    this.setAccel();
    this.setVel();
  }

  setVel({x = 0, y = 0} = {}) {
    this.vel = {x, y}; //pixel per frame
  }

  setAccel({x = 0, y = 0} = {}) {
    this.accel = {x, y}; //velocity change per frame
  }

  //update velocity per frame
  update(pos) {
    this.vel.x += this.accel.x;
    this.vel.y += this.accel.y;
    pos.x += this.vel.x;
    pos.y += this.vel.y;
    return pos;
  }

}

export default Motion;