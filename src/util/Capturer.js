import CCapture from "ccapture.js";

export default class Capturer {
  constructor(userAgent = null) {
    this.capturer = new CCapture({ format: "webm" });
    document.body.addEventListener("keyup", e => this.keyHandler(e));
  }

  start() {
    this.capturer.start();
  }

  stop() {
    this.capturer.stop();
  }

  clean() {
    document.body.removeEventListener("keyup", e => this.keyHandler(e));
  }

  capture(canvas) {
    this.capturer.capture(canvas);
  }

  keyHandler(e) {
    switch (e.key) {
      case "[":
        this.capturer.start();
        break;
      case "]":
        this.capturer.stop();
        this.capturer.save();
        break;
      default:
        // console.log(e);
        break;
    }
  }
}
