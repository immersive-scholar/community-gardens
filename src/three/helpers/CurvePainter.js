import {
  Geometry,
  Vector2,
  Color,
  Mesh,
  DoubleSide,
  TextureLoader,
  RepeatWrapping
} from "three-full";
import { TweenMax, Power2 } from "gsap/TweenMax";

import { MeshLine, MeshLineMaterial } from "three/helpers/MeshLine";

const CurvePainter = ({
  curve,
  pointCount,
  camera,
  color = 0xff0000,
  lineWidth = 1,
  delay = 0,
  fogColor = new Color(0xd7cbb1),
  fogDensity = 0.3,
  imagePath = "/img/stroke.png",
  animated = false
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

  let mesh = new Mesh(line.geometry, material);
  mesh.frustumCulled = false;

  const params = {
    life
  };

  this.tween && this.tween.kill(null, params);
  if (animated) {
    this.tween = TweenMax.to(params, 4, {
      life: 1,
      onUpdate: render,
      ease: Power2.easeOut,
      delay
    });
  } else {
    params.life = 1;
    render();
  }

  function update() {}

  function render() {
    const { life } = params;

    if (material) {
      material.uniforms.revealProgress.value = life;
    }
  }

  const clean = () => {
    geometry.dispose();
    material.dispose();
    mesh = undefined;
  };

  return {
    update,
    mesh,
    clean
  };
};

export default CurvePainter;
