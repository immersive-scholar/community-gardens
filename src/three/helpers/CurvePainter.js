import {
  Geometry,
  Vector2,
  Color,
  Mesh,
  DoubleSide,
  CanvasTexture,
  TextureLoader,
  RepeatWrapping
} from "three-full";
import { TweenLite, Linear } from "gsap/TweenMax";

import { MeshLine, MeshLineMaterial } from "three/helpers/MeshLine";

const CurvePainter = ({
  curve,
  pointCount,
  camera,
  color = 0xff0000,
  lineWidth = 1,
  delay = 0,
  canvasWidth = 1024,
  canvasHeight = 128,
  fogColor = new Color(0xd7cbb1),
  fogDensity = 0.02,
  imagePath = "/img/stroke.png"
}) => {
  let life = 0;

  // create the geometry
  const points = curve.getPoints(pointCount);
  const geometry = new Geometry();

  for (var i = 0; i < points.length; i++) {
    geometry.vertices.push(points[i].clone());
  }

  // Create the line mesh
  const line = new MeshLine();
  line.setGeometry(geometry, function(p) {
    return p;
  }); // makes width taper

  const strokeTexture = new TextureLoader().load(imagePath, texture => {
    const strokeTexture = texture;
    strokeTexture.wrapS = strokeTexture.wrapT = RepeatWrapping;
  });

  // Create the line material
  const resolution = new Vector2(window.innerWidth, window.innerHeight);
  let material = new MeshLineMaterial({
    map: strokeTexture,
    useMap: true,
    color: new Color(color),
    opacity: 1,
    resolution: resolution,
    sizeAttenuation: true,
    lineWidth,
    near: camera.near,
    far: camera.far,
    depthTest: true,
    transparent: true,
    repeat: new Vector2(-1, 1),
    side: DoubleSide,
    fogColor,
    fogDensity,
    revealProgress: life
  });

  const mesh = new Mesh(line.geometry, material);
  mesh.frustumCulled = false;

  const params = {
    life
  };

  TweenLite.to(params, 2, {
    life: 1,
    onUpdate: render,
    ease: Linear.easeNone,
    delay
  });

  function update() {}

  function render() {
    const { life } = params;

    if (material) {
      material.uniforms.revealProgress.value = life;
    }
  }

  return {
    update,
    mesh
  };
};

export default CurvePainter;
