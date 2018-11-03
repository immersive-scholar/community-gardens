import {
  _Math,
  BackSide,
  Group,
  Mesh,
  MeshLambertMaterial,
  PlaneBufferGeometry,
  Vector3
} from "three-full";
import { TweenMax, Power2 } from "gsap";

import BaseRenderable from "art/common/BaseRenderable";

class ChapterPlate extends BaseRenderable {
  constructor(props = {}) {
    super(props);

    const {
      color = 0xffffff,
      text = "Text",
      textColor = 0xff9900,
      textArray,
      camera
    } = props;

    this.camera = camera;
    this.text = text;
    this.textColor = textColor;
    this.textArray = textArray;

    this.group.position.y = 0.5;
    this.group.rotation.x = 0;
    this.group.visible = false;

    this.plane = this.createPlane(color, camera);
    this.group.add(this.plane);

    this.textGroup = new Group();
    this.group.add(this.textGroup);

    // const grid = this.createGrid();
    // grid.position.y = 0.001;
    // this.group.add(grid);
  }

  createChildren() {
    return new Promise((resolve, reject) => {
      // We need to resolve the animateIn once a bunch of animations have run
      // so we're storing these for later retrieval.
      this.resolve = resolve;
      this.reject = reject;

      this.group.position.z = this.camera.position.z + 2;

      const { textArray, textColor } = this;

      this.linesOfText = [];
      for (let i = 0, iL = textArray.length, t; i < iL; i++) {
        t = textArray[i];
        this.createPlate({
          text: t.text,
          color: textColor,
          offsetY: t.offsetY || -i * 0.3,
          size: t.size || 0.2
        });
      }
    });
  }

  createPlane(color, camera) {
    const dist = camera.position.distanceTo(new Vector3(0, 1, 0));
    const vFOV = _Math.degToRad(camera.fov); // convert vertical fov to radians
    const height = 2 * Math.tan(vFOV / 2) * dist; // visible height
    const width = height * camera.aspect;

    const planeGeometry = new PlaneBufferGeometry(width, height);
    const planeMaterial = new MeshLambertMaterial({
      color,
      wireframe: !true,
      fog: !true,
      side: BackSide,
      transparent: true,
      opacity: 0.5
    });
    var plane = new Mesh(planeGeometry, planeMaterial);
    plane.position.y = camera.position.y;
    return plane;
  }

  clean() {
    this.tween && this.tween.kill(null, this);

    if (this.plane) {
      this.plane.geometry.dispose();
      this.plane.material.dispose();
      this.group.remove(this.plane);
      this.plane = undefined;
    }
  }

  render() {}

  update() {
    this.render();
    super.update();
  }

  animateIn({ duration = 2, delay = 0, animated = true } = {}) {
    this.tween && this.tween.kill(null, this);

    this.group.visible = true;

    return new Promise((resolve, reject) => {
      if (animated) {
        this.tween = TweenMax.to(this.plane.material, duration, {
          opacity: 1,
          ease: Power2.easeOut,
          delay,
          onComplete: () => {
            resolve();
          }
        });
      } else {
        this.plane.material.opacity = 1;
        this.group.visible = true;

        this.timeoutID && clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => resolve(), 1000);
      }
    });
  }

  animateOut({ duration = 5, delay = 0 } = {}) {
    return new Promise((resolve, reject) => {
      this.tween && this.tween.kill(null, this);

      this.tween = TweenMax.to(this.plane.material, duration, {
        opacity: 0,
        ease: Power2.easeOut,
        delay,
        onComplete: () => {
          this.group.visible = false;
          resolve();
        }
      });
    });
  }
}

export default ChapterPlate;
