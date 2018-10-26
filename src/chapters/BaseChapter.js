import { Group } from "three-full";

class BaseChapter {
  constructor(props, camera, controls, R) {
    this.camera = camera;
    this.controls = controls;
    this.R = R;

    this.state = {};
    this.group = new Group();
  }

  setCamera(camera) {
    this.camera = camera;
  }

  setControls(controls) {
    this.controls = controls;
  }

  setR(R) {
    this.R = R;
  }

  focusElement({ element }) {
    console.log("element ", element);
  }

  promiseRequestAnimationFrame(isDirty) {
    new Promise(resolve =>
      window.requestAnimationFrame(() => {
        return resolve(isDirty);
      })
    );
  }

  promiseTimeoutWithCancel(ms, isDirty, callback) {
    this.isDirty = isDirty;
    this.id && window.clearTimeout(this.id);
    const p = new Promise(resolve => {
      this.id = window.setTimeout(() => {
        callback && isDirty && callback(this.isDirty);
        this.isDirty = false;
        resolve();
      }, ms);
    });
    p.cancel = () => window.clearTimeout(this.id);
    return p;
  }

  async setState(props, callback) {
    var isDirty = false || this.isDirty;
    for (var i in props) {
      if (props[i] !== this.state[i]) {
        isDirty = true;
      }
      break;
    }
    this.state = {
      ...this.state,
      ...props
    };

    return await this.promiseTimeoutWithCancel(50, isDirty, callback);
  }
}

export default BaseChapter;
