import { Vector2, Vector3, CatmullRomCurve3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
import CurvePainter from "three/helpers/CurvePainter";
import ColorSampler from "util/ColorSampler";
import BaseRenderable from "art/common/BaseRenderable";

// import StellariaPuberaPetal from "./StellariaPuberaPetal";
import Petals from "./Petals";

class StellariaPubera extends BaseRenderable {
  constructor(props, camera, R) {
    super(props);

    this.camera = camera;
    this.R = R;

    this.init(props);
  }

  init = (props = {}) => {
    this.setState(props);

    this.clean();

    const {
      width = 0.025,
      length = 0.125,
      petalCount = this.R.intBetween(10, 24),
      petalColor = 0xffffff,
      animated = true,
      imagePath = "/img/patterns/diamonds-2.png",
      textureSize = new Vector2(5, 5),
      delay = 0,
      hslBase = new Vector3(this.R.floatBetween(0.5, 1.0), 0.5, 0.93),
      hslRange = 0.02
    } = this.state;

    this.petals = new Petals({
      petalCount,
      width,
      length,
      color: petalColor,
      imagePath,
      textureSize,
      // berryDisplacement,
      // berryDistanceFromStem,
      // berryRotation,
      // berrySpiral,
      // referenceMesh: this.stem,
      R: this.R,
      animated,
      hslBase,
      hslRange
      // delay: 2
      // windForce,
      // windDirection,
    });
    this.group.add(this.petals);

    this.tween && this.tween.kill(null, this);
    if (animated) {
      this.currentTime = 0;
      this.berryTime = 0;
      this.animatePetals({ delay });
    } else {
      this.currentTime = 1;
      this.berryTime = 1;
    }
  };

  animatePetals({ delay }) {
    this.tween && this.tween.kill(null, this);
    this.tween = TweenMax.to(this, 3, {
      currentTime: 1,
      onUpdate: () => {
        this.update();
      },
      ease: Power2.easeOut,
      delay: delay + 0.5
      // yoyo: true,
      // repeat: -1
    });
  }

  setHeight(height) {
    this.setState({ height }, isDirty => {
      isDirty && this.init();
    });
  }

  setProps(props) {
    for (let prop of props) {
      console.log("props ", props);
      console.log("prop ", prop, props[prop]);
      //   this.setState({prop: props[prop]}, isDirty => {
      //     isDirty && this.init();
      //   });
    }
  }

  clean() {
    if (this.petals) {
      this.group.remove(this.petals);
      this.petals.clean();
      this.petals = undefined;
    }

    if (this.pollenMesh) {
      this.group.remove(this.pollenMesh);
      this.pollenMesh.geometry.dispose();
      this.pollenMesh.material.dispose();
      this.pollenMesh = undefined;
    }
  }

  render() {}

  update() {
    this.petals.material.uniforms.uTime.value = this.currentTime;
  }
}

export default StellariaPubera;
