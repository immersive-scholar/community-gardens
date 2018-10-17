import { Vector3 } from "three-full";

const StemProps = () => {
  const props = {
    windForce: 0,
    windDirectionX: 0,
    windDirectionY: 0,
    windDirectionZ: 0
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Wind");
    this.folder
      .add(props, "windForce", -1, 1, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "windDirectionX", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "windDirectionY", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "windDirectionZ", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setWindForce(props.windForce);
    instance.setWindDirection(
      new Vector3(
        props.windDirectionX,
        props.windDirectionY,
        props.windDirectionZ
      )
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
