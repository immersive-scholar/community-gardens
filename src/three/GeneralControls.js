import { OrbitControls } from "three-full";

export default ({ camera }) => {
  const controls = new OrbitControls(camera);
  controls.enableDamping = true;
  controls.dampingFactor = 0.15;
  controls.enableKeys = true;
  controls.autoRotate = !true;
  controls.autoRotateSpeed = 0.2;
  controls.screenSpacePanning = false;

  camera.position.set(0.75, 0.45, 0.75);
  // camera.position.set(0.1, 0.1, 0.1);
  controls.update();

  // enable for console control.
  window.controls = controls;

  return controls;
};
