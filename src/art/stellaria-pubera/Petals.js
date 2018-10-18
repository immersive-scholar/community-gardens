import {
  Quaternion,
  Vector2,
  Vector3,
  Geometry,
  _Math,
  Mesh,
  Color,
  DoubleSide,
  Shape,
  ShapeGeometry,
  TextureLoader,
  RepeatWrapping,
  VertexColors
} from "three-full";
import {
  LambertAnimationMaterial,
  ShaderChunk,
  Timeline,
  PrefabBufferGeometry
} from "three/vendor/BAS";

import Modifiers from "three/vendor/Modifiers";

function Petals({
  petalCount,
  petalShapeGeometry,
  color,
  distanceFromCenter = 0.01,
  R,
  openness = 0,
  animated,
  maxDuration = 1,
  imagePath = "/img/patterns/diamonds-2.png",
  textureSize = new Vector2(10, 10),
  windForce = 0.1,
  windDirection = new Vector3(2, 2, 0),
  startAngle = 0,
  endAngle = 0.9,
  displacement = new Vector2(0.01, 0.01),
  hslBase,
  hslRange,
  rotationAxis = new Vector3(1, 1, 0),
  rotationAngle = Math.PI / 2,
  translateToY = 0
}) {
  const settings = {
    maxDelay: 0.0,
    timeScale: 1.0,
    backAmplitude: 2.0,
    elasticAmplitude: 1.0,
    elasticPeriod: 0.125
  };

  // bend
  if (windForce) {
    let temporaryMesh = new Mesh(petalShapeGeometry.clone(), null);
    this.modifier = Modifiers.ModifierStack(temporaryMesh);
    this.bend = Modifiers.Bend(
      windDirection.x,
      windDirection.y,
      windDirection.z
    );
    this.bend.force = windForce;
    this.bend.constraint = Modifiers.ModConstant().NONE;
    this.modifier.addModifier(this.bend);
    this.modifier.apply();
    petalShapeGeometry.vertices = temporaryMesh.geometry.vertices;

    temporaryMesh = undefined;
  }

  // 1 use the shape to create a geometry
  const geometry = new PrefabBufferGeometry(petalShapeGeometry, petalCount);

  // 2 create the timeline animation
  const timeline = new Timeline();

  // timeline.add(1.0, {
  //   rotate: {
  //     from: {
  //       axis: new Vector3(1, 1, 0),
  //       angle: 0
  //     },
  //     to: {
  //       angle: Math.PI / 2
  //     },
  //     ease: "easeQuadOut"
  //     //   easeParams: [settings.backAmplitude]
  //   },
  //   scale: {
  //     from: { x: 0, y: 0, z: 0 },
  //     to: { x: 1, y: 1, z: 1 },
  //     ease: "easeQuadOut"
  //     //   easeParams: [settings.backAmplitude]
  //   },
  //   translate: {
  //     from: { x: 0, y: distanceFromCenter, z: 0 },
  //     to: { x: 0, y: 0, z: 0 },
  //     ease: "easeQuadOut"
  //     //   easeParams: [settings.backAmplitude]
  //   }
  // });

  timeline.add(1.0, {
    rotate: {
      from: {
        axis: new Vector3(
          rotationAxis.x + openness,
          rotationAxis.y,
          rotationAxis.z
        ),
        angle: 0
      },
      to: {
        angle: rotationAngle + openness
      },
      ease: "easeQuadOut"
      //   easeParams: [settings.backAmplitude]
    },
    scale: {
      from: { x: 0, y: 0, z: 0 },
      to: { x: 1, y: 1, z: 1 },
      ease: "easeQuadOut"
      //   easeParams: [settings.backAmplitude]
    },
    translate: {
      from: { x: 0, y: 0, z: 0 },
      to: { x: 0, y: translateToY, z: 0 },
      ease: "easeQuadOut"
      //   easeParams: [settings.backAmplitude]
    }
  });

  const dataArray = [];
  const up = new Vector3(0, 1, 0);
  const normal = new Vector3();
  const quaternion = new Quaternion();

  const aPosition = geometry.createAttribute("aPosition", 3);
  const aDelayDuration = geometry.createAttribute("aDelayDuration", 3);

  const aQuaternion = geometry.createAttribute("aQuaternion", 4);

  for (let i = 0, ratio, position, rotation, angle; i < petalCount; i++) {
    ratio = i / petalCount;

    // delay
    geometry.setPrefabData(aDelayDuration, i, [ratio * 0.5, maxDuration]);

    // position
    position = new Vector3(0, 0, 0);
    rotation = (360 / petalCount) * i;

    // push away from stem in an increasing spiral pattern
    angle = _Math.degToRad(rotation);
    position.x = Math.cos(angle) * distanceFromCenter;
    position.z = Math.sin(angle) * distanceFromCenter;

    position.toArray(dataArray);
    geometry.setPrefabData(aPosition, i, dataArray);

    // rotation
    // normal.copy(position);
    normal.set(Math.cos(angle), Math.sin(angle), 0);
    normal.normalize();

    quaternion.setFromUnitVectors(up, normal);
    quaternion.toArray(dataArray);
    geometry.setPrefabData(aQuaternion, i, dataArray);
  }

  // 3 create the material
  const aColor = geometry.createAttribute("color", 3);
  const petalColor = new Color(color);

  for (let i = 0, j; i < aColor.array.length; i += 18) {
    // 6 * 3
    petalColor.setHSL(
      hslBase.x + R.floatBetween(-hslRange.x, hslRange.x),
      hslBase.y + R.floatBetween(-hslRange.y, hslRange.y),
      hslBase.z + R.floatBetween(-hslRange.z, hslRange.z)
    );

    for (j = 0; j < 18; j += 3) {
      aColor.array[i + j] = petalColor.r;
      aColor.array[i + j + 1] = petalColor.g;
      aColor.array[i + j + 2] = petalColor.b;
    }
  }

  const texture = new TextureLoader().load(imagePath, texture => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
  });

  const material = new LambertAnimationMaterial({
    vertexColors: VertexColors,
    // flatShading: true,
    side: DoubleSide,
    fog: true,
    wireframe: !true,
    transparent: true,
    lights: true,
    uniforms: {
      uTime: { value: animated ? 0 : 1 },
      uWindForce: { value: windForce },
      uWindDirection: { value: windDirection },
      color: color,
      uTextureSize: { value: textureSize }
    },
    uniformValues: {
      map: texture,
      diffuse: new Color(color),
      reflectivity: 100
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
      "diffuseColor.a *= uTime;"
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

Petals.prototype = Object.create(Mesh.prototype);
Petals.prototype.constructor = Petals;
Object.defineProperty(Petals.prototype, "time", {
  get: function() {
    return this.material.uniforms["uTime"].value;
  },
  set: function(v) {
    this.material.uniforms["uTime"].value = v;
  }
});

export default Petals;
