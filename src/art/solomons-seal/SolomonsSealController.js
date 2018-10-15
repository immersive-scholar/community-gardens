import * as dat from "dat.gui";
import { Vector2, Vector3, Color } from "three-full";
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
      windForce: 0,
      windDirectionX: 0,
      windDirectionY: 0,
      windDirectionZ: 0,
      color: new ColorSampler().getRandomColor(),
      hslBaseH: 1,
      hslBaseS: 0.3,
      hslBaseL: 0.3,
      hslRangeH: 0.2,
      hslRangeS: 0,
      hslRangeL: 0.2,
      glitchAmplitude: 0,
      glitchAngleX: 1,
      glitchAngleY: 1,
      glitchAngleZ: 1,
      glitchThresholdX: 1,
      glitchThresholdY: 1,
      glitchThresholdZ: 1,
      berryCount: 24,
      berrySize: 0.01,
      berryColor: 0xffffff,
      berryDistanceFromStem: 0.01,
      berryRotation: 720,
      berrySpiral: true
    };

    const tempColorObject = {};
    config.hslBaseH = new Color(config.color).getHSL(tempColorObject).h;
    config.hslBaseS = tempColorObject.s;
    config.hslBaseL = tempColorObject.l;

    const onDataChange = function() {
      controls.controls.enabled = false;
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
        instance.setWindForce(config.windForce);
        instance.setWindDirection(
          new Vector3(
            config.windDirectionX,
            config.windDirectionY,
            config.windDirectionZ
          )
        );
        instance.setColor(config.color);
        instance.setHSLBase(
          new Vector3(config.hslBaseH, config.hslBaseS, config.hslBaseL)
        );
        instance.setHSLRange(
          new Vector3(config.hslRangeH, config.hslRangeS, config.hslRangeL)
        );
        instance.setGlitchAmplitude(config.glitchAmplitude);
        instance.setGlitchAngle(
          new Vector3(
            config.glitchAngleX,
            config.glitchAngleY,
            config.glitchAngleZ
          )
        );
        instance.setGlitchThreshold(
          new Vector3(
            config.glitchThresholdX,
            config.glitchThresholdY,
            config.glitchThresholdZ
          )
        );
        instance.setBerryCount(config.berryCount);
        instance.setBerrySize(config.berrySize);
        instance.setBerryRotation(config.berryRotation);
        instance.setBerryColor(config.berryColor);
        instance.setBerryDistanceFromStem(config.berryDistanceFromStem);
        instance.setBerrySpiral(config.berrySpiral);
      } catch (error) {
        console.log("Instance required ", error);
      }
    };

    const onDataChangeComplete = function() {
      controls.controls.enabled = true;
    };

    const gui = new dat.GUI().getRoot();

    const positionFolder = gui.addFolder("Position");
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

    const offsetFolder = gui.addFolder("Offset");
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

    const displacementFolder = gui.addFolder("Displacement");
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
      .add(config, "leafCount", 0, 96, 1)
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
      .add(config, "sizeStartX", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "sizeStartY", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "sizeEndX", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesFolder
      .add(config, "sizeEndY", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const leavesColor = gui.addFolder("Leaf Colors");
    leavesColor
      .addColor(config, "color")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesColor
      .add(config, "hslBaseH", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesColor
      .add(config, "hslBaseS", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesColor
      .add(config, "hslBaseL", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesColor
      .add(config, "hslRangeH", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesColor
      .add(config, "hslRangeS", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    leavesColor
      .add(config, "hslRangeL", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const windFolder = gui.addFolder("Wind");
    windFolder
      .add(config, "windForce", -1, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    windFolder
      .add(config, "windDirectionX", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    windFolder
      .add(config, "windDirectionY", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    windFolder
      .add(config, "windDirectionZ", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const glitchFolder = gui.addFolder("Glitch");
    glitchFolder
      .add(config, "glitchAmplitude", 0, 0.1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    glitchFolder
      .add(config, "glitchAngleX", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    glitchFolder
      .add(config, "glitchAngleY", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    glitchFolder
      .add(config, "glitchAngleZ", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    glitchFolder
      .add(config, "glitchThresholdX", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    glitchFolder
      .add(config, "glitchThresholdY", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    glitchFolder
      .add(config, "glitchThresholdZ", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const berryFolder = gui.addFolder("Berries");
    berryFolder
      .addColor(config, "berryColor")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    berryFolder
      .add(config, "berryCount", 0, 48, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    berryFolder
      .add(config, "berrySize", 0.01, 0.25, 0.001)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    berryFolder
      .add(config, "berryDistanceFromStem", 0, 0.25, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    berryFolder
      .add(config, "berryRotation", 0, 1440, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    berryFolder
      .add(config, "berrySpiral", true)
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
