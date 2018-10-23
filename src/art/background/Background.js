import {
  CubeTextureLoader,
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  DoubleSide,
  TextureLoader
} from "three-full";
import ColorFactory from "util/ColorFactory";

const Background = () => {
  // const loader = new CubeTextureLoader();
  // loader.setPath("/img/skybox/watercolor/");

  // const textureCube = loader.load([
  //   "px.jpg",
  //   "nx.jpg",
  //   "py.jpg",
  //   "ny.jpg",
  //   "pz.jpg",
  //   "nz.jpg"
  // ]);

  const loader = new TextureLoader().load(
    "/img/skybox/watercolor/watercolor-3.jpg"
  );

  var geometry = new SphereGeometry(10, 4, 4, 0, Math.PI);
  var material = new MeshPhongMaterial({
    color: ColorFactory.getRandomColor(
      ColorFactory.FALL,
      ColorFactory.GREENERY
    ),
    // map: loader,
    side: DoubleSide,
    emissive: 0x000000,
    specular: 0xffffff,
    shininess: 30
  });
  const mesh = new Mesh(geometry, material);

  return { mesh };
};

export default Background;
