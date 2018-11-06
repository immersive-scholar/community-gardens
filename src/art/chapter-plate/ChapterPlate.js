import {
  _Math,
  BackSide,
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  PlaneBufferGeometry,
  RepeatWrapping,
  TextureLoader,
  Vector2
} from "three-full";
import { TweenMax, Power2 } from "gsap";

import BaseRenderable from "art/common/BaseRenderable";

class ChapterPlate extends BaseRenderable {
  constructor(props = {}) {
    super(props);

    const { color = 0xffffff, camera } = props;

    this.camera = camera;

    this.group.position.y = 0.5;
    this.group.rotation.x = 0;
    this.group.visible = false;

    this.plane = this.createPlane(color, camera);
    this.group.add(this.plane);
    this.logo = this.createLogo(color, camera);
    this.group.add(this.logo);

    this.group.position.z = this.camera.position.z + 0.5;
  }

  createPlane(color, camera) {
    // const dist = camera.position.distanceTo(new Vector3(0, 0.5, 0.5));
    const dist = camera.position.distanceTo(this.group.position);
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

  createLogo(color, camera) {
    const width = 0.1;
    const height = 0.1;
    const imagePath = `${
      process.env.PUBLIC_URL
    }/img/community-gardens-logo.png`;

    const texture = new TextureLoader().load(imagePath, texture => {
      texture.repeat = new Vector2(-1, 1);
      texture.wrapS = texture.wrapT = RepeatWrapping;
    });

    const planeGeometry = new PlaneBufferGeometry(width, height);
    const planeMaterial = new MeshLambertMaterial({
      color,
      map: texture,
      wireframe: !true,
      fog: true,
      side: DoubleSide,
      transparent: true,
      opacity: 1
    });
    var plane = new Mesh(planeGeometry, planeMaterial);
    plane.position.y = camera.position.y;
    // plane.rotation.y = Math.PI / 2;
    // plane.position.z -= 0.001;

    return plane;
  }

  clean() {
    this.tween && this.tween.kill(null, this);
    this.tween2 && this.tween2.kill(null, this);

    this.timeoutID && clearTimeout(this.timeoutID);

    if (this.plane) {
      this.plane.geometry.dispose();
      this.plane.material.dispose();
      this.group.remove(this.plane);
      this.plane = undefined;
    }

    if (this.logo) {
      this.logo.geometry.dispose();
      this.logo.material.dispose();
      this.group.remove(this.logo);
      this.logo = undefined;
    }
  }

  render() {}

  update() {
    this.render();
    super.update();
  }

  animateIn({ duration = 2, delay = 0, animated = true } = {}) {
    this.tween && this.tween.kill(null, this);
    this.tween2 && this.tween2.kill(null, this);

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

        this.tween2 = TweenMax.to(this.logo.material, duration, {
          opacity: 1,
          ease: Power2.easeOut,
          delay,
          onComplete: () => {
            resolve();
          }
        });
      } else {
        this.plane.material.opacity = 1;
        this.logo.material.opacity = 1;
        this.group.visible = true;

        this.timeoutID && clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => resolve(), 1000);
      }
    });
  }

  animateOut({ duration = 5, delay = 0 } = {}) {
    return new Promise((resolve, reject) => {
      this.tween && this.tween.kill(null, this);
      this.tween2 && this.tween2.kill(null, this);

      this.tween = TweenMax.to(this.plane.material, duration, {
        opacity: 0,
        ease: Power2.easeOut,
        delay,
        onComplete: () => {
          this.group.visible = false;
          resolve();
        }
      });

      this.tween2 = TweenMax.to(this.logo.material, duration / 2, {
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
