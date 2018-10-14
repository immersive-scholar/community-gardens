import {
  _Math,
  Mesh,
  Color,
  DoubleSide,
  Vector3,
  VertexColors
} from "three-full";
import { TweenMax, Power2 } from "gsap";
import { LambertAnimationMaterial, ShaderChunk } from "three/vendor/BAS";
import Modifiers from "three/vendor/Modifiers";

function BerryAnimation({
  R,
  geometry,
  color,
  timeline,
  animated,
  windForce,
  windDirection
}) {
  const material = new LambertAnimationMaterial({
    // vertexColors: VertexColors,
    flatShading: true,
    side: DoubleSide,
    fog: true,
    // lights: true,
    wireframe: !true,
    transparent: true,
    opacity: 0.5,
    uniforms: {
      uTime: { value: 0 },
      uWindForce: { value: windForce },
      uWindDirection: { value: new Vector3(0.2, 0.2, 0.2) },
      color: color
    },
    uniformValues: {
      diffuse: new Color(color)
    },
    vertexFunctions: [
      // the eases used by the timeline defined above
      ShaderChunk["ease_back_in"],
      ShaderChunk["ease_elastic_out"],
      ShaderChunk["quaternion_rotation"]
      // getChunks outputs the shader chunks where the animation is baked into
    ].concat(timeline.compile()),
    vertexParameters: [
      "uniform float uTime;",
      "attribute vec3 aPosition;",
      "attribute vec4 aQuaternion;",
      "attribute vec2 aDelayDuration;",
      "uniform float uWindForce;",
      "uniform vec3 uWindDirection;"
    ],
    vertexPosition: [
      // calculate animation time for the prefab
      "float tTime = clamp(uTime - aDelayDuration.x, 0.0, aDelayDuration.y);",

      // apply timeline transformations based on 'tTime'
      timeline.getTransformCalls("scale"),
      timeline.getTransformCalls("rotate"),
      timeline.getTransformCalls("translate"),

      // rotate the vertex by quaternion
      "transformed = rotateVector(aQuaternion, transformed);",

      // translate the vertex by prefab position
      "transformed += aPosition * uTime;"
    ]
  });

  material.uniforms.uWindForce.value = windForce;
  material.uniforms.uWindDirection.value = windDirection;

  geometry.computeBoundingSphere();

  Mesh.call(this, geometry, material);

  //   this.castShadow = true;
  this.frustumCulled = false;
}

BerryAnimation.prototype = Object.create(Mesh.prototype);
BerryAnimation.prototype.constructor = BerryAnimation;
Object.defineProperty(BerryAnimation.prototype, "time", {
  get: function() {
    return this.material.uniforms["uTime"].value;
  },
  set: function(v) {
    this.material.uniforms["uTime"].value = v;
  }
});

export default BerryAnimation;
