import { _Math, Mesh, Color, VertexColors, DoubleSide } from "three-full";
import {
  ModelBufferGeometry,
  StandardAnimationMaterial,
  ShaderChunk
} from "three/vendor/BAS";
console.log("ModelBufferGeometry ", ModelBufferGeometry);

function Animation(modelGeometry) {
  var geometry = new ModelBufferGeometry(modelGeometry);

  var i, j;

  var aOffsetAmplitude = geometry.createAttribute("aOffsetAmplitude", 2);
  var positionBuffer = geometry.getAttribute("position").array;
  var x, y, distance;

  for (i = 0; i < aOffsetAmplitude.array.length; i += 12) {
    // 6 * 2
    var offset = _Math.randFloat(1, 4);
    var amplitude = _Math.randFloat(0.5, 1.0);

    x = 0;
    y = 0;

    // x/y position of the corresponding vertex from the position buffer
    for (j = 0; j < 6; j += 2) {
      x += positionBuffer[((i + j) / 2) * 3];
      y += positionBuffer[((i + j) / 2) * 3 + 1];
    }

    x /= 3;
    y /= 3;

    distance = Math.sqrt(x * x + y * y);

    for (j = 0; j < 12; j += 2) {
      aOffsetAmplitude.array[i + j] =
        (distance + offset) * (1.0 + _Math.randFloatSpread(0.0125));
      aOffsetAmplitude.array[i + j + 1] = amplitude;
    }
  }

  var aColor = geometry.createAttribute("color", 3);
  var color = new Color();

  for (i = 0; i < aColor.array.length; i += 18) {
    // 6 * 3
    color.setHSL(0, 0, _Math.randFloat(0.5, 1.0));

    for (j = 0; j < 18; j += 3) {
      aColor.array[i + j] = color.r;
      aColor.array[i + j + 1] = color.g;
      aColor.array[i + j + 2] = color.b;
    }
  }

  var material = new StandardAnimationMaterial({
    flatShading: true,
    vertexColors: VertexColors,
    transparent: true,
    side: DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uD: { value: 4.4 },
      uA: { value: 3.2 }
    },
    uniformValues: {
      diffuse: new Color(0x9b111e),
      roughness: 0.2,
      metalness: 0.8,
      opacity: 0.8
    },
    vertexFunctions: [ShaderChunk["ease_cubic_in_out"]],
    vertexParameters: [
      "uniform float uTime;",
      "uniform float uD;",
      "uniform float uA;",
      "attribute vec2 aOffsetAmplitude;"
    ],
    vertexPosition: [
      "float tProgress = sin(uTime + aOffsetAmplitude.x / uD);",
      "tProgress = easeCubicInOut(tProgress);",
      "transformed.z += aOffsetAmplitude.y * uA * tProgress;"
    ]
  });

  geometry.computeVertexNormals();

  Mesh.call(this, geometry, material);

  this.frustumCulled = false;
}
Animation.prototype = Object.create(Mesh.prototype);
Animation.prototype.constructor = Animation;
Object.defineProperty(Animation.prototype, "time", {
  get: function() {
    return this.material.uniforms["uTime"].value;
  },
  set: function(v) {
    this.material.uniforms["uTime"].value = v;
  }
});

export default Animation;
