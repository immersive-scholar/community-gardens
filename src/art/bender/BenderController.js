import * as dat from "dat.gui";
import { Vector2, Vector3 } from "three-full";

export default ({ controls }) => {
  let instance;
  const enable = () => {
    var config = {
      directionX: 1,
      directionY: 0.2,
      directionZ: 3,
      axisX: 0,
      axisY: 0,
      axisZ: 0,
      angleX: 0,
      angleY: 0,
      angleZ: 0
    };

    const onDataChange = function() {
      controls.enabled = false;
      try {
        instance.setDirection(
          new Vector3(config.directionX, config.directionY, config.directionZ)
        );
        instance.setAxis(new Vector3(config.axisX, config.axisY, config.axisZ));
        instance.setAngle(
          new Vector3(config.angleX, config.angleY, config.angleZ)
        );
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
