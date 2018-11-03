import AsiminaTriloba from "art/asimina-triloba/AsiminaTriloba";
import AsiminaTrilobaController from "art/asimina-triloba/AsiminaTrilobaController";
import PlantModelToAsiminaTrilobaProps from "transformers/PlantModelToAsiminaTrilobaProps";
import BaseSpawn from "art/common/BaseSpawn";
import InsecurityCalculator from "data/InsecurityCalculator";

class AsiminaTrilobaSpawn extends BaseSpawn {
  init() {
    const { data, count, delay, instanceDelay, dataOffset } = this;

    this.createChildren({ data, count, delay, instanceDelay, dataOffset });
    // this.createController({ instances: this.instances, controls: this.controls });
  }

  createChildren({ data, count, delay = 0, instanceDelay = 0.5, dataOffset }) {
    const { R, camera } = this;

    let instance,
      stats = InsecurityCalculator.stats;

    for (let i = 0, plantModel, props; i < count; i++) {
      plantModel = data[i + dataOffset];
      props = PlantModelToAsiminaTrilobaProps({
        model: plantModel,
        stats,
        i,
        delay,
        instanceDelay,
        R
      });
      instance = new AsiminaTriloba(props, camera, R);
      this.group.add(instance.group);
      this.instances.push(instance);
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
