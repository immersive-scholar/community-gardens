import { Vector3 } from "three-full";

import SolomonsSeal from "art/solomons-seal/SolomonsSeal";
import SolomonsSealController from "art/solomons-seal/SolomonsSealController";
import BaseSpawn from "art/common/BaseSpawn";

class SolomonsSealSpawn extends BaseSpawn {
  init() {
    const { count, delay, instanceDelay } = this;

    this.createChildren({ count, delay, instanceDelay });
    // this.createController({ instances: this.instances, controls: this.controls });
  }

  createChildren({ count, delay = 0, instanceDelay = 0.5 }) {
    const { R, camera } = this;

    let instance;
    for (let i = 0; i < count; i++) {
      instance = new SolomonsSeal(
        {
          lazy: true,
          delay: delay + i * instanceDelay,
          leafCount: R.intBetween(12, 24),
          // windForce: R.floatBetween(0, 0.5),
          // windDirection: new Vector3(
          //   R.floatBetween(-0.5, 0.5),
          //   0,
          //   R.floatBetween(-0.5, 0.5)
          // ),
          hslBase: new Vector3(
            1,
            R.floatBetween(0, 0.5),
            R.floatBetween(0, 0.5)
          ),
          hslRange: new Vector3(
            R.floatBetween(0, 0.2),
            R.floatBetween(0.2, 0.4),
            R.floatBetween(0.2, 0.5)
          ),
          berryCount: R.intBetween(24, 96),
          berryDistanceFromStem: R.floatBetween(0.015, 0.05)
          // berryDisplacement: new Vector2(
          //   R.floatBetween(-0.4, 0.4),
          //   R.floatBetween(-0.4, 0.4)
          // )
          // offset: new Vector3(x * 0.02, (x + y) * 0.02, y * 0.02)
        },
        camera,
        R
      );
      this.group.add(instance.group);
      this.instances.push(instance);
    }
  }

  createController() {
    new SolomonsSealController({
      controls: this.controls,
      instance: this.instances[0]
    });
  }
}

export default SolomonsSealSpawn;
