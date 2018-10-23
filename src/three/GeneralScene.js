import { Color, Scene, FogExp2 } from "three-full";
import Background from "art/background/Background";

export default ({
  backgroundColor = new Color(0xffffff),
  fogColor = 0xd7cbb1
}) => {
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  // scene.background = new Color(0x030306);
  // const background = new Background();
  // scene.background = background.textureCube;
  scene.fog = new FogExp2(0xd7cbb1, 0.03);
  scene.position.y = -0.5;

  return scene;
};
