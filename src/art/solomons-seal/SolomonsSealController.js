import * as dat from "dat.gui";
import { Vector2, Vector3 } from "three-full";

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
      leafCount: 10,
      thickness: 0.02,
      pointCount: 50,
      leafStartPoint: 0.3,
      leafEndPoint: 1,
      rotationStepX: 0.5,
      rotationStepY: 1.7,
      rotationStepZ: 0.2,
      sizeStepX: 0.2,
      sizeStepY: 0.2
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
        instance.setThickness(effectController.thickness);
        instance.setPointCount(effectController.pointCount);
        instance.setLeafStartPoint(effectController.leafStartPoint);
        instance.setLeafEndPoint(effectController.leafEndPoint);
        instance.setRotationStep(
          new Vector3(
            effectController.rotationStepX,
            effectController.rotationStepY,
            effectController.rotationStepZ
          )
        );
        instance.setSizeStep(
          new Vector2(effectController.sizeStepX, effectController.sizeStepY)
        );
      } catch (error) {
        console.log("Instance required ", error);
      }
    };

    const onDataChangeComplete = function() {
      controls.enabled = true;
    };

    const gui = new dat.GUI().getRoot();

    const positionFolder = gui.addFolder("position");
    positionFolder
      .add(effectController, "x", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(effectController, "y", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(effectController, "z", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const offsetFolder = gui.addFolder("offset");
    offsetFolder
      .add(effectController, "offsetX", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    offsetFolder
      .add(effectController, "offsetY", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    offsetFolder
      .add(effectController, "offsetZ", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const displacementFolder = gui.addFolder("displacement");
    displacementFolder
      .add(effectController, "displacementX", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    displacementFolder
      .add(effectController, "displacementY", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    displacementFolder
      .add(effectController, "displacementZ", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const attributesFolder = gui.addFolder("Attributes");
    attributesFolder
      .add(effectController, "height", 0.1, 4, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    attributesFolder
      .add(effectController, "animated", true)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    attributesFolder
      .add(effectController, "thickness", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    attributesFolder
      .add(effectController, "pointCount", 4, 100)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const leavesFolder = gui.addFolder("Leaves");
    leavesFolder
      .add(effectController, "leafCount", 0, 48, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(effectController, "leafStartPoint", 0.1, 1.0)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(effectController, "leafEndPoint", 0.1, 1.0)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(effectController, "rotationStepX", -3, 3, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(effectController, "rotationStepY", -3, 3, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(effectController, "rotationStepZ", -3, 3, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(effectController, "sizeStepX", 0.1, 2, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(effectController, "sizeStepY", 0.1, 2, 0.1)
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
