import { Vector3, CatmullRomCurve3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
import CurvePainter from "three/helpers/CurvePainter";
import ColorFactory from "util/ColorFactory";
import BaseRenderable from "art/common/BaseRenderable";

import SkyGeometry from "./SkyGeometry";
import TextureFactory from "util/TextureFactory";
import Circle from "art/circle/Circle";

class Sky extends BaseRenderable {
  constructor(props, camera, R) {
    super(props, camera, R);

    this.circles = [];

    this.init(props);
  }

  init = (props = {}) => {
    const { count = 10, height = 10, radius = 10, thickness = 1 } = props;

    this.leaves = [];

    this.setState(props);

    this.clean();

    for (let i = 0, circle, ratio; i < count; i++) {
      ratio = i / count;
      circle = new Circle({
        radius: radius + ratio,
        thickness,
        totalRotation: 180,
        camera: this.camera,
        R: this.R
      });
      circle.group.position.z = 5;
      circle.group.rotation.x = Math.PI / 2;
      circle.group.position.y = ratio * height;
      this.group.add(circle.group);

      this.circles.push(circle);
    }
  };

  clean() {
    // if (this.leaves) {
    //   for (let i = 0, iL = this.leaves.length, leaf; i < iL; i++) {
    //     leaf = this.leaves[i];
    //     this.group.remove(leaf.group);
    //     leaf.clean();
    //   }
    // }
    // this.leaves = [];

    if (this.skyMesh) {
      this.group.remove(this.skyMesh);
      this.skyMesh.geometry.dispose();
      this.skyMesh.material.dispose();
      this.skyMesh = undefined;
    }
  }

  animate({ delay }) {
    this.tween && this.tween.kill(null, this);
    this.tween = TweenMax.to(this, 3, {
      currentTime: 1,
      onUpdate: () => {
        this.update();
      },
      ease: Power2.easeOut,
      delay: delay + 0.5
    });
  }

  render() {}

  update() {
    // this.skyMesh.curvePainter.mesh.material.uniforms.revealProgress.value = this.currentTime;
  }
}

export default Sky;
