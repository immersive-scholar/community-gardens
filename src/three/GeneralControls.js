import { OrbitControls, Vector3 } from "three-full";
import { TweenMax, Power2 } from "gsap";

const Controls = ({ camera }) => {
  const orbitControls = new OrbitControls(camera);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.15;
  orbitControls.enableKeys = true;
  orbitControls.autoRotate = !true;
  orbitControls.autoRotateSpeed = 0.2;
  orbitControls.screenSpacePanning = false;
  orbitControls.panSpeed = 0.1;
  orbitControls.rotateSpeed = 0.1;
  orbitControls.zoomSpeed = 0.1;

  const cameraTweenParams = new Vector3(),
    targetTweenParams = new Vector3();
  camera.position.set(0.75, 0.45, 0.75);
  // camera.position.set(0.1, 0.1, 0.1);
  update();

  const target = new Vector3(0, 0, 0);
  orbitControls.target = target.clone();

  // enable for console control.
  window.controls = orbitControls;

  function animate({
    from = {},
    to = {},
    delay = 0,
    duration = 10,
    callback = () => console.log("done")
  } = {}) {
    killTweens();

    // defaults
    from.x = from.x || camera.position.x;
    from.y = from.y || camera.position.y;
    from.z = from.z || camera.position.z;
    from.tx = from.tx || target.x;
    from.ty = from.ty || target.y;
    from.tz = from.tz || target.z;

    camera.position.set(from.x, from.y, from.z);
    cameraTweenParams.x = camera.position.x;
    cameraTweenParams.y = camera.position.y;
    cameraTweenParams.z = camera.position.z;

    this.zoomTween = TweenMax.to(cameraTweenParams, duration / 2, {
      z: to.z - 1,
      ease: Power2.easeInOut,
      delay,
      duration
    });

    this.zoomTween2 = TweenMax.to(cameraTweenParams, duration / 2, {
      z: to.z,
      ease: Power2.easeInOut,
      delay: delay + duration / 2
    });

    this.cameraTween = TweenMax.to(cameraTweenParams, duration, {
      x: to.x,
      y: to.y,
      // z: to.z,
      delay,
      ease: Power2.easeInOut,
      onUpdate: () => {
        onCameraMoveUpdate();
      },
      onComplete: () => {
        callback();
      }
    });

    target.set(from.tx, from.ty, from.tz);
    targetTweenParams.x = target.x;
    targetTweenParams.y = target.y;
    targetTweenParams.z = target.z;

    this.targetTween = TweenMax.to(targetTweenParams, duration, {
      x: to.tx,
      y: to.ty,
      z: to.tz,
      delay,
      ease: Power2.easeInOut
    });
  }

  function set({ x, y, z, tx, ty, tz }) {
    cameraTweenParams.x = x;
    cameraTweenParams.y = y;
    cameraTweenParams.z = z;
    targetTweenParams.x = tx;
    targetTweenParams.y = ty;
    targetTweenParams.z = tz;

    killTweens();

    onCameraMoveUpdate();
  }

  function animateChapter1({ delay = 0, duration = 10 } = {}) {
    killTweens();

    camera.position.set(12, 0, 12);
    cameraTweenParams.x = camera.position.x;
    cameraTweenParams.y = camera.position.y;
    cameraTweenParams.z = camera.position.z;

    this.cameraTween = TweenMax.to(cameraTweenParams, duration, {
      x: 0.5,
      y: 0.05,
      z: 0.5,
      delay,
      ease: Power2.easeInOut,
      onUpdate: () => {
        onCameraMoveUpdate();
      }
    });

    target.set(0, 10, 0);
    targetTweenParams.x = target.x;
    targetTweenParams.y = target.y;
    targetTweenParams.z = target.z;

    this.targetTween = TweenMax.to(targetTweenParams, duration, {
      y: 0.2,
      delay,
      ease: Power2.easeInOut
    });
  }

  function animateChapter2({ delay = 0, duration = 5 } = {}) {
    killTweens();

    camera.position.set(0, 1, 10);
    cameraTweenParams.x = camera.position.x;
    cameraTweenParams.y = camera.position.y;
    cameraTweenParams.z = camera.position.z;

    this.cameraTween = TweenMax.to(cameraTweenParams, duration, {
      x: 0,
      y: 1,
      z: 0.25,
      delay,
      ease: Power2.easeInOut,
      onUpdate: () => {
        onCameraMoveUpdate();
      }
    });

    target.set(0, 1, -1);
    targetTweenParams.x = target.x;
    targetTweenParams.y = target.y;
    targetTweenParams.z = target.z;

    this.targetTween = TweenMax.to(targetTweenParams, duration, {
      y: 1,
      z: 0,
      delay,
      ease: Power2.easeInOut
    });
  }

  function onCameraMoveUpdate() {
    camera.position.set(
      cameraTweenParams.x,
      cameraTweenParams.y,
      cameraTweenParams.z
    );
    orbitControls.target = targetTweenParams.clone();
  }

  const killTweens = () => {
    this.cameraTween && this.cameraTween.kill(null, this);
    this.targetTween && this.targetTween.kill(null, this);
    this.zoomTween && this.zoomTween.kill(null, this);
    this.zoomTween2 && this.zoomTween2.kill(null, this);
  };

  function update() {
    orbitControls.update();
  }

  return {
    controls: orbitControls,
    update,
    animate,
    animateChapter1,
    animateChapter2,
    killTweens,
    set
  };
};

export default Controls;
