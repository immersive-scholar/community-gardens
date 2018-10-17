const PositionProps = () => {
  const props = {
    x: 0,
    y: 0,
    z: 0,
    rx: 0,
    ry: 0,
    rz: 0
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Position");
    this.folder
      .add(props, "x", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "y", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "z", -5, 5, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rx", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "ry", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "rz", -Math.PI, Math.PI, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.group.position.set(props.x, props.y, props.z);
    instance.group.rotation.set(props.rx, props.ry, props.rz);
  };

  return {
    name: "position",
    props,
    addFolder,
    update
  };
};

export default PositionProps;
