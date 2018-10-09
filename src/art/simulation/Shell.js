import {
  Mesh,
  FrontSide,
  Vector3,
  Vector4,
  IcosahedronGeometry
} from "three-full";
import { PhongAnimationMaterial, Utils, ModelBufferGeometry } from "three-bas";

class Shell extends Mesh {
  static createMaterial() {
    return new PhongAnimationMaterial({
      side: FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uScalingFactor: { value: 4.9 },
        uFreqMin: { value: 0.62 },
        uFreqMax: { value: 0.72 },
        uNoiseAmplitude: { value: 1 },
        uNoiseFrequency: { value: 0.08 },
        uQWidth: { value: 0 },
        uAnimation: { value: new Vector3(0, -3, 0.16) },
        uColor1: { value: new Vector4(1, 1, 1, 1) },
        uColor2: { value: new Vector4(1, 0.8, 0.2, 1) },
        uColor3: { value: new Vector4(1, 0.03, 0, 1) },
        uColor4: { value: new Vector4(0.05, 0.02, 0.02, 1) }
      },
      vertexFunctions: [...Shell.noiseVertexFunctions],
      vertexParameters: [
        `
        uniform float uScalingFactor;
        uniform float uFreqMin;
        uniform float uFreqMax;
        uniform float uQWidth;
        uniform float uTime;
        uniform float uNoiseAmplitude;
        uniform vec3 uAnimation;
        uniform float uNoiseFrequency;
        attribute vec3 aPosition;
        varying vec3 vRawNormal;
      `
      ],
      vertexInit: [
        `
        vec3 newPosition = aPosition;
      `
      ],
      vertexNormal: [
        `
        objectNormal += newPosition;
      `
      ],
      vertexPosition: [
        `
        transformed += newPosition;
        transformed *= 1.0 - saturate(abs(turbulence(transformed * uNoiseFrequency + uAnimation * uTime, uFreqMin, uFreqMax, uQWidth) * (uNoiseAmplitude * (uNoiseFrequency * uScalingFactor))));
        vRawNormal = objectNormal;
      `
      ],
      fragmentFunctions: [
        ...Shell.noiseVertexFunctions,
        `
          uniform vec4 uColor1;
          uniform vec4 uColor2;
          uniform vec4 uColor3;
          uniform vec4 uColor4;
          vec4 fireShade (float distance) {
            float c1 = saturate(distance * 5.0 + 0.5);
            float c2 = saturate(distance * 5.0);
            float c3 = saturate(distance * 3.4 - 0.5);
            vec4 a = mix(uColor1, uColor2, c1);
            vec4 b = mix(a, uColor3, c2);
            return mix(b, uColor4, c3);
          }
        `
      ],
      fragmentParameters: [
        `
        uniform float uFreqMin;
        uniform float uFreqMax;
        uniform float uQWidth;
        uniform float uTime;
        uniform float uNoiseAmplitude;
        uniform vec3 uAnimation;
        uniform float uNoiseFrequency;
        varying vec3 vRawNormal;
      `
      ],
      fragmentDiffuse: [
        `
        float noise = saturate(abs(turbulence(vRawNormal * uNoiseFrequency + uAnimation * uTime, uFreqMin, uFreqMax, uQWidth) * uNoiseAmplitude));
        diffuseColor.rgb = fireShade(1.0 - noise).rgb;
      `
      ],
      fragmentEmissive: [
        `
        totalEmissiveRadiance = diffuseColor.rgb;
      `
      ]
    });
  }

  static assignPosition(geometry) {
    geometry.createAttribute("aPosition", 3, (data, i) => {
      geometry.centroids[i].toArray(data);
    });
  }

  static noiseVertexFunctions = [
    `
      vec3 mod289 (vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289 (vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute (vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt (vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    `,
    `
      float snoise (vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy)); // First corner
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz); // Other corners
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
        i = mod289(i); // Permutations
        vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        // Gradients: 7x7 points over a square, mapped onto an octahedron.
        // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);    // mod(j,N)
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w); //Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w; // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
    `,
    `
      # define NOISE_STEPS 1
      float turbulence (vec3 position, float minFreq, float maxFreq, float qWidth) {
        float value = 0.0;
        float cutoff = clamp(0.5 / qWidth, 0.0, maxFreq);
        float fade;
        float fOut = minFreq;
        for (int i = NOISE_STEPS; i >= 0 ; i--) {
          if (fOut >= 0.5 * cutoff) break;
          fOut *= 2.0;
          value += abs(snoise(position * fOut)) / fOut;
        }
        fade = clamp(2.0 * (cutoff - fOut) / cutoff, 0.0, 1.0);
        value += fade * abs(snoise(position * fOut)) / fOut;
        return 1.0 - value;
      }
    `
  ];

  constructor(radius, tesselation) {
    const model = new IcosahedronGeometry(radius, tesselation);
    Utils.separateFaces(model);
    const geometry = new ModelBufferGeometry(model, {
      localizeFaces: true,
      computeCentroids: true
    });
    geometry.bufferUVs();
    const material = Shell.createMaterial();
    Shell.assignPosition(geometry);
    super(geometry, material);
    this.frustumCulled = false;
  }

  get time() {
    return this.material.uniforms["uTime"].value;
  }

  set time(newTime) {
    this.material.uniforms["uTime"].value = newTime;
  }
}

export default Shell;
