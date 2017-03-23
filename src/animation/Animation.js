let animations = [];


class Animation {

  constructor(handler, rate) {
    if (typeof handler !== 'function') {
      throw new Error('request handler must be a function');
    }
    if (rate && !isNaN(rate)) {
      this.setRate(rate);
    }
    this.handler = () => {
      this.requestId = requestAnimationFrame(this.handler);
      if (!this.fpsInterval) {
        handler();
      } else {

        //throttle to a specific frame rate
        let now = Date.now();

        if (now - this.lastTime > this.fpsInterval) {
          this.lastTime = now;
          handler();
        }

      }
      
      
    };
    this.requestId = null;
    animations.push(this);
  }

  setRate(rate) {
    this.fpsInterval = 1000 / rate;
  }

  start(flagAll) {
    if (this.requestId) {
      if (!flagAll) {
        console.log('this animation already started');
      }
      return;
    }
    this.lastTime = Date.now();
    this.requestId = requestAnimationFrame(this.handler);
  }

  stop(flagAll) {
    if (!this.requestId) {
      if (!flagAll) {
        console.log('this animation already stoped');
      }
      return;
    }
    cancelAnimationFrame(this.requestId);
    this.requestId = null;
  }

  static startAll() {
    animations.forEach(animation => {
      animation.start(true);
    });
  }

  static stopAll() {
    animations.forEach(animation => {
      animation.stop(true);
    });
  }

}

export default Animation;