import {
  WebGLRenderer,
  WebGLRenderTarget,
  RenderPass,
  LinearFilter,
  RGBAFormat,
  BloomPass,
  ShaderPass,
  CopyShader,
  EffectComposer
} from "three-full";

export default ({ scene, camera, canvas, width, height }) => {
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
  renderer.autoClear = false;

  // post
  // const bloomPass = new BloomPass(2.0, 25, 4, 512);
  // const copyPass = new ShaderPass(CopyShader);

  // const passes = [bloomPass, copyPass];

  // const size = renderer.getSize();
  // const pixelRatio = renderer.getPixelRatio();
  // size.width *= pixelRatio;
  // size.height *= pixelRatio;

  // const composer = new EffectComposer(
  //   renderer,
  //   new WebGLRenderTarget(size.width, size.height, {
  //     minFilter: LinearFilter,
  //     magFilter: LinearFilter,
  //     format: RGBAFormat,
  //     stencilBuffer: false
  //   })
  // );

  // const renderPass = new RenderPass(scene, camera);
  // composer.addPass(renderPass);

  // for (let i = 0, pass; i < passes.length; i++) {
  //   pass = passes[i];
  //   pass.renderToScreen = i === passes.length - 1;
  //   composer.addPass(pass);
  // }

  // renderer.clear();
  // composer.render();

  return { renderer, DPR };
};
