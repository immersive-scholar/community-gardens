import {
  _Math,
  Color,
  DoubleSide,
  Mesh,
  Quaternion,
  SphereGeometry,
  PlaneGeometry,
  TextureLoader,
  Vector2,
  Vector3,
  VertexColors
} from "three-full";
import {
  LambertAnimationMaterial,
  ShaderChunk,
  Timeline,
  PrefabBufferGeometry
} from "three/vendor/BAS";
import { TweenMax, Power0 } from "gsap";

import ColorFactory from "util/ColorFactory";
import TextureFactory from "util/TextureFactory";

function Sky({
  count = 100,
  size = 5,
  color = ColorFactory.getRandomColor(),
  R,
  hslBase = new Vector3(R.floatBetween(0.5, 1.0), 0.5, 0.1),
  hslRange = new Vector3(0, 0, 0.1),
  imagePath = TextureFactory.getStroke(),

  animated,
  windForce = 0.1,
  windDirection = new Vector3(2, 2, 0),
  startPoint = 0.3,
  endPoint = 0.9,
  displacement = new Vector2(0.01, 0.01),
  distanceFromCenter = 1,
  rotation = 360,
  spiralDepth = 0.0025,
  spiral = true,
  rotationAxis = new Vector3(1, 1, 0),
  rotationAngle = Math.PI / 2,
  translateToY = 0
}) {
  // calculate prefab size based on the number of prefabs to spread over the surface
  var prefabGeometry = new PlaneGeometry(size, size);

  // the number of times the prefabGeometry will be repeated
  var prefabCount = count;

  // PrefabBufferGeometry extends BufferGeometry
  // it stores data that is used for animation calculation in addition to the actual geometry
  var geometry = new PrefabBufferGeometry(prefabGeometry, prefabCount);

  // temp stuff
  var i, j, offset;

  // create a BufferAttribute with an item size of 2
  // each prefab has an animation duration and a delay
  // these will be used to calculate the animation state within the vertex shader
  var aDelayDuration = geometry.createAttribute("aDelayDuration", 2);
  var duration = 1.0;
  var maxPrefabDelay = 0.5;

  // used in the Animation.animate function below
  this.totalDuration = duration + maxPrefabDelay;

  // give each prefab a random delay
  for (i = 0, offset = 0; i < prefabCount; i++) {
    var delay = R.floatBetween(0, maxPrefabDelay);

    // store the duration and the delay for each vertex of the prefab
    // we have to do this because the vertex shader is executed for each vertex
    // because the values are the same per vertex, the prefab will move as a whole
    // if the duration or delay varies per vertex, you can achieve a stretching effect
    for (j = 0; j < prefabGeometry.vertices.length; j++) {
      aDelayDuration.array[offset] = delay;
      aDelayDuration.array[offset + 1] = duration;

      offset += 2;
    }
  }

  // create two BufferAttributes with an item size of 3
  // these will store the start and end position for the translation
  var aStartPosition = geometry.createAttribute("aStartPosition", 3);
  var aEndPosition = geometry.createAttribute("aEndPosition", 3);

  // make two temp vectors so we don't create excessive objects inside the loop
  var startPosition = new Vector3();
  var endPosition = new Vector3();
  var range = 400;
  var prefabData = [];

  // calculate the stand and end positions for each prefab
  for (i = 0; i < prefabCount; i++) {
    startPosition.x = 0;
    startPosition.y = -20;
    startPosition.z = R.floatBetween(10, 20);

    endPosition.x = R.floatBetween(-10, 10);
    endPosition.y = R.floatBetween(-10, 10);
    endPosition.z = startPosition.z;

    // this data has to be stored per prefab as well
    // PrefabBufferGeometry.setPrefabData is a convenience method for this
    // calling this (instead of the unfolded way like aDelayDuration) might be slightly slower in large geometries
    geometry.setPrefabData(
      aStartPosition,
      i,
      startPosition.toArray(prefabData)
    );
    geometry.setPrefabData(aEndPosition, i, endPosition.toArray(prefabData));
  }

  // the axis and angle will be used to calculate the rotation of the prefab using a Quaternion
  // we use quaternions instead of (rotation) matrices because the quaternion is more compact (4 floats instead of 16)
  // it also requires less trig functions (sin, cos), which are fairly expensive on the GPU
  var axis = new Vector3();
  var angle;

  // create a BufferAttribute with an item size of 4
  // the 3rd argument is a function that will be called for each prefab
  // it essentially replaces the loop we used for the other attributes
  // the first argument, 'data', should be populated with the data for the attribute
  // 'i' is the index of the prefab
  // 'total' is the total number of prefabs (same as prefabCount)
  // this is the most compact way of filling the buffer, but it's a little slower and less flexible than the others
  geometry.createAttribute("aAxisAngle", 4, function(data, i, total) {
    // get a random axis
    axis.x = R.floatBetween(0, 0.2);
    axis.y = R.floatBetween(0, 0.2);
    axis.z = R.floatBetween(0, 0.2);
    // axis has to be normalized, or else things get weird
    axis.normalize();
    // the total angle of rotation around the axis
    angle = Math.PI * _Math.randFloat(0, Math.PI / 8);

    // copy the data to the array
    axis.toArray(data);
    data[3] = angle;
  });

  // Create the material
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

  const texture = new TextureLoader().load(imagePath);
  const opacity = 1;

  // StandardAnimationMaterial uses the data in the buffer geometry to calculate the animation state
  // this calculation is performed in the vertex shader
  // StandardAnimationMaterial uses js shader chunks to duplicate the MeshStandardMaterial
  // the shader is then 'extended' by injecting our own chunks at specific points
  // BAS also extends MeshPhongMaterial and MeshBasicMaterial in the same way
  var material = new LambertAnimationMaterial({
    // material parameters/flags go here
    vertexColors: VertexColors,
    flatShading: !true,
    lights: true,
    fog: true,
    transparent: true,
    opacity,
    // custom uniform definitions
    uniforms: {
      // uTime is updated every frame, and is used to calculate the current animation state
      // this is the only value that changes, which is the reason we can animate so many objects at the same time
      uTime: { value: 0 },
      color,
      opacity
    },
    // uniform *values* of the material we are extending go here
    uniformValues: {
      metalness: 0.5,
      roughness: 0.5,
      diffuse: new Color(color)
    },
    // BAS has a number of functions that can be reused. They can be injected here.
    vertexFunctions: [
      // Penner easing functions easeCubicInOut and easeQuadOut (see the easing example for all available functions)
      ShaderChunk["ease_cubic_in_out"],
      ShaderChunk["ease_quad_out"],
      // quatFromAxisAngle and rotateVector functions
      ShaderChunk["quaternion_rotation"]
    ],
    // parameter  must match uniforms and attributes defined above in both name and type
    // as a convention, I prefix uniforms with 'u' and attributes with 'a' (and constants with 'c', varyings with 'v', and temps with 't')
    vertexParameters: [
      "uniform float uTime;",
      "attribute vec2 aDelayDuration;",
      "attribute vec3 aStartPosition;",
      "attribute vec3 aEndPosition;",
      "attribute vec4 aAxisAngle;"
    ],
    // this chunk is injected 1st thing in the vertex shader main() function
    // variables declared here are available in all subsequent chunks
    vertexInit: [
      // calculate a progress value between 0.0 and 1.0 based on the vertex delay and duration, and the uniform time
      "float tProgress = clamp(uTime - aDelayDuration.x, 0.0, aDelayDuration.y) / aDelayDuration.y;",
      // ease the progress using one of the available easing functions
      "tProgress = easeCubicInOut(tProgress);",
      // calculate a quaternion based on the vertex axis and the angle
      // the angle is multiplied by the progress to create the rotation animation
      "vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, aAxisAngle.w * tProgress);"
    ],
    // this chunk is injected before all default normal calculations
    vertexNormal: [
      // 'objectNormal' is used throughout the js vertex shader
      // we rotate it to match the new orientation of the prefab
      // this isn't required when using flat shading
      //'objectNormal = rotateVector(tQuat, objectNormal);'
    ],
    // this chunk is injected before all default position calculations (including the model matrix multiplication)
    vertexPosition: [
      // calculate a scale based on tProgress
      // here an easing function is used with the (t, b, c, d) signature (see easing example)
      "float scl = easeQuadOut(tProgress, 0.5, 1.5, 1.0);",
      // 'transformed' is the vertex position modified throughout the js vertex shader
      // it contains the position of each vertex in model space
      // scaling it can be done by simple multiplication
      "transformed *= scl;",
      // rotate the vector by the quaternion calculated in vertexInit
      "transformed = rotateVector(tQuat, transformed);",
      // linearly interpolate between the start and end position based on tProgress
      // and add the value as a delta
      "transformed += mix(aStartPosition, aEndPosition, tProgress);"
    ],
    fragmentParameters: ["uniform float uTime;", "uniform vec2 uTextureSize;"],
    fragmentMap: [
      // "vec4 texelColor = texture2D(map, vUv * uTextureSize);",
      // "diffuseColor *= texelColor;",
      "diffuseColor.a *= uTime * opacity;"
    ]
  });

  // geometry.computeVertexNormals();
  // geometry.bufferUvs();
  // geometry.computeBoundingSphere();

  Mesh.call(this, geometry, material);
  //   this.castShadow = true;
  this.frustumCulled = false;

  this.clean = function() {
    geometry && geometry.dispose();
    material && material.dispose();
  };

  this.animate(24.0, {
    ease: Power0.easeIn
    // repeat: -1,
    // repeatDelay: 0.25
    // yoyo: true
  });

  return this;
}

Sky.prototype = Object.create(Mesh.prototype);
Sky.prototype.constructor = Sky;
Object.defineProperty(Sky.prototype, "time", {
  get: function() {
    return this.material.uniforms["uTime"].value;
  },
  set: function(v) {
    this.material.uniforms["uTime"].value = v;
  }
});

Sky.prototype.animate = function(duration, options) {
  options = options || {};
  options.time = this.totalDuration;

  return TweenMax.fromTo(this, duration, { time: 0.0 }, options);
};

export default Sky;
