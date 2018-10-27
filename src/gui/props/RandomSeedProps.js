const RandomSeed = ({ seed = String(Math.random()) } = {}) => {
  const props = {
    seed,
    randomize: () => {
      props.seed = String(Math.random());
      this.folder.__controllers[0].setValue(props.seed);
    }
  };

  const addFolder = ({ gui, onDataChange, onDataChangeComplete }) => {
    this.folder = gui.addFolder("Random");
    this.folder
      .add(props, "seed", 0, 10, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    this.folder.add(props, "randomize").onFinishChange(onDataChangeComplete);
  };

  const update = instance => {
    instance.setRandomSeed(props.seed);
  };

  return {
    name: "random-seed",
    props,
    addFolder,
    update
  };
};

export default RandomSeed;
