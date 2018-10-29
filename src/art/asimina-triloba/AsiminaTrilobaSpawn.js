import { Vector3 } from "three-full";

import AsiminaTriloba from "art/asimina-triloba/AsiminaTriloba";
import AsiminaTrilobaController from "art/asimina-triloba/AsiminaTrilobaController";
import BaseSpawn from "art/common/BaseSpawn";
import { LAYOUT_RANDOM } from "art/layouts/LayoutConstants";

class AsiminaTrilobaSpawn extends BaseSpawn {
  init() {
    const {
      count,
      group,
      delay,
      instanceDelay,
      layoutType = LAYOUT_RANDOM,
      bounds = new Vector3(1, 1, 1),
      position = new Vector3()
    } = this;
    this.createChildren({ count, delay, instanceDelay });
    this.layout({
      group,
      layoutType,
      position,
      bounds
    });
    // this.createController({ instances, controls });
  }

  createChildren({ count, delay, instanceDelay = 0.25 }) {
    const { R, camera, imagePath } = this;

    let instance;
    for (let x = 0, i = 0; x < count; x++) {
      instance = new AsiminaTriloba(
        {
          delay: delay + i * instanceDelay,
          imagePath,
          petalCount: R.intBetween(6, 12),
          windForce: R.floatBetween(0, 0.1),
          windDirection: new Vector3(
            R.floatBetween(0, 0.3),
            R.floatBetween(0, 0.3),
            R.floatBetween(0, 0.3)
          ),
          openness: R.floatBetween(0, 0.1),
          hslBase: new Vector3(
            1,
            R.floatBetween(0.6, 0.95),
            R.floatBetween(0.1, 0.95)
          ),
          hslRange: new Vector3(
            R.floatBetween(0, 0.05),
            R.floatBetween(0.01, 0.025),
            R.floatBetween(0.01, 0.05)
          ),
          petalWidth: R.floatBetween(0.15, 0.5),
          petalLength: R.floatBetween(0.1, 0.3)
          // petalTarget: new Vector3(0, 10, -10),
          // berryDistanceFromStem: R.floatBetween(0.01, 0.08),
        },
        camera,
        R
      );
      this.group.add(instance.group);
      this.instances.push(instance);
      i++;
    }
  }

  createController() {
    new AsiminaTrilobaController({
      controls: this.controls,
      instance: this.instances[0]
    });
  }
}

export default AsiminaTrilobaSpawn;
