import { Mesh, FrontSide, Vector3, Color, BoxGeometry, Vector2 } from "three";
import {
  PhongAnimationMaterial,
  ShaderChunk,
  PrefabBufferGeometry
} from "three-bas";

class StarField extends Mesh {
  static createMaterial() {
    return new PhongAnimationMaterial({
      flatShading: true,
      side: FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uDuration: { value: 0 }
      },
      uniformValues: {
        emissive: new Color(0xe1e1e1)
      },
      varyingParameters: [
        `
        varying vec3 vColor;
      `
      ],
      vertexFunctions: [ShaderChunk["quaternion_rotation"]],
      vertexParameters: [
        `
        uniform float uTime;
        uniform float uDuration;
        attribute vec2 aDelayDuration;
        attribute vec3 aOffset;
        attribute vec4 aRotation;
        attribute vec3 aColor;
      `
      ],
      vertexInit: [
        `
        float seed = 5625463739.0;
        float time = mod(uTime, uDuration);
        float tProgress = clamp(time - aDelayDuration.x, 0.0, aDelayDuration.y) / aDelayDuration.y;
        vec4 tQuatOrient = vec4(0., 0., 0., 1.);
      `
      ],
      vertexNormal: [],
      vertexPosition: [
        `
        transformed = rotateVector(tQuatOrient, transformed);
        transformed += aOffset;
      `
      ],
      vertexColor: [
        `
        vColor = aColor;
      `
      ],
      fragmentFunctions: [],
      fragmentParameters: [],
      fragmentInit: [],
      fragmentMap: [],
      fragmentDiffuse: [
        `
        diffuseColor.xyz = vColor;
      `
      ]
    });
  }

  static assignProps(
    geometry,
    duration,
    maxDelay,
    size = 256,
    cubeSize = 1,
    minRadius,
    celestialRadius = 1024
  ) {
    const aDelayDuration = geometry.createAttribute("aDelayDuration", 2);
    const aColor = geometry.createAttribute("aColor", 3);
    const aRotation = geometry.createAttribute("aRotation", 4);
    const aOffset = geometry.createAttribute("aOffset", 3);
    for (let z = 0; z < size; z++) {
      let zPos = ((-size + 1) * 3) / 2 + z * 3;
      for (let x = 0; x < size; x++) {
        const phi = Math.random() * Math.PI * 2; // https://stackoverflow.com/a/5408843
        const cosTheta = Math.random() * 2 - 1;
        const u = Math.random();
        const theta = Math.acos(cosTheta);
        const r = celestialRadius * Math.cbrt(u);
        const index = z * size + x;
        const xPos = r * Math.sin(theta) * Math.cos(phi);
        const yPos = r * Math.sin(theta) * Math.sin(phi);
        zPos = r * Math.cos(theta);
        const position = new Vector3(xPos, yPos, zPos);
        if (position.length() < minRadius) {
          continue;
        }
        geometry.setPrefabData(aOffset, index, position.toArray());
        const color = new Vector3(
          Math.random() * 0.75 + 0.25,
          Math.random() * 0.75 + 0.25,
          Math.random() * 0.75 + 0.25
        );
        geometry.setPrefabData(aColor, index, color.toArray());
        const rotation = new Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        );
        rotation.normalize(); // ew, not functional
        geometry.setPrefabData(aRotation, index, [
          ...rotation.toArray(),
          Math.PI * 2
        ]);
        const delay = Math.random() * maxDelay;
        const delayDuration = new Vector2(delay, duration);
        geometry.setPrefabData(aDelayDuration, index, delayDuration.toArray());
      }
    }
  }

  constructor(size, minRadius, cubeSize, duration, maxDelay) {
    const totalDuration = duration + maxDelay;
    const boxGeometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
    const geometry = new PrefabBufferGeometry(boxGeometry, size * size);
    geometry.computeVertexNormals();
    geometry.bufferUvs();
    StarField.assignProps(
      geometry,
      duration,
      maxDelay,
      size,
      cubeSize,
      minRadius
    );
    const material = StarField.createMaterial();
    material.uniforms.uDuration.value = totalDuration; // refactor, not the right place for this
    super(geometry, material);
    this.frustumCulled = false;
  }

  get time() {
    return this.material.uniforms.uTime.value;
  }

  set time(newTime) {
    this.material.uniforms.uTime.value = newTime;
  }
}

export default StarField;
