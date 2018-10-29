import { Group, Vector3 } from "three-full";
import sample from "lodash/sample";
import GridLayout from "art/layouts/GridLayout";
import RandomLayout from "art/layouts/RandomLayout";
import {
  LAYOUT_RANDOM,
  LAYOUT_FLOOR,
  LAYOUT_WALL
} from "art/layouts/LayoutConstants";

class BaseSpawn {
  constructor({
    R,
    camera,
    controls,
    delay = 0,
    instanceDelay = 0.5,
    count = 1,
    bounds = new Vector3(1, 1, 1),
    position = new Vector3(),
    layoutType = LAYOUT_RANDOM,
    imagePath
  } = {}) {
    this.R = R;
    this.camera = camera;
    this.controls = controls;
    this.intervalID = 0;
    this.delay = delay;
    this.instanceDelay = instanceDelay;
    this.group = new Group();
    this.count = count;
    this.bounds = bounds;
    this.position = position;
    this.layoutType = layoutType;
    this.instances = [];
    this.imagePath = imagePath;

    this.init();
  }

  init() {
    this.createChildren({ count: this.count });
    this.layout({ layoutType: this.layoutType });
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
    layoutType = LAYOUT_RANDOM,
    rowWidth = 0.5,
    columnHeight = 0.5,
    layoutAxis = GridLayout.LAYOUT_WALL,
    bounds = new Vector3(1, 1, 1),
    position = new Vector3()
  } = {}) {
    switch (layoutType) {
      case LAYOUT_RANDOM:
        RandomLayout({
          R: this.R,
          group: this.group,
          bounds,
          position
        });
        break;
      case LAYOUT_WALL:
      case LAYOUT_FLOOR:
        // arrange layout
        GridLayout({
          layoutType,
          group: this.group,
          rows: Math.sqrt(this.count),
          columns: Math.sqrt(this.count),
          rowWidth,
          columnHeight,
          layoutAxis
        });
        this.group.position.copy(position);
        break;
      default:
        break;
    }
  }

  animateIn({ duration = 1, delay = 0, instanceDelay = 0.5 } = {}) {
    for (let i = 0, iL = this.instances.length; i < iL; i++) {
      this.instances[i].createChildren();
      this.instances[i].animateIn({
        duration,
        delay: delay + i * instanceDelay
      });
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
