const Animated = ({ animated = true } = {}) => {
  const props = {
    animated
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Animated");
    this.folder
      .add(props, "animated")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setAnimated(props.animated);
  };

  return {
    name: "animated",
    props,
    addFolder,
    update
  };
};

export default Animated;
