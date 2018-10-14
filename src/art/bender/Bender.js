import { Vector2, Vector3, CatmullRomCurve3 } from "three-full";
import { TweenMax, Power2 } from "gsap";
import BaseRenderable from "art/common/BaseRenderable";
import Modifiers from "three/vendor/Modifiers";

import Cube from "art/cube/Cube";

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
      length = 1,
      direction = new Vector3(1, 0.2, 3),
      force = 2
    } = this.state;

    this.cube = new Cube({
      width,
      height,
      length
    });
    this.cube.mesh.position.y = 0.5;
    this.cube.mesh.rotation.x = -Math.PI / 2;
    this.group.add(this.cube.mesh);

    this.modifier = Modifiers.ModifierStack(this.cube.mesh);
    this.bend = Modifiers.Bend(direction.x, direction.y, direction.z);
    this.bend.force = 0;
    this.bend.constraint = Modifiers.ModConstant().NONE;

    this.changeModifier(this.bend);

    this.tween && this.tween.kill(null, this.bend);
    this.tween = TweenMax.to(this.bend, 2, {
      force,
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

  setForce(force) {
    this.setState({ force }, isDirty => {
      isDirty && this.init();
    });
  }

  clean() {
    if (this.cube) {
      this.group.remove(this.cube.mesh);
      this.cube.mesh.geometry.dispose();
      this.cube.mesh.material.dispose();
      this.cube = undefined;
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

  update() {}
}

export default Bender;
