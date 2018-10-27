const Animated = ({ animated = true, delay = 0, duration = 1 } = {}) => {
  const props = {
    animated,
    delay,
    duration
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Animated");
    this.folder
      .add(props, "animated")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "duration", 0, 10, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder
      .add(props, "delay", 0, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setAnimated(props.animated);
    instance.setDuration(props.duration);
    instance.setDelay(props.delay);
  };

  return {
    name: "animated",
    props,
    addFolder,
    update
  };
};

export default Animated;
