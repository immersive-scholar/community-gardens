import { Mesh, Color, DoubleSide, Vector3 } from "three-full";
import { BasicAnimationMaterial, ShaderChunk } from "three/vendor/BAS";
import { TweenMax, Power2 } from "gsap";

function BerryAnimation({
  R,
  geometry,
  color,
  timeline,
  animated,
  windForce,
  windDirection,
  berryWireframe = !true
  // imagePath = TextureFactory.getPattern(),
  // textureSize = new Vector2(20, 20)
}) {
  // const texture = new TextureLoader().load(imagePath, texture => {
  //   texture.wrapS = texture.wrapT = RepeatWrapping;
  // });
  const material = new BasicAnimationMaterial({
    // vertexColors: VertexColors,
    flatShading: true,
    side: DoubleSide,
    fog: true,
    lights: !true,
    wireframe: berryWireframe,
    transparent: true,
    opacity: 1,
    uniforms: {
      uTime: { value: animated ? 0 : 1 },
      uWindForce: { value: windForce },
      uWindDirection: { value: new Vector3(0.2, 0.2, 0.2) },
      color: color,
      fog: true
      // uTextureSize: { value: new Vector2(10, 10) }
    },
    uniformValues: {
      // map: texture,
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
    ],
    // fragmentParameters: ["uniform float uTime;", "uniform vec2 uTextureSize;"],
    fragmentParameters: ["uniform float uTime;"],
    fragmentMap: [
      // "vec4 texelColor = texture2D(map, vUv * uTextureSize);",
      "diffuseColor.a *= uTime;"
    ]
  });

  // material.uniforms.uTextureSize.value = textureSize;
  material.uniforms.uWindForce.value = windForce;
  material.uniforms.uWindDirection.value = windDirection;

  geometry.computeBoundingSphere();
  geometry.computeVertexNormals();
  geometry.bufferUvs();

  Mesh.call(this, geometry, material);

  this.castShadow = true;
  this.frustumCulled = false;

  this.clean = () => {
    this.tween && this.tween.kill(null, this);
  };

  this.animateIn = ({ delay = 0, duration = 1, animated = true }) => {
    this.tween && this.tween.kill(null, this);

    if (animated) {
      this.time = 0;
      this.tween = TweenMax.to(this, duration, {
        time: 1,
        ease: Power2.easeOut,
        delay
      });
    } else {
      this.time = 1;
    }
  };
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
