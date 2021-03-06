const BerryProps = ({
  berryCount = 10,
  berrySize = 0.01,
  berryColor = 0xefefef,
  berryDistanceFromStem = 0.05,
  berryRotation = 720,
  berrySpiral = true
} = {}) => {
  const props = {
    berryCount,
    berrySize,
    berryColor,
    berryDistanceFromStem,
    berryRotation,
    berrySpiral
  };
  //   const tempColorObject = {};
  //   props.hslBaseH = new Color(props.color).getHSL(tempColorObject).h;
  //   props.hslBaseS = tempColorObject.s;
  //   props.hslBaseL = tempColorObject.l;

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Berries");
    this.folder
      .addColor(props, "berryColor")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "berryCount", 0, 48, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "berrySize", 0.01, 0.25, 0.001)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "berryDistanceFromStem", 0, 0.25, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "berryRotation", 0, 1440, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "berrySpiral", true)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setBerryCount(props.berryCount);
    instance.setBerrySize(props.berrySize);
    instance.setBerryRotation(props.berryRotation);
    instance.setBerryColor(props.berryColor);
    instance.setBerryDistanceFromStem(props.berryDistanceFromStem);
    instance.setBerrySpiral(props.berrySpiral);
  };

  return {
    name: "berries",
    props,
    addFolder,
    update
  };
};

export default BerryProps;
