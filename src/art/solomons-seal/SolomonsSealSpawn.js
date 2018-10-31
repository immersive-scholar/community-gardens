import SolomonsSeal from "art/solomons-seal/SolomonsSeal";
import SolomonsSealController from "art/solomons-seal/SolomonsSealController";
import BaseSpawn from "art/common/BaseSpawn";
import PlantModelToSolomonsSealProps from "transformers/PlantModelToSolomonsSealProps";
import InsecurityCalculator from "data/InsecurityCalculator";

class SolomonsSealSpawn extends BaseSpawn {
  init() {
    const { data, count, delay, instanceDelay } = this;

    this.createChildren({ data, count, delay, instanceDelay });
    // this.createController({ instances: this.instances, controls: this.controls });
  }

  createChildren({ data, count, delay = 0, instanceDelay = 0.5 }) {
    const { R, camera } = this;

    let instance,
      plantModel,
      props,
      stats = InsecurityCalculator.stats;
    for (let i = 0; i < count; i++) {
      plantModel = data[i];
      props = PlantModelToSolomonsSealProps({
        model: plantModel,
        stats,
        i,
        delay,
        instanceDelay,
        R
      });
      instance = new SolomonsSeal(props, camera, R);
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
