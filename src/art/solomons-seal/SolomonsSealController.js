import * as dat from "dat.gui";
import { Vector2, Vector3 } from "three-full";
import ColorSampler from "util/ColorSampler";

export default ({ controls }) => {
  let instance;
  const enable = () => {
    var config = {
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
      rotationStartX: 0,
      rotationStartY: 0,
      rotationStartZ: 0,
      rotationEndX: 1.5,
      rotationEndY: 1.7,
      rotationEndZ: 0.2,
      sizeStartX: 0.02,
      sizeStartY: 0.01,
      sizeEndX: 0.12,
      sizeEndY: 0.06,
      color: new ColorSampler().getRandomColor()
    };

    const onDataChange = function() {
      controls.enabled = false;
      try {
        instance.group.position.set(config.x, config.y, config.z);
        instance.setHeight(config.height);
        instance.setOffset(
          new Vector3(config.offsetX, config.offsetY, config.offsetZ)
        );
        instance.setDisplacement(
          new Vector3(
            config.displacementX,
            config.displacementY,
            config.displacementZ
          )
        );
        instance.setAnimated(config.animated);
        instance.setLeafCount(config.leafCount);
        instance.setThickness(config.thickness);
        instance.setPointCount(config.pointCount);
        instance.setLeafStartPoint(config.leafStartPoint);
        instance.setLeafEndPoint(config.leafEndPoint);
        instance.setRotationStart(
          new Vector3(
            config.rotationStartX,
            config.rotationStartY,
            config.rotationStartZ
          )
        );
        instance.setRotationEnd(
          new Vector3(
            config.rotationEndX,
            config.rotationEndY,
            config.rotationEndZ
          )
        );
        instance.setSizeStart(
          new Vector2(config.sizeStartX, config.sizeStartY)
        );
        instance.setSizeEnd(new Vector2(config.sizeEndX, config.sizeEndY));
        instance.setColor(config.color);
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
      .add(config, "x", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(config, "y", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(config, "z", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const offsetFolder = gui.addFolder("offset");
    offsetFolder
      .add(config, "offsetX", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    offsetFolder
      .add(config, "offsetY", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    offsetFolder
      .add(config, "offsetZ", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const displacementFolder = gui.addFolder("displacement");
    displacementFolder
      .add(config, "displacementX", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    displacementFolder
      .add(config, "displacementY", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    displacementFolder
      .add(config, "displacementZ", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const attributesFolder = gui.addFolder("Attributes");
    attributesFolder
      .add(config, "height", 0.1, 4, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    attributesFolder
      .add(config, "animated", true)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    attributesFolder
      .add(config, "thickness", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    attributesFolder
      .add(config, "pointCount", 4, 100)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const leavesFolder = gui.addFolder("Leaves");
    leavesFolder
      .add(config, "leafCount", 0, 48, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "leafStartPoint", 0.1, 1.0)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "leafEndPoint", 0.1, 1.0)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "rotationStartX", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "rotationStartY", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "rotationStartZ", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "rotationEndX", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "rotationEndY", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "rotationEndZ", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "sizeStartX", 0.1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "sizeStartY", 0.1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "sizeEndX", 0.1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "sizeEndY", 0.1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .addColor(config, "color")
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
