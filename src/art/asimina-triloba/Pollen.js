import {
  _Math,
  Color,
  DoubleSide,
  Mesh,
  Quaternion,
  RepeatWrapping,
  SphereGeometry,
  TextureLoader,
  Vector2,
  Vector3
} from "three-full";
import {
  LambertAnimationMaterial,
  ShaderChunk,
  Timeline,
  PrefabBufferGeometry
} from "three/vendor/BAS";

function Pollen({
  count,
  size,
  color,
  imagePath = "/img/strokes/crosshatch-1.png",
  textureSize = new Vector2(1, 1),
  R,
  animated,
  windForce = 0.1,
  windDirection = new Vector3(2, 2, 0),
  distanceFromCenter = 1
}) {
  // calculate prefab size based on the number of prefabs to spread over the surface
  const prefab = new SphereGeometry(size, 8, 8);

  // setup prefab geometry
  const geometry = new PrefabBufferGeometry(prefab, count);

  const timeline = new Timeline();
  const maxDelay = count * 2;

  timeline.add(1.0, {
    scale: {
      from: { x: 0.0, y: 0.0, z: 0.0 },
      to: { x: 1.0, y: 1.0, z: 1.0 },
      ease: "easeQuadOut"
    },
    translate: {
      to: { x: 0, y: 0, z: 0 },
      ease: "easeQuadOut"
    }
  });

  const dataArray = [];
  const up = new Vector3(0, 1, 0);
  const normal = new Vector3();
  const quaternion = new Quaternion();

  const aPosition = geometry.createAttribute("aPosition", 3);
  const aDelayDuration = geometry.createAttribute("aDelayDuration", 3);
  const aQuaternion = geometry.createAttribute("aQuaternion", 4);

  this.totalDuration = timeline.duration;

  for (let i = 0, position = new Vector3(); i < count; i++) {
    // animation
    dataArray[0] = maxDelay * (i / count);
    dataArray[1] = timeline.duration;
    geometry.setPrefabData(aDelayDuration, i, dataArray);

    // position
    position.set(0, 0, 0);

    position.z = distanceFromCenter;

    position.toArray(dataArray);
    geometry.setPrefabData(aPosition, i, dataArray);

    // rotation
    normal.copy(position);
    normal.normalize();

    quaternion.setFromUnitVectors(up, normal);
    quaternion.toArray(dataArray);
    geometry.setPrefabData(aQuaternion, i, dataArray);
  }

  const texture = new TextureLoader().load(imagePath, texture => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
  });

  const material = new LambertAnimationMaterial({
    // vertexColors: VertexColors,
    flatShading: !true,
    side: DoubleSide,
    fog: true,
    lights: true,
    wireframe: !true,
    transparent: false,
    opacity: 1.0,
    uniforms: {
      uTime: { value: animated ? 0 : 1 },
      uWindForce: { value: windForce },
      uWindDirection: { value: new Vector3(0.2, 0.2, 0.2) },
      color,
      uTextureSize: { value: new Vector2(10, 10) }
    },
    uniformValues: {
      map: texture,
      diffuse: new Color(color)
    },
    vertexFunctions: [
      // the eases used by the timeline defined above
      ShaderChunk["ease_quad_out"],
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
    fragmentParameters: ["uniform float uTime;", "uniform vec2 uTextureSize;"],
    fragmentMap: [
      "vec4 texelColor = texture2D(map, vUv * uTextureSize);",
      "diffuseColor *= texelColor;",
      "diffuseColor.a = 1.0;"
    ]
  });

  material.uniforms.uTextureSize.value = textureSize;
  material.uniforms.uWindForce.value = windForce;
  material.uniforms.uWindDirection.value = windDirection;

  geometry.computeVertexNormals();
  geometry.bufferUvs();
  geometry.computeBoundingSphere();

  Mesh.call(this, geometry, material);
  //   this.castShadow = true;
  this.frustumCulled = false;

  this.clean = function() {
    geometry && geometry.dispose();
    material && material.dispose();
  };

  return this;
}

Pollen.prototype = Object.create(Mesh.prototype);
Pollen.prototype.constructor = Pollen;
Object.defineProperty(Pollen.prototype, "time", {
  get: function() {
    return this.material.uniforms["uTime"].value;
  },
  set: function(v) {
    this.material.uniforms["uTime"].value = v;
  }
});

export default Pollen;
