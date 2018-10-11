import { Group } from "three-full";

class BaseRenderable {
  constructor(props) {
    this.state = {};
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

  setState(props) {
    var isDirty = false;
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

    return isDirty;
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
