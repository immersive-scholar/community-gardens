import { Vector3 } from "three-full";

const PetalProps = ({
  openness = 0,
  petalCount = 10,
  rearPetalCount = 6,
  petalWidth = 0.025,
  petalLength = 0.25,
  petalDistanceFromCenter = 0.015,
  rotationAxisX = 0,
  rotationAxisY = 0,
  rotationAxisZ = Math.PI / 2,
  rotationAngle = 0.4,
  translateToY = 0
} = {}) => {
  const props = {
    openness,
    petalCount,
    rearPetalCount,
    petalWidth,
    petalLength,
    petalDistanceFromCenter,
    rotationAxisX,
    rotationAxisY,
    rotationAxisZ,
    rotationAngle,
    translateToY
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Petals");
    this.folder
      .add(props, "openness", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "petalCount", 3, 48, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rearPetalCount", 3, 48, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "petalWidth", 0.01, 0.5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "petalLength", 0.01, 0.5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "petalDistanceFromCenter", 0.0, 0.5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationAxisX", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationAxisY", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationAxisZ", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationAngle", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "translateToY", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setOpenness(props.openness);
    instance.setPetalCount(props.petalCount);
    instance.setRearPetalCount(props.rearPetalCount);
    instance.setPetalWidth(props.petalWidth);
    instance.setPetalLength(props.petalLength);
    instance.setPetalDistanceFromCenter(props.petalDistanceFromCenter);
    instance.setRotationAxis(
      new Vector3(
        props.rotationAxisX,
        props.rotationAxisY,
        props.rotationAngleZ
      )
    );
    instance.setRotationAngle(props.rotationAngle);
    instance.setTranslateToY(props.translateToY);
  };

  return {
    name: "petals",
    props,
    addFolder,
    update
  };
};

export default PetalProps;
