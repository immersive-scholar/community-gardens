import { Vector3 } from "three-full";

import StellariaPubera from "art/stellaria-pubera/StellariaPubera";
import StellariaPuberaController from "art/stellaria-pubera/StellariaPuberaController";
import GridLayout from "art/layouts/GridLayout";
import BaseSpawn from "art/common/BaseSpawn";
import { LAYOUT_WALL } from "art/layouts/LayoutConstants";

class StellariaPuberaSpawn extends BaseSpawn {
  init() {
    const {
      count,
      group,
      instances,
      controls,
      delay,
      instanceDelay,
      layoutType = LAYOUT_WALL,
      bounds = new Vector3(1, 1, 1),
      position = new Vector3()
    } = this;

    this.createChildren({ count, delay, instanceDelay });
    this.layout({
      group,
      rowWidth: 0.5,
      columnHeight: 0.5,
      position: new Vector3(0, 0.25, 0),
      layoutType
    });

    this.createController({ instances, controls });
  }

  createChildren({ count, delay }) {
    const { R, camera } = this;

    let instance;
    for (let i = 0; i < count; i++) {
      instance = new StellariaPubera(
        {
          delay: i * 0.25,
          petalCount: 10, //R.intBetween(24, 48),
          windForce: R.floatBetween(-0.3, 0),
          windDirection: new Vector3(
            R.floatBetween(-1.5, 1.5),
            R.floatBetween(-1.5, 1.5),
            R.floatBetween(-1.5, 1.5)
          ),
          hslBase: new Vector3(
            1,
            R.floatBetween(0, 0.5),
            R.floatBetween(0, 0.5)
          ),
          hslRange: new Vector3(
            R.floatBetween(0, 0.05),
            R.floatBetween(0.1, 0.25),
            R.floatBetween(0.1, 0.25)
          ),
          petalTarget: new Vector3(0, 10, -10),
          openness: R.floatBetween(0, 2),
          berryCount: R.intBetween(16, 32),
          berryDistanceFromStem: R.floatBetween(0.01, 0.08),
          berrySpiralDepth: R.floatBetween(0.01, 0.15)
        },
        camera,
        R
      );
      this.group.add(instance.group);
      this.instances.push(instance);
    }
  }

  createController() {
    new StellariaPuberaController({
      controls: this.controls,
      instance: this.instances[0]
    });
  }
}

export default StellariaPuberaSpawn;
