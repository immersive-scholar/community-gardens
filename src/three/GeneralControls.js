import { OrbitControls, Vector3 } from "three-full";
import { TweenMax, Power2, Power3, Back } from "gsap";

const Controls = ({ camera, velocity = 1, domElement }) => {
  const orbitControls = new OrbitControls(camera, domElement);
  console.log("orbitControls.domElement ", orbitControls.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.15;
  orbitControls.enableKeys = true;
  orbitControls.autoRotate = !true;
  orbitControls.autoRotateSpeed = 0.2;
  orbitControls.screenSpacePanning = false;
  orbitControls.panSpeed = 0.1;
  orbitControls.rotateSpeed = 0.1;
  orbitControls.zoomSpeed = 0.1;

  let timeScale = velocity;
  let oldAutoRotate = false;
  let timeoutID = 0;

  let cameraTween, targetTween, zoomTween, zoomTween2;

  const cameraTweenParams = new Vector3(),
    targetTweenParams = new Vector3();
  // camera.position.set(0.75, 0.45, 0.75);
  camera.position.set(0, 0.5, -1);
  update();

  const target = new Vector3(0, 0.5, 1);
  orbitControls.target = target.clone();

  // enable for console control.
  window.controls = orbitControls;

  // pulls back before focusing
  function walkabout({
    from = {},
    to = {},
    delay = 0,
    duration = 10,
    callback = () => console.log("done")
  } = {}) {
    // defaults
    from.x = from.x || camera.position.x;
    from.y = from.y || camera.position.y;
    from.z = from.z || camera.position.z;
    from.tx = from.tx || orbitControls.target.x;
    from.ty = from.ty || orbitControls.target.y;
    from.tz = from.tz || orbitControls.target.z;

    killTweens();

    camera.position.set(from.x, from.y, from.z);
    cameraTweenParams.x = camera.position.x;
    cameraTweenParams.y = camera.position.y;
    cameraTweenParams.z = camera.position.z;

    zoomTween = TweenMax.to(cameraTweenParams, (duration / 2) * velocity, {
      z: to.z - 1,
      ease: Power3.easeInOut,
      delay,
      duration
    });

    zoomTween2 = TweenMax.to(cameraTweenParams, (duration / 2) * velocity, {
      z: to.z,
      ease: Power3.easeInOut,
      delay: delay + duration / 2
    });

    cameraTween = TweenMax.to(cameraTweenParams, duration * velocity, {
      x: to.x,
      y: to.y,
      // z: to.z, // handled by 'zoom' tweens above
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

    targetTween = TweenMax.to(targetTweenParams, duration * velocity * 0.9, {
      x: to.tx,
      y: to.ty,
      z: to.tz,
      delay,
      ease: Back.easeOut
    });
  }

  // direct line to end position
  function animate({
    from = {},
    to = {},
    delay = 0,
    duration = 10,
    callback = () => console.log("done")
  } = {}) {
    // defaults
    from.x = from.x || camera.position.x;
    from.y = from.y || camera.position.y;
    from.z = from.z || camera.position.z;
    from.tx = from.tx || orbitControls.target.x;
    from.ty = from.ty || orbitControls.target.y;
    from.tz = from.tz || orbitControls.target.z;

    killTweens();

    camera.position.set(from.x, from.y, from.z);
    cameraTweenParams.x = camera.position.x;
    cameraTweenParams.y = camera.position.y;
    cameraTweenParams.z = camera.position.z;
    cameraTween = TweenMax.to(cameraTweenParams, duration * velocity, {
      x: to.x,
      y: to.y,
      z: to.z,
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

    targetTween = TweenMax.to(targetTweenParams, duration * velocity, {
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

  function animateSpin({ duration = 60000 }) {
    timeoutID && clearTimeout(timeoutID);

    return new Promise(resolve => {
      timeoutID = setTimeout(() => {
        setAutoRotate(false);
        return resolve();
        // if timeMultiplier is 0.3, then everything is playing at 30%
        // so we need to make the timeout longer
      }, duration);
    });
  }

  function animateChapter1({ delay = 0, duration = 10 } = {}) {
    killTweens();

    camera.position.set(12, 0, 12);
    cameraTweenParams.x = camera.position.x;
    cameraTweenParams.y = camera.position.y;
    cameraTweenParams.z = camera.position.z;

    cameraTween = TweenMax.to(cameraTweenParams, duration * velocity, {
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

    targetTween = TweenMax.to(targetTweenParams, duration * velocity, {
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

    cameraTween = TweenMax.to(cameraTweenParams, duration * velocity, {
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

    targetTween = TweenMax.to(targetTweenParams, duration * velocity, {
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

  function killTweens() {
    cameraTween && cameraTween.kill();
    targetTween && targetTween.kill();
    zoomTween && zoomTween.kill();
    zoomTween2 && zoomTween2.kill();

    timeoutID && clearTimeout(timeoutID);
  }

  function pause() {
    // TweenMax.globalTimeScale(0);
    cameraTween && cameraTween.pause();
    targetTween && targetTween.pause();
    zoomTween && zoomTween.pause();
    zoomTween2 && zoomTween2.pause();

    timeoutID && clearTimeout(timeoutID);

    oldAutoRotate = orbitControls.autoRotate;
    orbitControls.autoRotate = false;
  }

  function play() {
    // TweenMax.globalTimeScale(timeScale || 1);
    cameraTween && cameraTween.play();
    targetTween && targetTween.play();
    zoomTween && zoomTween.play();
    zoomTween2 && zoomTween2.play();

    // orbitControls.autoRotate = oldAutoRotate;
    if (oldAutoRotate) {
      animateSpin({ duration: 15000 });
    }
  }

  function setGlobalTimeScale(v) {
    // we can affect just the camera movement
    // velocity = v;
    // or we can affect _all_ of the animations
    timeScale = v;
    TweenMax.globalTimeScale(v);
  }

  function setTimeMultiplier(t) {
    orbitControls.autoRotateSpeed = 0.15 * (1 / t);
  }

  function update() {
    orbitControls.update();
  }

  function setAutoRotate(a) {
    orbitControls.autoRotate = a;
  }

  return {
    controls: orbitControls,
    update,
    animate,
    animateChapter1,
    animateChapter2,
    animateSpin,
    killTweens,
    pause,
    play,
    set,
    setGlobalTimeScale,
    walkabout,
    setAutoRotate,
    setTimeMultiplier
  };
};

export default Controls;
