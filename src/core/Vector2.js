class Vector2 {

  constructor(x = 0, y = 0) {

    var vector = new Float32Array(2);

    vector[0] = x;
    vector[1] = y;

    this.__vector = vector;

  }

  set(x, y) {
    this.__vector[0] = x;
    this.__vector[1] = y;
    return this;
  }

  get x() {
    return this.__vector[0];
  }

  set x(val) {
    this.__vector[0] = val;
    return val;
  }

  get y() {
    return this.__vector[1];
  }

  set y(val) {
    this.__vector[1] = val;
    return val;
  }

  get len() {
    var x = this.__vector[0], y = this.__vector[1];
    return Math.sqrt(x * x + y * y);
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  normalize() {
    var x = this.__vector[0], y = this.__vector[1];
    var len = this.len;
    var nx, ny;

    if (len === 0) {
      nx = 0;
      ny = 0;
    } else {
      nx = x / len;
      ny = y / len;
    }

    return new Vector2(nx, ny);
  }

  direct() {
    var x = this.__vector[0], y = this.__vector[1];
    var dx = 0, dy = 0;
    if (x) {
      dx = x / Math.abs(x); //0, 1, -1
    }
    if (y) {
      dy = y / Math.abs(y);
    }
    return new Vector2(dx, dy);
  }

  add(v) {
    this.set(this.x + v.x, this.y + v.y);
    return this;
  }

  minus(v) {
    this.set(this.x - v.x, this.y - v.y);
    return this;
  }

  static add(v1, v2) {
    return v1.clone().add(v2);
  }

  static minus(v1, v2) {
    return v1.clone().minus(v2);
  }

  static len(v1, v2) {
    var x = v1.x - v2.x;
    var y = v1.y - v2.y;
    return Math.sqrt(x * x + y * y);
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static shadow(v1, v2) {
    return Vector2.dot(v1, v2) / v2.len;
  }

  static proj(v1, v2) {
    var pro = Vector2.dot(v1, v2) / v2.len / v2.len;
    return new Vector2(pro * v2.x, pro * v2.y);
  }

  static perp(v1, v2) {
    return Vector2.minus(v1, Vector2.proj(v1, v2));
  }

}

export default Vector2