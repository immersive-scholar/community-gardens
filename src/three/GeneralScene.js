import { Color, Scene, FogExp2 } from "three-full";

export default ({
  backgroundColor = new Color(0x3d3d3d),
  fogColor = 0xd7cbb1,
  fogDepth = 0.03
}) => {
  const scene = new Scene();
  scene.background = backgroundColor;
  // scene.background = new Color(0x030306);
  // const background = new Background();
  // scene.background = background.textureCube;
  scene.fog = new FogExp2(fogColor, fogDepth);
  scene.position.y = -0.5;

  return scene;
};
