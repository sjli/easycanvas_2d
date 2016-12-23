//animation frame
let frames = [];


class Frame {

  constructor(handler) {
    if (typeof handler !== 'function') {
      throw new Error('request handler must be a function');
    }
    this.handler = () => {
      handler();
      this.requestId = requestAnimationFrame(this.handler);
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