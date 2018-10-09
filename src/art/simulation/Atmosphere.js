import {
  Mesh,
  AdditiveBlending,
  BackSide,
  IcosahedronGeometry
} from "three-full";
import {
  PhongAnimationMaterial,
  ModelBufferGeometry,
  ShaderChunk
} from "three-bas";

class Atmosphere extends Mesh {
  // based off of http://stemkoski.github.io/Three.js/Shader-Glow.html
  constructor(
    radius,
    orbitRadius,
    orbitDuration,
    rotationDuration,
    orbitOffset,
    color,
    camera
  ) {
    const geometry = Atmosphere.createGeometry(radius);
    const material = Atmosphere.createMaterial(
      orbitRadius,
      orbitDuration,
      rotationDuration,
      orbitOffset,
      color,
      camera
    );
    super(geometry, material);
    this.frustumCulled = false;
    this.uTime = 0;
  }

  get time() {
    return this.uTime;
  }

  set time(newTime) {
    this.uTime = newTime;
    this.material.uniforms.uTime.value = this.uTime;
  }

  static createGeometry(radius) {
    const model = new IcosahedronGeometry(radius, 4);
    const geometry = new ModelBufferGeometry(model);
    return geometry;
  }

  static createMaterial(
    orbitRadius,
    orbitDuration,
    rotationDuration,
    orbitOffset,
    color,
    camera
  ) {
    return new PhongAnimationMaterial({
      flatShading: true,
      blending: AdditiveBlending,
      transparent: true,
      side: BackSide,
      uniforms: {
        uTime: { value: 0 },
        uOrbitRadius: { value: orbitRadius },
        uOrbitDuration: { value: orbitDuration },
        uRotationDuration: { value: rotationDuration },
        uOrbitOffset: { value: orbitOffset },
        uColor: { value: color },
        uViewVector: { value: camera.position },
        uC: { value: 0.2 },
        uP: { value: 1.1 }
      },
      uniformValues: {},
      vertexParameters: [
        `
        // vertexParamters
        uniform float uTime;
        uniform float uOrbitRadius;
        uniform float uOrbitDuration;
        uniform float uRotationDuration;
        uniform float uOrbitOffset;
        uniform vec3 uViewVector;
        uniform float uC;
        uniform float uP;
      `
      ],
      varyingParameters: [
        `
        // varyingParameters
        varying float vGlowIntensity;
      `
      ],
      vertexFunctions: [
        `
        // vertexFunctions
      `,
        ShaderChunk["quaternion_rotation"]
      ],
      vertexInit: [
        `
        // vertexInit
        float orbitProgress = clamp(mod(uTime, uOrbitDuration), 0.0, uOrbitDuration) / uOrbitDuration;
        vec4 tQuatOrbit = quatFromAxisAngle(vec3(0.0, 1.0, 0.0), PI * 2.0 * orbitProgress + uOrbitOffset);
      `
      ],
      vertexNormal: [
        `
        // vertexNormal
      `
      ],
      vertexPosition: [
        `
        // vertexPosition
        transformed += rotateVector(tQuatOrbit, vec3(uOrbitRadius, 0.0, 0.0));
      `
      ],
      vertexColor: [
        `
        // vertexColor
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vViewNormal = normalize(normalMatrix * uViewVector);
        vGlowIntensity = uC; // pow(uC - dot(vNormal, vViewNormal), uP); // TODO refactor, this is wrong.  Glow wasn't working on nvidia vs intel
      `
      ],
      fragmentParameters: [
        `
        // fragmentParameters
        uniform vec3 uColor;
      `
      ],
      fragmentFunctions: [
        `
        // fragmentFunctions
      `
      ],
      fragmentInit: [
        `
        // fragmentInit
      `
      ],
      fragmentDiffuse: [
        `
        // fragmentDiffuse
        vec3 glow = uColor * vGlowIntensity;
        gl_FragColor = vec4(glow, 1.0);
        return;
      `
      ],
      fragmentMap: [
        `
        // fragmentMap
      `
      ],
      fragmentEmissive: [
        `
        // fragmentEmissive
      `
      ],
      fragmentSpecular: [
        `
        // fragmentSpecular
      `
      ]
    });
  }
}

export default Atmosphere;
