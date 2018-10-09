import { PerspectiveCamera } from "three-full";

export default ({ width, height }) => {
  const aspectRatio = width / height;
  const fieldOfView = 70;
  const nearPlane = 0.01;
  const farPlane = 1000;
  const camera = new PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  // TODO remove this for production; it's just to trace window.camera.position
  window.camera = camera;

  return camera;
};
