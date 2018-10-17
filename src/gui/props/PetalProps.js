const PetalProps = () => {
  const props = {
    openness: 0,
    petalCount: 10,
    petalWidth: 0.0125,
    petalLength: 0.125,
    petalDistanceFromCenter: 0.015
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
  };

  const update = instance => {
    instance.setOpenness(props.openness);
    instance.setPetalCount(props.petalCount);
    instance.setPetalWidth(props.petalWidth);
    instance.setPetalLength(props.petalLength);
    instance.setPetalDistanceFromCenter(props.petalDistanceFromCenter);
  };

  return {
    name: "petals",
    props,
    addFolder,
    update
  };
};

export default PetalProps;
