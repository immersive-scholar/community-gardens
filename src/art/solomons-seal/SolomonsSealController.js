import * as dat from "dat.gui";

export default ({ controls }) => {
  let instance;
  const enable = () => {
    var effectController = {
      x: 0,
      y: 0,
      z: 0,
      height: 0.5
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
      } catch (error) {
        console.log("Instance required ", error);
      }
    };

    const onDataChangeComplete = function() {
      controls.enabled = true;
    };

    var gui = new dat.GUI().getRoot();

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
    gui
      .add(effectController, "height", 0.1, 2, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui.close();

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
