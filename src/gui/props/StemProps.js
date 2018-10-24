import { Vector3 } from "three-full";

const StemProps = ({
  height = 0.5,
  displacementX = 0,
  displacementY = 0,
  displacementZ = 0,
  offsetX = 0,
  offsetY = 0,
  offsetZ = 0,
  thickness = 0.02,
  pointCount = 50
} = {}) => {
  const props = {
    height,
    displacementX,
    displacementY,
    displacementZ,
    offsetX,
    offsetY,
    offsetZ,
    thickness,
    pointCount
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Stem");
    this.folder
      .add(props, "height", 0.1, 4, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "thickness", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "pointCount", 4, 100)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "displacementX", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "displacementY", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "displacementZ", -1, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "offsetX", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "offsetY", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "offsetZ", -2, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setHeight(props.height);
    instance.setThickness(props.thickness);
    instance.setPointCount(props.pointCount);
    instance.setOffset(
      new Vector3(props.offsetX, props.offsetY, props.offsetZ)
    );
    instance.setDisplacement(
      new Vector3(props.displacementX, props.displacementY, props.displacementZ)
    );
  };

  return {
    name: "stem",
    props,
    addFolder,
    update
  };
};

export default StemProps;
