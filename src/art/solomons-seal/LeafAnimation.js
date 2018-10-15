import {
  _Math,
  Mesh,
  Color,
  DoubleSide,
  TextureLoader,
  RepeatWrapping,
  Vector2,
  Vector3,
  VertexColors
} from "three-full";
import { TweenMax, Power2 } from "gsap";
import {
  ModelBufferGeometry,
  LambertAnimationMaterial
} from "three/vendor/BAS";
import Modifiers from "three/vendor/Modifiers";

function LeafAnimation({
  R,
  modelGeometry,
  color,
  animated,
  imagePath = "/img/patterns/diamonds-2.png",
  textureSize = new Vector2(20, -20),
  windForce,
  windDirection,
  hslBase,
  hslRange
}) {
  // bend
  // if (windForce) {
  //   let temporaryMesh = new Mesh(modelGeometry.clone(), null);
  //   this.modifier = Modifiers.ModifierStack(temporaryMesh);
  //   this.bend = Modifiers.Bend(
  //     windDirection.x,
  //     windDirection.y,
  //     windDirection.z
  //   );
  //   this.bend.force = windForce;
  //   this.bend.constraint = Modifiers.ModConstant().NONE;
  //   this.modifier.addModifier(this.bend);
  //   this.modifier.apply();
  //   modelGeometry.vertices = temporaryMesh.geometry.vertices;

  //   temporaryMesh = undefined;
  // }

  const geometry = new ModelBufferGeometry(modelGeometry);
  const aColor = geometry.createAttribute("color", 3);
  const leafColor = new Color(color);

  for (let i = 0, j; i < aColor.array.length; i += 18) {
    // 6 * 3
    leafColor.setHSL(
      hslBase.x + R.floatBetween(-hslRange.x, hslRange.x),
      hslBase.y + R.floatBetween(-hslRange.y, hslRange.y),
      hslBase.z + R.floatBetween(-hslRange.z, hslRange.z)
    );

    for (j = 0; j < 18; j += 3) {
      aColor.array[i + j] = leafColor.r;
      aColor.array[i + j + 1] = leafColor.g;
      aColor.array[i + j + 2] = leafColor.b;
    }
  }

  const texture = new TextureLoader().load(imagePath, texture => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
  });

  const material = new LambertAnimationMaterial({
    vertexColors: VertexColors,
    transparent: true,
    side: DoubleSide,
    fog: true,
    lights: true,
    uniforms: {
      uTime: { value: animated ? 0 : 1 },
      uWindForce: { value: windForce },
      uWindDirection: { value: new Vector3(0.2, 0.2, 0.2) },
      uTextureSize: { value: new Vector2(10, 10) },
      color: color
    },
    uniformValues: {
      map: texture,
      diffuse: new Color(color)
    },
    vertexParameters: [
      "uniform float uTime;",
      "uniform float uWindForce;",
      "uniform vec3 uWindDirection;"
    ],
    // twist from https://github.com/marklundin/glsl-sdf-ops
    vertexPosition: [
      "float  c = cos(uWindForce * uWindDirection.z+uWindForce);",
      "float  s = sin(uWindForce * uWindDirection.x+uWindForce);",
      "mat2   m = mat2(c, -s, s, c);",
      "transformed = vec3(m*transformed.xy, transformed.z);",
      "transformed.z *= uTime;",
      "transformed.y *= uTime;"
    ],
    fragmentParameters: ["uniform float uTime;", "uniform vec2 uTextureSize;"],
    fragmentMap: [
      "vec4 texelColor = texture2D(map, vUv * uTextureSize);",
      "diffuseColor *= texelColor;"
      // "diffuseColor.a = 1.0;"
    ]
    // fragmentDiffuse: ["diffuseColor.a *= uTime;"]
  });

  material.uniforms.uTextureSize.value = textureSize;
  material.uniforms.uWindForce.value = windForce;
  material.uniforms.uWindDirection.value = windDirection;

  geometry.computeVertexNormals();
  geometry.bufferUVs();

  Mesh.call(this, geometry, material);

  // this.castShadow = true;
  this.frustumCulled = false;
}
LeafAnimation.prototype = Object.create(Mesh.prototype);
LeafAnimation.prototype.constructor = LeafAnimation;
Object.defineProperty(LeafAnimation.prototype, "time", {
  get: function() {
    return this.material.uniforms["uTime"].value;
  },
  set: function(v) {
    this.material.uniforms["uTime"].value = v;
  }
});

export default LeafAnimation;
