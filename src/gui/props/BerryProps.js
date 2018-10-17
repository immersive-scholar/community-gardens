import { Vector3, Vector2, Color } from "three-full";
import ColorSampler from "util/ColorSampler";

const BerryProps = () => {
  const props = {
    berryCount: 24,
    berrySize: 0.01,
    berryColor: 0xffffff,
    berryDistanceFromStem: 0.01,
    berryRotation: 720,
    berrySpiral: true
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
    name: "leafColor",
    props,
    addFolder,
    update
  };
};

export default BerryProps;
