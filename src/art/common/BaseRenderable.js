import RandomSeed from "random-seed";

import { Group } from "three-full";

class BaseRenderable {
  constructor(props, camera, R) {
    this.camera = camera;
    this.randomSeed = props.randomSeed;
    this.R = R || RandomSeed.create(this.randomSeed);

    this.state = { visible: false, animated: true, delay: 0, duration: 1 };
    this.group = new Group();
    this.renderables = [];
  }

  add(renderable) {
    // this.group.add(renderable.group);
    // this.renderables.push(renderable);
  }

  addAll(renderables) {
    for (let i = 0, length = renderables.length, mesh; i < length; i++) {
      mesh = renderables[i];
      this.group.add(mesh.group);
      // this.renderables.push(mesh);
    }
  }

  remove(removeMe) {
    let renderable, i;
    const removed = [];

    for (i = 0; i < this.renderables.length; i++) {
      renderable = this.renderables[i];
      if (renderable === removeMe) {
        removed.push(renderable);
        this.renderables.splice(i, 1);
      }
    }

    return removed;
  }

  setCamera(camera) {
    this.camera = camera;
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

  update() {
    let renderable, i;
    for (i = 0; i < this.renderables.length; i++) {
      renderable = this.renderables[i];
      renderable.update();
      if (renderable.getIsDone()) {
        this.remove(renderable);
      }
    }
  }
}

export default BaseRenderable;
