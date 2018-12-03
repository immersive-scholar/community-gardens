import { Group, Vector3, Box3, Object3D } from "three-full";
import { LookUpOffset, LookDownOffset } from "three/helpers/CameraOffsets";

class BaseChapter {
  constructor(props, camera, controls, R) {
    this.settings = props.settings;
    this.camera = camera;
    this.controls = controls;
    this.R = R;

    const { focusTotal = 10, timeMultiplier = 1 } = props;

    this.state = { currentFocusCount: 0, focusTotal, timeMultiplier };
    this.group = new Group();
    this.instances = [];
    this.cleanables = [];
    this.spawns = [];
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

  addCleanable(cleanable, group = cleanable) {
    this.group.add(group);
    this.cleanables.push(cleanable);
  }

  addInstances(instances) {
    for (var i = 0, iL = instances.length; i < iL; i++) {
      this.instances.push(instances[i]);
    }

    return this.instances;
  }

  getRandomInstance() {
    const index = this.R.range(this.instances.length);

    // ensure we don't select the currently selected element
    // this would mean the camera doesn't move.
    // boooooring.
    if (this.instances.length > 1 && index === this.state.currentFocusIndex) {
      return this.getRandomInstance();
    }

    this.state.currentFocusIndex = index;
    const instance = this.instances[index];
    return instance;
  }

  focusElement = ({
    element,
    delay = 1,
    duration = 1,
    offset = { x: 0, y: 0, z: 0, tx: 0, ty: 0, tz: 0 }
  }) => {
    if (!element) return null;

    this.state.currentFocusCount++;

    let boundingBox = new Box3().setFromObject(element.focalPoint);
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

    // calculate distance between two elements to keep speed consistent
    const distance = this.camera.position.distanceTo(
      new Vector3(to.x, to.y, to.z)
    );
    duration = distance * 15;

    this.controls.animate({
      to,
      delay,
      duration,
      callback: () => this.onTransitionComplete()
    });

    this.currentElement = element;
  };

  onTransitionComplete = () => {
    // if we have focused on the desired number of elements
    if (
      this.state.focusTotal &&
      this.state.currentFocusCount >= this.state.focusTotal
    ) {
      // let's pan the camera away from the scene
      // as a signal that the chapter is complete
      // we will also resolve the promise
      // so the sceneSubject knows to go on to the next chapter.
      this.returnToZero()
        .then(() => {
          return this.orbit();
        })
        .then(() => {
          return this.animateOut({
            onComplete: () => this.resolve()
          });
        });
      // otherwise, we're going to select an item and focus on it
    } else {
      const element = this.getRandomInstance();
      this.focusElement({
        element,
        delay: 2,
        duration: 10,
        offset: element.state.lookUpAt
          ? LookUpOffset(this.R)
          : LookDownOffset(this.R)
      });
    }
  };

  animateIn = ({ delay = 0 } = {}) => {
    return new Promise((resolve, reject) => {
      // We need to resolve the animateIn once a bunch of animations have run
      // so we're storing these for later retrieval.
      this.resolve = resolve;
      this.reject = reject;

      this.chapterTitle.animateIn();
      this.chapterTitle.animateOut({ delay: 15, duration: 10 });

      // this.background.animateIn({ duraction: 5, delay: 4 });
      // this.ground.animateIn({ duration: 5, delay: 2 });
      // this.ground.animateCliff({ cliff: 0.5, duration: 5, delay: 2 });

      if (this.background) {
        this.background.time = 1;
        this.background.update();
      }

      if (this.ground) {
        this.ground.time = 1;
        this.ground.cliff = 0.5;
        this.ground.update();
      }

      for (let i = 0, iL = this.spawns.length; i < iL; i++) {
        this.spawns[i].animateIn({ delay: i * 2, instanceDelay: 0.3 });
      }
    });
  };

  startGuide = ({ delay = 0, duration = 10 }) => {
    const element = this.getRandomInstance();
    // element.createChildren();
    // element.animateIn({ delay, duration });
    this.focusElement({
      element,
      delay: delay,
      duration: duration,
      offset: element.state.lookUpAt
        ? LookUpOffset(this.R)
        : LookDownOffset(this.R)
    });
  };

  animateOut = ({ delay = 0, duration = 15, onComplete = () => {} } = {}) => {
    // this.chapterTitle.animateOut();
    const to = {
      x: 0,
      y: 0.5,
      z: -1,
      tx: 0,
      ty: 0.5,
      tz: 1
    };

    this.controls.animate({
      to,
      delay,
      duration,
      callback: onComplete
    });
  };

  returnToZero = ({ duration = 10 } = {}) => {
    return new Promise(resolve => {
      const to = { x: 0, y: 0.5, z: -1, tx: 0, ty: 0.5, tz: 1 };
      // calculate distance between two elements to keep speed consistent
      const distance = this.camera.position.distanceTo(
        new Vector3(to.x, to.y, to.z)
      );
      duration = distance * 15;
      this.controls.animate({ to, duration, callback: () => resolve() });
    });
  };

  orbit = () => {
    const { timeMultiplier } = this.state;

    // 1. Spin around
    this.controls.setTimeMultiplier(timeMultiplier);
    this.controls.setAutoRotate(true);

    // 2. Call a timeout to stop spinning when done
    const duration = 60000 * (1 / timeMultiplier);
    return this.controls.animateSpin({ duration });
  };

  setTimeMultiplier = t => {
    this.state.timeMultiplier = t;
  };

  clean = () => {
    for (let i = 0, iL = this.instances.length, instance; i < iL; i++) {
      instance = this.instances[i];
      instance.clean();
      this.group.remove(instance.group);
    }
    this.instances = [];

    for (let i = 0, iL = this.cleanables.length, cleanable; i < iL; i++) {
      cleanable = this.cleanables[i];
      cleanable.clean();
      this.group.remove(cleanable);
    }
    this.cleanables = [];

    for (let i = 0, iL = this.group.children.length, instance; i < iL; i++) {
      instance = this.group.children[i];
      this.group.remove(instance);
    }
    this.group = undefined;

    this.chapterPlate && this.chapterPlate.clean();
    this.chapterTitle && this.chapterTitle.clean();
    this.controls && this.controls.killTweens();
  };
}

export default BaseChapter;
