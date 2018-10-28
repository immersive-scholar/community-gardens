import { Vector3 } from "three-full";

import AsiminaTriloba from "art/asimina-triloba/AsiminaTriloba";
import AsiminaTrilobaController from "art/asimina-triloba/AsiminaTrilobaController";
import GridLayoutHelper from "util/GridLayoutHelper";
import BaseSpawn from "art/common/BaseSpawn";

class AsiminaTrilobaSpawn extends BaseSpawn {
  init() {
    const { count, group, instances, controls, delay } = this;

    this.createChildren({ count, delay });
    this.layout({
      group,
      position: new Vector3(0, 0.25, 0),
      axis: GridLayoutHelper.LAYOUT_WALL
    });
    this.createController({ instances, controls });
  }

  createChildren({ count, delay }) {
    const { R, camera } = this;

    let instance;
    for (let x = 0, i = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        instance = new AsiminaTriloba(
          {
            delay: delay + i * 0.25,
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
              R.floatBetween(0, 0.5),
              R.floatBetween(0, 0.5)
            ),
            hslRange: new Vector3(
              R.floatBetween(0, 0.05),
              R.floatBetween(0.1, 0.25),
              R.floatBetween(0.1, 0.25)
            )
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
  }

  createController() {
    new AsiminaTrilobaController({
      controls: this.controls,
      instance: this.instances[0]
    });
  }
}

export default AsiminaTrilobaSpawn;