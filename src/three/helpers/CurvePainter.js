import {
  Geometry,
  Vector2,
  Color,
  Mesh,
  DoubleSide,
  TextureLoader,
  RepeatWrapping
} from "three-full";
import { TweenMax, Power2 } from "gsap";

import { MeshLine, MeshLineMaterial } from "three/helpers/MeshLine";
import TextureFactory from "../../util/TextureFactory";

const CurvePainter = ({
  curve,
  pointCount,
  camera,
  color = 0xff0000,
  lineWidth = 1,
  delay = 0,
  fogColor = new Color(0xd7cbb1),
  fogDensity = 0.3,
  imagePath = TextureFactory.getStroke(),
  animated = false
}) => {
  let time = 0;

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
    time
  });

  let mesh = new Mesh(line.geometry, material);
  mesh.frustumCulled = false;

  function update(time) {
    if (material) {
      material.uniforms.uTime.value = time;
    }
  }

  function clean() {
    geometry.dispose();
    material.dispose();
    mesh = undefined;
  }

  function animateIn({ delay = 0, duration = 1, animated = true }) {
    this.tween && this.tween.kill(null, this);

    if (animated) {
      this.time = 0;
      this.tween = TweenMax.to(this, duration, {
        time: 1,
        ease: Power2.easeOut,
        delay: delay + 0.5,
        onUpdate: () => {
          update(this.time);
        }
      });
    } else {
      this.time = 1;
      update();
    }
  }

  return {
    update,
    mesh,
    clean,
    animateIn
  };
};

export default CurvePainter;
