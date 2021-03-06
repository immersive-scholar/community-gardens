import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  TetrahedronGeometry,
  Color
} from "three-full";

const Background = ({ color } = {}) => {
  // const loader = new CubeTextureLoader();
  // loader.setPath("/img/skybox/watercolor/");
  // loader.load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

  // const loader = new TextureLoader().load("/img/skybox/watercolor/ao.jpg");

  const c = new Color(color);
  // const tempColorObject = {};
  // c.getHSL(tempColorObject);
  // c.setHSL(tempColorObject.h, tempColorObject.s, 0.02);

  var geometry = new TetrahedronGeometry(75);

  var material = new MeshPhongMaterial({
    flatShading: !true,
    color: c,
    side: DoubleSide,
    emissive: c,
    specular: 0x111111,
    shininess: 1
  });
  const mesh = new Mesh(geometry, material);

  return { group: mesh };
};

export default Background;
