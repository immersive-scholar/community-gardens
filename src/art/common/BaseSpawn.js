import { Group, Vector3 } from "three-full";
import sample from "lodash/sample";
import GridLayoutHelper from "util/GridLayoutHelper";

class BaseSpawn {
  constructor({ R, camera, controls, delay = 0, count = 1 } = {}) {
    this.R = R;
    this.camera = camera;
    this.controls = controls;
    this.intervalID = 0;
    this.delay = delay;
    this.group = new Group();
    this.count = count;
    this.instances = [];

    this.init();
  }

  init() {
    this.createChildren({ count: this.count });
    this.layout();
    this.createController();
  }

  createChildren({ count = 1 } = {}) {
    // for (let x = 0, i = 0; x < count; x++) {
    //   for (let y = 0; y < count; y++) {
    //     // instace = new Instance({},
    //       camera,
    //       R
    //     );
    //     group.add(instance.group);
    //     instances.push(instance);
    //     i++;
    //   }
    // }
  }

  layout({
    rowWidth = 0.5,
    columnHeight = 0.5,
    layoutAxis = GridLayoutHelper.LAYOUT_WALL,
    position = new Vector3()
  } = {}) {
    // arrange layout
    GridLayoutHelper({
      group: this.group,
      rows: this.count,
      columns: this.count,
      rowWidth,
      columnHeight,
      layoutAxis
    });

    this.group.position.copy(position);
  }

  animateIn({ duration = 1, delay = 0 } = {}) {
    for (let i = 0, iL = this.instances.length; i < iL; i++) {
      this.instances[i].createChildren();
      this.instances[i].animateIn({ duration, delay: delay + i * 0.5 });
    }
  }

  createController() {
    // override
    //   new AsiminaTrilobaController({
    //     controls,
    //     instance: this.instances[0]
    //   });
  }

  autoClean() {
    this.clean();
    this.intervalID = setInterval(() => this.cleanInstances(), 500);
  }

  clean() {
    this.intervalID && clearInterval(this.intervalID);
  }

  cleanInstances() {
    const removeMe = [];
    const cameraPosition = new Vector3().setFromMatrixPosition(
      this.camera.matrixWorld
    );
    const lookAt = new Vector3();
    this.camera.getWorldDirection(lookAt);

    for (
      let i = 0, instance, coordinates = new Vector3(), behind = false;
      i < this.instances.length;
      i++
    ) {
      instance = this.instances[i];
      coordinates.setFromMatrixPosition(instance.group.matrixWorld);
      coordinates.sub(cameraPosition);
      behind = coordinates.angleTo(lookAt) > Math.PI / 2;
      if (behind) {
        removeMe.push({ instance, index: i });
      }
    }

    for (let i = removeMe.length - 1, data; i >= 0; i--) {
      data = removeMe[i];
      this.removeInstance(data.instance, data.index);
    }
  }

  removeInstance(instance, index) {
    console.log("Removing: ", instance, index);
    instance.clean();
    this.group.remove(instance.group);
    this.instances.splice(index, 1);
    instance = undefined;
  }

  getRandomInstance() {
    return sample(this.instances);
  }
}

export default BaseSpawn;
