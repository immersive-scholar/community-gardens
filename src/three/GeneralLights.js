import { AmbientLight, DirectionalLight } from "three-full";
import * as dat from "dat.gui";

export default ({ scene, controls }) => {
  const ambientLight = new AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // const pointLight = new SpotLight(0xffffff, 0.5);
  // pointLight.castShadow = true;
  // pointLight.shadow.mapSize.width = 2048;
  // pointLight.shadow.mapSize.height = 2048;
  // pointLight.shadow.camera.near = 10;
  // pointLight.shadow.camera.far = 500;
  // scene.add(pointLight);

  // const pointLight2 = new PointLight(0xffffff, 1);
  // pointLight2.position.set(10, 20, 10);
  // scene.add(pointLight2);

  // const pointLight3 = new PointLight(0xffffff, 1);
  // pointLight3.position.set(-10, -20, -10);
  // scene.add(pointLight3);

  // const light1 = new DirectionalLight(0xffffff, 0.8);
  // light1.position.set(0, 10, 0);
  // light1.castShadow = !true;
  // scene.add(light1);

  const light2 = new DirectionalLight(0xffffff, 0.5);
  light2.castShadow = true;
  scene.add(light2);

  var r = 2;
  light2.shadow.mapSize.set(1024, 1024);
  light2.shadow.camera.left = -r;
  light2.shadow.camera.right = r;
  light2.shadow.camera.top = r;
  light2.shadow.camera.bottom = -r;
  light2.shadow.camera.updateProjectionMatrix();

  const createControls = () => {
    var effectController = {
      x: 30,
      y: 90,
      z: -50
    };

    const onDataChange = function() {
      controls.controls.enabled = false;
      light2.position.set(
        effectController.x,
        effectController.y,
        effectController.z
      );
    };

    const onDataChangeComplete = function() {
      controls.controls.enabled = true;
    };

    var gui = new dat.GUI().getRoot();

    gui
      .add(effectController, "x", -200, 200, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "y", -200, 200, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui
      .add(effectController, "z", -200, 200, 1)
      .onChange(onDataChange)
      .onFinishChange(onDataChangeComplete);
    gui.close();

    onDataChange();
    onDataChangeComplete();
  };

  return {
    createControls
  };
};
