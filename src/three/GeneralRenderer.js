import { WebGLRenderer } from "three-full";

export default ({ canvas, width, height }) => {
  const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: !true,
    logarithmicDepthBuffer: false,
    preserveDrawingBuffer: true
  });
  const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
  renderer.setPixelRatio(DPR);
  renderer.setSize(width, height);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;

  return renderer;
};
