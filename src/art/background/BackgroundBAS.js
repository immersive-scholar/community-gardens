import { Color, DoubleSide, Mesh, TetrahedronGeometry } from "three-full";
import { ModelBufferGeometry, PhongAnimationMaterial } from "three/vendor/BAS";
import { TweenMax, Power2 } from "gsap";

function BackgroundBAS({
  R,
  currentTime = 0,
  color,
  animated = true,
  delay = 0
}) {
  // 4. generate geometry (maybe find a cheaper way to do this)
  const modelGeometry = new TetrahedronGeometry(75);

  // 5. feed the geometry to the animation
  const geometry = new ModelBufferGeometry(modelGeometry);

  const material = new PhongAnimationMaterial({
    flatShading: !true,
    side: DoubleSide,
    transparent: !true, // required for diffuseColor.a to have an effect
    opacity: 1,

    uniforms: {
      uTime: { value: animated ? 0 : 1 }
    },
    uniformValues: {
      diffuse: new Color(color)
    },
    // vertexParameters: ["uniform float uTime;"],
    // vertexPosition: ["transformed *= uTime;"]
    fragmentParameters: ["uniform float uTime;"],
    fragmentDiffuse: ["diffuseColor.rgb *= uTime;"]
  });

  geometry.computeVertexNormals();

  Mesh.call(this, geometry, material);

  this.frustumCulled = false;

  this.animateIn = function({ duration = 5, delay = 0, animated = true } = {}) {
    this.tween && this.tween.kill(null, this);
    if (animated) {
      this.currentTime = 0;
      this.tween = TweenMax.to(this, duration, {
        currentTime: 1,
        onUpdate: () => {
          this.update();
        },
        delay,
        ease: Power2.easeInOut
      });
    } else {
      this.currentTime = 1;
    }
  };

  this.clean = function() {
    this.tween && this.tween.kill(null, this);
    geometry && geometry.dispose();
    material && material.dispose();
  };

  this.update = function() {
    material.uniforms["uTime"].value = this.currentTime;
  };
}

BackgroundBAS.prototype = Object.create(Mesh.prototype);
BackgroundBAS.prototype.constructor = BackgroundBAS;
// Object.defineProperty(BackgroundBAS.prototype, "time", {
//   get: function() {
//     return this.material.uniforms["uTime"].value;
//   },
//   set: function(v) {
//     this.material.uniforms["uTime"].value = v;
//   }
// });

export default BackgroundBAS;
