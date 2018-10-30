import { Group, Vector3, Box3, Object3D } from "three-full";

class BaseChapter {
  constructor(props, camera, controls, R) {
    this.settings = props.settings;
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

  onTransitionComplete() {
    // const element = this.asiminaTrilobaSpawn.getRandomInstance();
    // this.focusElement({ element, delay: 2 });
  }

  animate({ to, delay = 2, duration = 10, onComplete = () => {} }) {
    this.controls.animate({
      to,
      delay,
      duration,
      callback: () => {
        onComplete();
        this.onTransitionComplete();
      }
    });
  }

  focusElement({
    element,
    delay = 2,
    duration,
    offset = { x: 0, y: 0, z: 0, tx: 0, ty: 0, tz: 0 }
  }) {
    if (!element) return null;

    let boundingBox = new Box3().setFromObject(element.group);
    let center = new Vector3();
    boundingBox.getCenter(center);
    let tempObject = new Object3D();
    tempObject.position.set(center);
    let position = new Vector3(center.x, center.y, center.z);
    tempObject.localToWorld(position);

    const to = {
      x: position.x + offset.x,
      y: position.y + offset.y,
      z: position.z - 0.5 + offset.z,
      tx: position.x + offset.tx,
      ty: position.y + offset.ty,
      tz: position.z + offset.tz
    };

    this.controls.animate({
      to,
      delay,
      duration,
      callback: () => this.onTransitionComplete()
    });
  }
}

export default BaseChapter;
