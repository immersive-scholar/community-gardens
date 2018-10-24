import { Vector3, Vector2 } from "three-full";

const GlitchProps = ({
  glitchAmplitude = 0,
  glitchAngleX = 1,
  glitchAngleY = 1,
  glitchAngleZ = 1,
  glitchThresholdX = 1,
  glitchThresholdY = 1,
  glitchThresholdZ = 1
} = {}) => {
  const props = {
    glitchAmplitude,
    glitchAngleX,
    glitchAngleY,
    glitchAngleZ,
    glitchThresholdX,
    glitchThresholdY,
    glitchThresholdZ
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Glitch");
    this.folder
      .add(props, "glitchAmplitude", 0, 0.1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "glitchAngleX", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "glitchAngleY", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "glitchAngleZ", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "glitchThresholdX", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "glitchThresholdY", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "glitchThresholdZ", 0, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setGlitchAmplitude(props.glitchAmplitude);
    instance.setGlitchAngle(
      new Vector3(props.glitchAngleX, props.glitchAngleY, props.glitchAngleZ)
    );
    instance.setGlitchThreshold(
      new Vector3(
        props.glitchThresholdX,
        props.glitchThresholdY,
        props.glitchThresholdZ
      )
    );
  };

  return {
    name: "leaf",
    props,
    addFolder,
    update
  };
};

export default GlitchProps;
