import { _Math, Mesh, Color, VertexColors, DoubleSide } from "three-full";
import {
  ModelBufferGeometry,
  LambertAnimationMaterial
} from "three/vendor/BAS";

function Animation({ modelGeometry, color, animated }) {
  var geometry = new ModelBufferGeometry(modelGeometry);

  var i, j;

  var aOffsetAmplitude = geometry.createAttribute("aOffsetAmplitude", 2);
  var positionBuffer = geometry.getAttribute("position").array;
  var x, y, distance;

  for (i = 0; i < aOffsetAmplitude.array.length; i += 12) {
    // 6 * 2
    var offset = 0; //_Math.randFloat(0.1, 0.4);
    var amplitude = 0; //_Math.randFloat(0.5, 1);

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
  var leafColor = new Color(color);

  for (i = 0; i < aColor.array.length; i += 18) {
    // 6 * 3
    leafColor.setHSL(1, 1, _Math.randFloat(0.5, 1.0));

    for (j = 0; j < 18; j += 3) {
      aColor.array[i + j] = leafColor.r;
      aColor.array[i + j + 1] = leafColor.g;
      aColor.array[i + j + 2] = leafColor.b;
    }
  }

  var material = new LambertAnimationMaterial({
    flatShading: true,
    vertexColors: VertexColors,
    transparent: true,
    side: DoubleSide,
    fog: true,
    uniforms: {
      uTime: { value: animated ? 0 : 1 }
    },
    uniformValues: {
      diffuse: new Color(color)
    },
    vertexParameters: ["uniform float uTime;"],
    vertexPosition: ["transformed.z *= uTime;", "transformed.y *= uTime;"],
    fragmentParameters: ["uniform float uTime;"],
    fragmentMap: ["diffuseColor.a *= uTime;"]
  });

  geometry.computeVertexNormals();

  Mesh.call(this, geometry, material);
  this.castShadow = true;

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
