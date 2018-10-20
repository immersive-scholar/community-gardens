import { Vector3, Color } from "three-full";
import ColorSampler from "util/ColorSampler";

const LeafColorProps = () => {
  const props = {
    color: ColorSampler.getRandomColor(),
    hslBaseH: 1,
    hslBaseS: 0.3,
    hslBaseL: 0.3,
    hslRangeH: 0.2,
    hslRangeS: 0,
    hslRangeL: 0.2
  };

  const tempColorObject = {};
  props.hslBaseH = new Color(props.color).getHSL(tempColorObject).h;
  props.hslBaseS = tempColorObject.s;
  props.hslBaseL = tempColorObject.l;

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Leaf Colors");
    this.folder
      .addColor(props, "color")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "hslBaseH", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "hslBaseS", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "hslBaseL", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "hslRangeH", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "hslRangeS", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "hslRangeL", 0, 1, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setColor(props.color);
    instance.setHSLBase(
      new Vector3(props.hslBaseH, props.hslBaseS, props.hslBaseL)
    );
    instance.setHSLRange(
      new Vector3(props.hslRangeH, props.hslRangeS, props.hslRangeL)
    );
  };

  return {
    name: "leafColor",
    props,
    addFolder,
    update
  };
};

export default LeafColorProps;
