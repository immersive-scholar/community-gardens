import { Mesh, FrontSide, IcosahedronGeometry } from "three-full";
import {
  PhongAnimationMaterial,
  Utils,
  ModelBufferGeometry,
  ShaderChunk
} from "three-bas";
import { pnoise2 } from "util/perlin";

class Planet extends Mesh {
  constructor(
    seed,
    radius,
    bumpScale,
    orbitRadius,
    orbitDuration,
    rotationDuration,
    orbitOffset,
    colors,
    name
  ) {
    const pointsUp = Planet.buildPoints(3, Math.PI * 1.5);
    const uvs = [
      pointsUp[0].map(i => (i + 1) / 2).map(i => 1 - i),
      pointsUp[1].map(i => (i + 1) / 2).map(i => 1 - i),
      pointsUp[2].map(i => (i + 1) / 2).map(i => 1 - i)
    ];
    const geometry = Planet.createGeometry(uvs, radius, seed);
    const material = Planet.createMaterial(
      uvs,
      bumpScale,
      orbitRadius,
      orbitDuration,
      rotationDuration,
      orbitOffset,
      colors
    );
    material.extensions.derivatives = true;
    super(geometry, material);
    this.frustumCulled = false;
    this.uTime = 0;
    this.name = name;
  }

  static buildPoints(edgeCount, rotationOffset = 0) {
    const stepSize = (Math.PI * 2) / edgeCount;
    return Array(...new Array(edgeCount)).map((_, edgeIndex) => [
      Math.cos(edgeIndex * stepSize + rotationOffset),
      Math.sin(edgeIndex * stepSize + rotationOffset)
    ]);
  }

  get time() {
    return this.uTime;
  }

  set time(newTime) {
    this.uTime = newTime;
    this.material.uniforms.uTime.value = this.uTime;
  }

  static elevationGenerator(scaling = 20, s = Math.random()) {
    const colorLookup = {};
    const seed = 5625463739 * s;
    return vertex => {
      const key = `${vertex.x}&${vertex.y}&${vertex.z}`;
      if (colorLookup[key] === undefined) {
        const elevation = pnoise2(
          (vertex.x + seed) / scaling,
          (vertex.y + seed) / scaling
        );
        let elevationIndex = 0;
        if (elevation > 0.3) {
          // ocean
          elevationIndex = 1;
        }
        if (elevation > 0.45) {
          // sand
          elevationIndex = 2;
        }
        if (elevation > 0.62) {
          // grass
          elevationIndex = 3;
        }
        if (elevation > 0.8) {
          // dense grass
          elevationIndex = 4;
        }
        colorLookup[key] = elevationIndex;
      }
      return colorLookup[key];
    };
  }

  static createGeometry(uvs, radius, seed) {
    const getElevation = Planet.elevationGenerator(undefined, seed);
    const model = new IcosahedronGeometry(radius, 4);
    Utils.separateFaces(model); // this splits each face into its own 3 vertices, allowing us to add elevations to them (i think)
    // const barycentricCombinations = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const geometry = new ModelBufferGeometry(model);
    const aUv = geometry.createAttribute("aUv", 2);
    const aElevation = geometry.createAttribute("aElevation", 4);
    let offsetUv = 0;
    let offsetElevation = 0;
    [...new Array(geometry.faceCount)].forEach((_, faceIndex) => {
      const face = geometry.modelGeometry.faces[faceIndex];
      const { a, b, c } = face;
      const { vertices } = geometry.modelGeometry;
      const [elevationA, elevationB, elevationC] = [a, b, c].map(
        vertexIndex => {
          const vertex = vertices[vertexIndex];
          return getElevation(vertex);
        }
      );
      const elevationD = Planet.getFaceCenterColor(
        elevationA,
        elevationB,
        elevationC
      );
      for (let i = 0; i < 3; i++) {
        aUv.array[offsetUv++] = uvs[i][0];
        aUv.array[offsetUv++] = uvs[i][1];
        aElevation.array[offsetElevation++] = elevationA;
        aElevation.array[offsetElevation++] = elevationB;
        aElevation.array[offsetElevation++] = elevationC;
        aElevation.array[offsetElevation++] = elevationD;
      }
    });
    return geometry;
  }

  static getFaceCenterColor(elevationA, elevationB, elevationC) {
    // TODO refactor, probably a better way to do this
    return (elevationA + elevationB + elevationC) / 3;
  }

  getLookAtPositions(cameraElevation) {
    const { uniforms } = this.material;
    const uTime = uniforms.uTime.value;
    const uOrbitDuration = uniforms.uOrbitDuration.value;
    const uOrbitOffset = uniforms.uOrbitOffset.value;
    const uOrbitRadius = uniforms.uOrbitRadius.value;
    const orbitProgress = (uTime % uOrbitDuration) / uOrbitDuration;
    const x = Math.cos(-orbitProgress * Math.PI * 2 - uOrbitOffset);
    const z = Math.sin(-orbitProgress * Math.PI * 2 - uOrbitOffset);
    const uRotationDuration = uniforms.uRotationDuration.value;
    const rotationProgress = (uTime % uRotationDuration) / uRotationDuration;
    const rotationX = Math.cos(-rotationProgress * Math.PI * 2);
    const rotationZ = Math.sin(-rotationProgress * Math.PI * 2);
    const orbitX = x * uOrbitRadius;
    const orbitZ = z * uOrbitRadius;
    const cameraX = orbitX + rotationX * cameraElevation;
    const cameraZ = orbitZ + rotationZ * cameraElevation;
    return [orbitX, 0, orbitZ, cameraX, 0, cameraZ];
  }

  static createMaterial(
    uvs,
    bumpScale,
    orbitRadius,
    orbitDuration,
    rotationDuration,
    orbitOffset,
    colors
  ) {
    return new PhongAnimationMaterial({
      flatShading: true,
      side: FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uBumpScale: { value: bumpScale },
        uUvA: { value: uvs[0] },
        uUvB: { value: uvs[1] },
        uUvC: { value: uvs[2] },
        uOrbitRadius: { value: orbitRadius },
        uOrbitDuration: { value: orbitDuration },
        uRotationDuration: { value: rotationDuration },
        uOrbitOffset: { value: orbitOffset },
        uColor0: { value: colors[0] },
        uColor1: { value: colors[1] },
        uColor2: { value: colors[2] },
        uColor3: { value: colors[3] },
        uColor4: { value: colors[4] }
      },
      uniformValues: {},
      vertexParameters: [
        `
        // vertexParamters
        attribute vec2 aUv;
        attribute vec3 aBarycentric;
        attribute vec4 aElevation;
        uniform float uTime;
        uniform float uOrbitRadius;
        uniform float uOrbitDuration;
        uniform float uRotationDuration;
        uniform float uOrbitOffset;
      `
      ],
      varyingParameters: [
        `
        // varyingParameters
        varying vec2 vUv;
        varying vec4 vElevation;
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
        float rotationProgress = clamp(mod(uTime, uRotationDuration), 0.0, uRotationDuration) / uRotationDuration;
        vec4 tQuatRotate = quatFromAxisAngle(vec3(0.0, 1.0, 0.0), PI * 2.0 * rotationProgress);
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
        transformed = rotateVector(tQuatRotate, transformed);
        transformed += rotateVector(tQuatOrbit, vec3(uOrbitRadius, 0.0, 0.0));
      `
      ],
      vertexColor: [
        `
        // vertexColor
        vUv = aUv;
        vElevation = aElevation;
      `
      ],
      fragmentParameters: [
        `
        // fragmentParameters
        uniform vec2 uUvA;
        uniform vec2 uUvB;
        uniform vec2 uUvC;
        uniform float uBumpScale;
        uniform vec3 uColor0;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
      `
      ],
      fragmentFunctions: [
        `
        // fragmentFunctions
        float terrainShininess (float elev) {
          float landShininess = 10.0;
          float waterShininess = 100.0;
          if (elev >= 4.0) {
            return landShininess; // dense grass
          }
          if (elev >= 3.0) {
            return landShininess; // grass
          }
          if (elev >= 2.0) {
            return landShininess; // sand
          }
          if (elev >= 1.0) {
            return waterShininess; // ocean
          }
          return waterShininess; // deep ocean
        }

        vec3 terrainColor (float elev, vec3 color0, vec3 color1, vec3 color2, vec3 color3, vec3 color4) {
          if (elev >= 4.0) {
            return color0;
          }
          if (elev >= 3.0) {
            return color1;
          }
          if (elev >= 2.0) {
            return color2;
          }
          if (elev >= 1.0) {
            return color3;
          }
          return color4;
        }

        vec3 cartesianToBarycentric (vec2 p1, vec2 p2, vec2 p3, vec2 p) { // http://totologic.blogspot.com/2014/01/accurate-point-in-triangle-test.html
          float denominator = ((p2.y - p3.y) * (p.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
          float a = ((p2.y - p3.y) * (p.x - p3.x) + (p3.x - p2.x) * (p.y - p3.y)) / denominator;
          float b = ((p3.y - p1.y) * (p.x - p3.x) + (p1.x - p3.x) * (p.y - p3.y)) / denominator;
          float c = 1.0 - a - b;
          return vec3(a, b, c);
        }

        float getPointElevation (vec4 elevation, vec3 barycentric) {
          if (barycentric.x > barycentric.y + barycentric.z) {
            return elevation.x;
          } else if (barycentric.y > barycentric.x + barycentric.z) {
            return elevation.y;
          } else if (barycentric.z > barycentric.x + barycentric.y) {
            return elevation.z;
          }
          return elevation.w;
        }

        vec3 perturbNormalArb (vec3 surf_pos, vec3 surf_norm, vec2 dHdxy) {
          vec3 vSigmaX = vec3(dFdx(surf_pos.x), dFdx(surf_pos.y), dFdx(surf_pos.z));
          vec3 vSigmaY = vec3(dFdy(surf_pos.x), dFdy(surf_pos.y), dFdy(surf_pos.z));
          vec3 vN = surf_norm;
          vec3 R1 = cross(vSigmaY, vN);
          vec3 R2 = cross(vN, vSigmaX);
          float fDet = dot(vSigmaX, R1);
          vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
          return normalize(abs(fDet) * surf_norm - vGrad);
        }

        vec2 dHdxy_fwd (vec2 uvA, vec2 uvB, vec2 uvC, vec2 uv, vec4 elevation, float bumpScale) {
          vec2 dSTdx = dFdx(uv);
          vec2 dSTdy = dFdy(uv);
          float Hll = bumpScale * getPointElevation(elevation, cartesianToBarycentric(uvA, uvB, uvC, uv));
          float dBx = bumpScale * getPointElevation(elevation, cartesianToBarycentric(uvA, uvB, uvC, uv + dSTdx)) - Hll;
          float dBy = bumpScale * getPointElevation(elevation, cartesianToBarycentric(uvA, uvB, uvC, uv + dSTdy)) - Hll;
          return vec2(dBx, dBy);
        }
      `
      ],
      fragmentInit: [
        `
        // fragmentInit
        vec4 elevation = ceil(vElevation + 0.5) - 1.0;
      `
      ],
      fragmentDiffuse: [
        `
        // fragmentDiffuse
        vec3 barycentric = cartesianToBarycentric(uUvA, uUvB, uUvC, vUv);
        float pointElevation = getPointElevation(elevation, barycentric);
        diffuseColor.rgb = terrainColor(pointElevation, uColor0, uColor1, uColor2, uColor3, uColor4);
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
        if (pointElevation > 1.0) {
          normal = perturbNormalArb(-vViewPosition, normal, dHdxy_fwd(uUvA, uUvB, uUvC, vUv, elevation, uBumpScale));
        }
      `
      ],
      fragmentSpecular: [
        `
        // fragmentSpecular
        material.specularShininess = terrainShininess(pointElevation);
      `
      ]
    });
  }
}

export default Planet;
