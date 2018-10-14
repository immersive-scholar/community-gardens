import * as dat from "dat.gui";
import { Vector2, Vector3 } from "three-full";

export default ({ controls }) => {
  let instance;
  const enable = () => {
    var config = {
      directionX: 0,
      directionY: 0,
      directionZ: 0,
      force: 1
    };

    const onDataChange = function() {
      controls.enabled = false;
      try {
        instance.setDirection(
          new Vector3(config.directionX, config.directionY, config.directionZ)
        );
        instance.setForce(config.force);
      } catch (error) {
        console.log("Instance required ", error);
      }
    };

    const onDataChangeComplete = function() {
      controls.enabled = true;
    };

    const range = 4;

    const gui = new dat.GUI().getRoot();
    gui
      .add(config, "directionX", -range, range, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(config, "directionY", -range, range, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(config, "directionZ", -range, range, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(config, "force", -range, range, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    // gui.close();

    onDataChange();
    onDataChangeComplete();
  };

  function setInstance(i) {
    instance = i;
  }

  return {
    enable,
    setInstance
  };
};
