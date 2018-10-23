import { Vector3, Vector2 } from "three-full";

const LeafProps = () => {
  const props = {
    leafCount: 10,
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
    sizeEndY: 0.06
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Leaves");
    this.folder
      .add(props, "leafCount", 0, 96, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "leafStartPoint", 0.1, 1.0)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "leafEndPoint", 0.1, 1.0)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationStartX", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationStartY", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationStartZ", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationEndX", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationEndY", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rotationEndZ", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "sizeStartX", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "sizeStartY", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "sizeEndX", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "sizeEndY", 0.01, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setLeafCount(props.leafCount);
    instance.setLeafStartPoint(props.leafStartPoint);
    instance.setLeafEndPoint(props.leafEndPoint);
    instance.setRotationStart(
      new Vector3(
        props.rotationStartX,
        props.rotationStartY,
        props.rotationStartZ
      )
    );
    instance.setRotationEnd(
      new Vector3(props.rotationEndX, props.rotationEndY, props.rotationEndZ)
    );
    instance.setSizeStart(new Vector2(props.sizeStartX, props.sizeStartY));
    instance.setSizeEnd(new Vector2(props.sizeEndX, props.sizeEndY));
  };

  return {
    name: "leaf",
    props,
    addFolder,
    update
  };
};

export default LeafProps;
