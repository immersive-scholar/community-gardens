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

  const cameraTweenParams = new Vector3(),
    targetTweenParams = new Vector3();
  camera.position.set(0.75, 0.45, 0.75);
  // camera.position.set(0.1, 0.1, 0.1);
  update();

  const target = new Vector3(0, 0, 0);
  orbitControls.target = target.clone();

  // enable for console control.
  window.controls = orbitControls;

  function animateChapter({ delay = 0, duration = 10 } = {}) {
    console.log("Animating... ", this);
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
  };

  function update() {
    orbitControls.update();
  }

  return { controls: orbitControls, update, animateChapter };
};

export default Controls;
