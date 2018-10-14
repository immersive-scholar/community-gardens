import { Vector2, Vector3, CatmullRomCurve3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
import BaseRenderable from "art/common/BaseRenderable";

import Square from "art/square/Square";

class Bender extends BaseRenderable {
  constructor(props, camera, R) {
    super(props);

    this.leaves = [];
    this.camera = camera;
    this.R = R;

    this.init(props);
  }

  init = (props = {}) => {
    this.setState(props);

    this.clean();

    const {
      width = 1,
      height = 1,
      direction = new Vector3(1, 0.2, 3),
      axis = new Vector3(0, 0, 0),
      angle = new Vector3(0, 0, 0)
    } = this.state;

    this.square = new Square({
      width,
      height
    });
    this.square.mesh.position.y = 0.5;
    this.square.mesh.rotation.x = -Math.PI / 2;
    this.group.add(this.square.mesh);

    this.modifier = new window.ModifierStack(this.square.mesh);
    this.bend = new window.Bend(direction.x, direction.y, direction.z);
    this.bend.constraint = window.ModConstant.LEFT;
    // this.modifier.addModifier(this.bend);

    this.changeModifier(this.bend);

    this.tween && this.tween.kill(null, this.bend);
    this.tween = TweenMax.to(this.bend, 2, {
      force: -1,
      onUpdate: () => {
        this.modifier && this.modifier.apply();
      },
      ease: Power2.easeInOut,
      yoyo: true,
      repeat: -1
    });
  };

  changeModifier(mod) {
    if (this.prevMod) {
      this.modifier.removeModifier(this.prevMod);
      this.tween && this.tween.kill(null, this.bend);
    }
    this.modifier.reset();
    this.modifier.addModifier(mod);

    this.prevMod = mod;
  }

  setDirection(direction) {
    this.setState({ direction }, isDirty => {
      isDirty && this.init();
    });
  }

  setAxis(axis) {
    this.setState({ axis }, isDirty => {
      isDirty && this.init();
    });
  }

  setAngle(angle) {
    this.setState({ angle }, isDirty => {
      isDirty && this.init();
    });
  }

  clean() {
    if (this.square) {
      this.group.remove(this.square.mesh);
      this.square.mesh.geometry.dispose();
      this.square.mesh.material.dispose();
      this.square = undefined;
    }

    // if (this.prevMod) {
    //     this.modifier.removeModifier(prevMod);
    //     TweenMax.killTweensOf(prevMod);
    // }
    // this.modifier.reset();
    // this.modifier.addModifier(mod);

    // prevMod = mod;
  }

  render() {}

  update() {
    this.leavesMesh.material.uniforms.uTime.value = this.currentTime;
  }
}

export default Bender;
