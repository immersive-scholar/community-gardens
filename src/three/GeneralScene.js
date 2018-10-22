import { Color, Scene, FogExp2 } from "three-full";

export default ({
  backgroundColor = new Color(0xffffff),
  fogColor = 0xd7cbb1
}) => {
  const scene = new Scene();
  scene.background = new Color(0x030306);
  scene.fog = new FogExp2(0xd7cbb1, 0.03);
  scene.position.y = -0.5;

  return scene;
};
