import {
  Color,
  ImprovedNoise,
  Mesh,
  PlaneBufferGeometry,
  FrontSide
} from "three-full";
import { PrefabBufferGeometry, BasicAnimationMaterial } from "three/vendor/BAS";
import { TweenMax, Power2 } from "gsap";

function GroundBAS({
  R,
  currentTime = 0,
  cliff = 0,
  color,
  animated = true,
  delay = 0
}) {
  this.currentTime = 1;
  this.cliff = 0;

  const worldWidth = 64,
    worldDepth = 64;
  const data = generateHeight(worldWidth, worldDepth);
  const planeGeometry = new PlaneBufferGeometry(
    32,
    32,
    worldWidth - 1,
    worldDepth - 1
  );
  planeGeometry.rotateX(-Math.PI / 2);
  const vertices = planeGeometry.attributes.position.array;
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 1] = data[i] * 0.5;
  }

  const geometry = new PrefabBufferGeometry(planeGeometry, 1);

  const material = new BasicAnimationMaterial({
    flatShading: true,
    transparent: !true, // required for diffuseColor.a to have an effect
    side: FrontSide,
    wireframe: !true,
    lights: true,
    fog: true,

    uniforms: {
      uTime: { value: animated ? 0 : 1 },
      uCliff: { value: cliff }
    },
    uniformValues: {
      diffuse: new Color(color)
    },
    vertexParameters: ["uniform float uTime;", "uniform float uCliff;"],
    vertexPosition: ["transformed.y *= uCliff;", "transformed *= uTime;"]
    // fragmentParameters: ["uniform float uTime;"],
    // fragmentDiffuse: ["diffuseColor.rgb *= uTime;"]
  });

  geometry.computeVertexNormals();

  Mesh.call(this, geometry, material);

  const wireframeMaterial = new BasicAnimationMaterial({
    wireframe: true,
    lights: !true,
    fog: !true,

    uniforms: {
      uTime: { value: animated ? 0 : 1 },
      uCliff: { value: cliff }
    },
    uniformValues: {
      diffuse: new Color(color)
    },
    vertexParameters: ["uniform float uTime;", "uniform float uCliff;"],
    vertexPosition: ["transformed.y *= uCliff;", "transformed *= uTime;"]
    // fragmentParameters: ["uniform float uTime;"],
    // fragmentDiffuse: ["diffuseColor.rgb *= uTime;"]
  });

  const wireframe = new Mesh(geometry, wireframeMaterial);
  this.add(wireframe);

  this.frustumCulled = false;

  window.bg = this;

  this.animateIn = function({ duration = 5, delay = 0 } = {}) {
    this.tween && this.tween.kill(null, this);
    this.tween = TweenMax.to(this, duration, {
      currentTime: 1,
      onUpdate: () => {
        this.update();
      },
      delay,
      ease: Power2.easeInOut
    });
  };

  this.animateCliff = function({ cliff = 1, duration = 5, delay = 0 }) {
    this.cliffTween && this.cliffTween.kill(null, this);
    this.cliffTween = TweenMax.to(this, duration, {
      cliff,
      onUpdate: () => {
        this.update();
      },
      delay: delay + 5,
      ease: Power2.easeInOut
    });
  };

  function generateHeight(width, height) {
    let size = width * height,
      data = new Uint8Array(size),
      perlin = new ImprovedNoise(),
      quality = 1,
      z = R.random(),
      cx = width * 0.5,
      cy = height * 0.5,
      distanceFromCenter,
      x,
      y,
      halfSizeSquare = Math.pow(size / 2, 2);
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < size; i++) {
        x = i % width;
        y = ~~(i / width);
        distanceFromCenter =
          1 - (Math.abs(x - cx) * Math.abs(y - cy)) / halfSizeSquare;
        data[i] += Math.abs(
          perlin.noise(x / quality, y / quality, z) *
            quality *
            distanceFromCenter
        );
      }
      quality *= 5;
    }
    return data;
  }

  this.clean = function() {
    geometry && geometry.dispose();
    material && material.dispose();
    wireframeMaterial && wireframeMaterial.dispose();
  };

  this.update = function() {
    material.uniforms["uTime"].value = this.currentTime;
    material.uniforms["uCliff"].value = this.cliff;

    wireframeMaterial.uniforms["uTime"].value = this.currentTime;
    wireframeMaterial.uniforms["uCliff"].value = this.cliff;
  };
}

GroundBAS.prototype = Object.create(Mesh.prototype);
GroundBAS.prototype.constructor = GroundBAS;
// Object.defineProperty(GroundBAS.prototype, "time", {
//   get: function() {
//     return this.material.uniforms["uTime"].value;
//   },
//   set: function(v) {
//     this.material.uniforms["uTime"].value = v;
//   }
// });

export default GroundBAS;
