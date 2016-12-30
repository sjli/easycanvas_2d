//animation frame
let frames = [];


class Frame {

  constructor(handler, rate) {
    if (typeof handler !== 'function') {
      throw new Error('request handler must be a function');
    }
    if (rate && !isNaN(rate)) {
      this.fpsInterval = 1000 / rate;
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
    frames.push(this);
  }

  start(flagAll) {
    if (this.requestId) {
      if (!flagAll) {
        console.log('this frame already started');
      }
      return;
    }
    this.lastTime = Date.now();
    this.requestId = requestAnimationFrame(this.handler);
  }

  stop(flagAll) {
    if (!this.requestId) {
      if (!flagAll) {
        console.log('this frame already stoped');
      }
      return;
    }
    cancelAnimationFrame(this.requestId);
    this.requestId = null;
  }

  static startAll() {
    frames.forEach(frame => {
      frame.start(true);
    });
  }

  static stopAll() {
    frames.forEach(frame => {
      frame.stop(true);
    });
  }

}

export default Frame;