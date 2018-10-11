import * as dat from "dat.gui";
import { Vector3 } from "three-full";

export default ({ controls }) => {
  let instance;
  const enable = () => {
    var effectController = {
      x: 0,
      y: 0,
      z: 0,
      offsetX: 0,
      offsetY: 0,
      offsetZ: 0,
      displacementX: 0,
      displacementY: 0,
      displacementZ: 0,
      height: 0.5,
      animated: true,
      leafCount: 10
    };

    const onDataChange = function() {
      controls.enabled = false;
      try {
        instance.group.position.set(
          effectController.x,
          effectController.y,
          effectController.z
        );
        instance.setHeight(effectController.height);
        instance.setOffset(
          new Vector3(
            effectController.offsetX,
            effectController.offsetY,
            effectController.offsetZ
          )
        );
        instance.setDisplacement(
          new Vector3(
            effectController.displacementX,
            effectController.displacementY,
            effectController.displacementZ
          )
        );
        instance.setAnimated(effectController.animated);
        instance.setLeafCount(effectController.leafCount);
      } catch (error) {
        console.log("Instance required ", error);
      }
    };

    const onDataChangeComplete = function() {
      controls.enabled = true;
    };

    var gui = new dat.GUI().getRoot();

    gui.addFolder("position");
    gui
      .add(effectController, "x", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "y", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "z", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    gui.addFolder("offset");
    gui
      .add(effectController, "offsetX", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "offsetY", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "offsetZ", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    gui.addFolder("displacement");
    gui
      .add(effectController, "displacementX", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "displacementY", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "displacementZ", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    gui.addFolder("Attributes");
    gui
      .add(effectController, "height", 0.1, 2, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "animated", true)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "leafCount", 0, 48, 1)
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
