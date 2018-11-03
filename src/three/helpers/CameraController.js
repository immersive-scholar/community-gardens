import * as dat from "dat.gui";
import { Vector3 } from "three-full";

export default ({ controls, camera, settings }) => {
  const { timeMultiplier } = settings;
  const enable = () => {
    const config = {
      velocity: timeMultiplier,
      x: 0,
      y: 0.5,
      z: -1,
      tx: 0,
      ty: 0.5,
      tz: 1,
      autoRotate: false,
      kill: () => {
        controls.killTweens();
      },
      reset: () => {
        const { original } = config;
        configXSlider.setValue(original.x);
        configYSlider.setValue(original.y);
        configZSlider.setValue(original.z);
        configTargetXSlider.setValue(original.tx);
        configTargetYSlider.setValue(original.ty);
        configTargetZSlider.setValue(original.tz);
        onDataChangeComplete();
      },
      animateChapter1: () => {
        controls.animateChapter1();
      },
      animateChapter2: () => {
        controls.animateChapter2();
      },
      getCameraPosition: () => {
        configXSlider.setValue(camera.position.x);
        configYSlider.setValue(camera.position.y);
        configZSlider.setValue(camera.position.z);
        configTargetXSlider.setValue(camera.rotation.x);
        configTargetYSlider.setValue(camera.rotation.y);
        configTargetZSlider.setValue(camera.rotation.z);
        onDataChange();
        onDataChangeComplete();
      }
    };

    config.original = {
      x: config.x,
      y: config.y,
      z: config.z,
      tx: config.tx,
      ty: config.ty,
      tz: config.tz
    };

    const onDataChange = function() {
      controls.enabled = false;
      try {
        camera.position.set(config.x, config.y, config.z);
        // controls.lookAt(new Vector3(config.tx, config.ty, config.tz));
        controls.controls.target = new Vector3(config.tx, config.ty, config.tz);
        controls.controls.autoRotate = config.autoRotate;
        controls.setGlobalTimeScale(config.velocity);

        settings.setTimeMultiplier(config.velocity);

        controls.update();
      } catch (error) {
        console.log("Instance required ", error);
      }
    };

    const onDataChangeComplete = function() {
      controls.enabled = true;
    };

    const gui = new dat.GUI().getRoot();
    gui.add(config, "kill");
    gui.add(config, "reset");
    gui
      .add(config, "velocity", 0, 2, 0.01)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

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

    const configTargetXSlider = positionFolder
      .add(config, "tx", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    const configTargetYSlider = positionFolder
      .add(config, "ty", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    const configTargetZSlider = positionFolder
      .add(config, "tz", -5, 5, 0.1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    positionFolder.add(config, "getCameraPosition");

    const animationsFolder = gui.addFolder("Animations");
    animationsFolder.add(config, "animateChapter1");
    animationsFolder.add(config, "animateChapter2");
    animationsFolder
      .add(config, "autoRotate")
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);

    gui.close();

    onDataChange();
    onDataChangeComplete();
  };

  return {
    enable
  };
};
