import { CubeTextureLoader } from "three-full";

const Background = () => {
  const loader = new CubeTextureLoader();
  loader.setPath("/img/skybox/");

  const textureCube = loader.load([
    "px.jpg",
    "nx.jpg",
    "py.jpg",
    "ny.jpg",
    "pz.jpg",
    "nz.jpg"
  ]);

  return { textureCube, loader };
};

export default Background;
