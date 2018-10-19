import * as dat from "dat.gui";
import { Vector3 } from "three-full";

export default ({ controls, camera }) => {
  const enable = () => {
    const config = {
      x: 0,
      y: 0,
      z: -0.5,
      rx: 0,
      ry: 0,
      rz: 1,
      autoRotate: false,
      reset: () => {
        const { original } = config;
        configXSlider.setValue(original.x);
        configYSlider.setValue(original.y);
        configZSlider.setValue(original.z);
        configRXSlider.setValue(original.rx);
        configRYSlider.setValue(original.ry);
        configRZSlider.setValue(original.rz);
        onDataChangeComplete();
      },
      animateChapter: () => {
        controls.animateChapter();
      },
      animateChapter2: () => {
        controls.animateChapter2();
      },
      getCameraPosition: () => {
        configXSlider.setValue(camera.position.x);
        configYSlider.setValue(camera.position.y);
        configZSlider.setValue(camera.position.z);
        configRXSlider.setValue(camera.rotation.x);
        configRYSlider.setValue(camera.rotation.y);
        configRZSlider.setValue(camera.rotation.z);
        onDataChange();
        onDataChangeComplete();
      }
    };

    config.original = {
      x: config.x,
      y: config.y,
      z: config.z,
      rx: config.rx,
      ry: config.ry,
      rz: config.rz
    };

    const onDataChange = function() {
      controls.enabled = false;
      try {
        camera.position.set(config.x, config.y, config.z);
        // controls.lookAt(new Vector3(config.rx, config.ry, config.rz));
        controls.controls.target = new Vector3(config.rx, config.ry, config.rz);
        controls.controls.autoRotate = config.autoRotate;

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
    const configXSlider = positionFolder
      .add(config, "x", -25, 25, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    const configYSlider = positionFolder
      .add(config, "y", -25, 25, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    const configZSlider = positionFolder
      .add(config, "z", -25, 25, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    const configRXSlider = positionFolder
      .add(config, "rx", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    const configRYSlider = positionFolder
      .add(config, "ry", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    const configRZSlider = positionFolder
      .add(config, "rz", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder.add(config, "getCameraPosition");

    const animationsFolder = gui.addFolder("Animations");
    animationsFolder.add(config, "animateChapter");
    animationsFolder.add(config, "animateChapter2");
    animationsFolder
      .add(config, "autoRotate")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    // gui.close();

    onDataChange();
    onDataChangeComplete();
  };

  return {
    enable
  };
};
