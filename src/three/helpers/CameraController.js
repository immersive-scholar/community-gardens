import * as dat from "dat.gui";
import { Vector2, Vector3, Color } from "three-full";

export default ({ controls, camera }) => {
  const enable = () => {
    const config = {
      sx: 0.75,
      sy: -5.5,
      sz: 0.75,
      x: 0.75,
      y: 0.45,
      z: 0.75,
      rx: 0,
      ry: -0.4,
      rz: 0,
      reset: () => {
        config.x = config.sx;
        config.y = config.sy;
        config.z = config.sz;
        controls.controls.target = new Vector3(0, 0, 0);
        onDataChangeComplete();
      },
      animateChapter: () => {
        controls.animateChapter();
      }
    };

    const onDataChange = function() {
      controls.enabled = false;
      try {
        camera.position.set(config.x, config.y, config.z);
        // controls.lookAt(new Vector3(config.rx, config.ry, config.rz));
        controls.controls.target = new Vector3(config.rx, config.ry, config.rz);

        controls.update();
      } catch (error) {
        console.log("Instance required ", error);
      }
    };

    const onDataChangeComplete = function() {
      controls.enabled = true;
    };

    const gui = new dat.GUI().getRoot();
    gui.add(config, "reset");

    const positionFolder = gui.addFolder("Position");
    positionFolder
      .add(config, "x", -25, 25, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(config, "y", -25, 25, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(config, "z", -25, 25, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    positionFolder
      .add(config, "rx", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(config, "ry", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder
      .add(config, "rz", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const animationsFolder = gui.addFolder("Animations");
    animationsFolder.add(config, "animateChapter");

    // gui.close();

    onDataChange();
    onDataChangeComplete();
  };

  return {
    enable
  };
};
