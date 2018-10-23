import {
  CubeTextureLoader,
  TetrahedronGeometry,
  MeshPhongMaterial,
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  TextureLoader,
  Sky
} from "three-full";
import ColorFactory from "util/ColorFactory";

const Background = ({
  turbidity = 10,
  rayleigh = 2,
  mieCoefficient = 0.005,
  mieDirectionalG = 0.8,
  luminance = 1,
  inclination = 0.5, // elevation / inclination
  azimuth = 0.25 // Facing front,
} = {}) => {
  // const loader = new CubeTextureLoader();
  // loader.setPath("/img/skybox/watercolor/");
  // loader.load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

  // const loader = new TextureLoader().load(
  //   "/img/skybox/watercolor/watercolor-3.jpg"
  // );

  // var geometry = new TetrahedronGeometry(10, 2);
  // var material = new MeshPhongMaterial({
  //   color: ColorFactory.getRandomColor(
  //     ColorFactory.FALL,
  //     ColorFactory.GREENERY
  //   ),
  //   envMap: loader,
  //   side: DoubleSide,
  //   emissive: 0x000000,
  //   specular: 0xffffff,
  //   shininess: 30
  // });
  // const mesh = new Mesh(geometry, material);

  const sunSphere = new Mesh(
    new SphereBufferGeometry(20000, 16, 8),
    new MeshBasicMaterial({ color: 0xffffff })
  );
  sunSphere.position.y = -700000;
  sunSphere.visible = false;

  // Add Sky
  const sky = new Sky();
  sky.scale.setScalar(450000);

  var distance = 400000;

  sky.material.lights = false;
  const uniforms = sky.material.uniforms;
  uniforms.turbidity.value = turbidity;
  uniforms.rayleigh.value = rayleigh;
  uniforms.luminance.value = luminance;
  uniforms.mieCoefficient.value = mieCoefficient;
  uniforms.mieDirectionalG.value = mieDirectionalG;

  var theta = Math.PI * (inclination - 0.5);
  var phi = 2 * Math.PI * (azimuth - 0.5);
  sunSphere.position.x = distance * Math.cos(phi);
  sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
  sunSphere.position.z = -distance * Math.sin(phi) * Math.cos(theta);
  uniforms.sunPosition.value.copy(sunSphere.position);

  return { mesh: sky };
};

export default Background;
