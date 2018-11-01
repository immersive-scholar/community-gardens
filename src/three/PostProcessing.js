import { RenderPass, BokehPass, EffectComposer } from "three-full";

const PostProcessing = ({ scene, camera, renderer }) => {
  const renderPass = new RenderPass(scene, camera);

  const bokehPass = new BokehPass(scene, camera, {
    focus: 0.1,
    aperture: 0.0025,
    maxblur: 1.0,
    width: window.innerWidth,
    height: window.innerHeight
  });

  bokehPass.renderToScreen = true;

  const composer = new EffectComposer(renderer);

  composer.addPass(renderPass);
  composer.addPass(bokehPass);

  return { composer };
};

export default PostProcessing;
