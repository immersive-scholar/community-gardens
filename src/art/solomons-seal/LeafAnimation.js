import {
  _Math,
  Mesh,
  Color,
  VertexColors,
  DoubleSide,
  TextureLoader,
  RepeatWrapping,
  Vector2
} from "three-full";
import {
  ModelBufferGeometry,
  LambertAnimationMaterial
} from "three/vendor/BAS";

function Animation({
  modelGeometry,
  color,
  animated,
  imagePath = "/img/patterns/pattern-1.png"
}) {
  const geometry = new ModelBufferGeometry(modelGeometry);

  // var aColor = geometry.createAttribute("color", 3);
  // var leafColor = new Color(color);

  // for (i = 0; i < aColor.array.length; i += 18) {
  //   // 6 * 3
  //   leafColor.setHSL(1, 1, _Math.randFloat(0.5, 1.0));

  //   for (j = 0; j < 18; j += 3) {
  //     aColor.array[i + j] = leafColor.r;
  //     aColor.array[i + j + 1] = leafColor.g;
  //     aColor.array[i + j + 2] = leafColor.b;
  //   }
  // }

  const leafTexture = new TextureLoader().load(imagePath, texture => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
  });

  const material = new LambertAnimationMaterial({
    // vertexColors: VertexColors,
    transparent: true,
    side: DoubleSide,
    fog: true,
    lights: true,
    uniforms: {
      uTime: { value: animated ? 0 : 1 },
      color: color
    },
    uniformValues: {
      map: leafTexture,
      diffuse: new Color(color)
    },
    vertexParameters: ["uniform float uTime;"],
    vertexPosition: ["transformed.z *= uTime;", "transformed.y *= uTime;"],
    fragmentParameters: ["uniform float uTime;"],
    fragmentMap: [
      "vec4 texelColor = texture2D(map, vUv * 10.);",
      "diffuseColor *= mapTexelToLinear(texelColor);"
      // "diffuseColor = vec4(texelColor.rgb, uTime);"
      // "diffuseColor *= vec4(texelColor.xyz, 1.);"
      // "diffuseColor.a = uTime;"
    ],
    fragmentDiffuse: ["diffuseColor.a *= uTime;"]
  });

  geometry.computeVertexNormals();
  geometry.bufferUVs();

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
