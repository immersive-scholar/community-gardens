import {
  Scene,
  WebGLRenderer,
  Vector3,
  AmbientLight,
  PointLight,
  PointLightHelper,
  PerspectiveCamera,
  OrbitControls
} from "three-full";

import React, { Component } from "react";
class Simulation extends Component {
  static defaultProps = {
    entities: [],
    fov: 80,
    cameraPosition: new Vector3(0, 0, 0)
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const camera = this.createCamera(
      this.props.fov,
      this.props.cameraPosition,
      window.innerWidth,
      window.innerHeight
    );
    camera.target = new Vector3(0, 0, 0);
    camera.lookAt(camera.target);
    const scene = new Scene();
    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: false,
      canvas: this.canvas
    });
    const handleWindowResize = this.onWindowResize(camera, renderer);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize, false);
    const controls = this.createControls(camera, renderer.domElement);
    this.props.entities.forEach(e => scene.add(e));
    const { lights, pointLights } = this.createLights();
    lights.forEach(light => scene.add(light));
    this.animate(
      renderer,
      scene,
      camera,
      controls,
      this.props.entities,
      pointLights,
      +new Date()
    );
  }

  createLights() {
    const ambientLight = new AmbientLight(0x333333);
    const pointLightA = new PointLight(0xffffff, 1);
    const pointLightHelperA = new PointLightHelper(pointLightA, 1);
    // const pointLightB = new PointLight(0xffffff, 1);
    // const pointLightHelperB = new PointLightHelper(pointLightB, 1);
    return {
      lights: [
        ambientLight,
        pointLightA,
        pointLightHelperA
        // pointLightB,
        // pointLightHelperB
      ],
      pointLights: [
        pointLightA
        // pointLightB
      ]
    };
  }

  createCamera(fov, pos, width, height) {
    const camera = new PerspectiveCamera(fov, width / height, 1, 10000);
    camera.position.x = pos.x;
    camera.position.y = pos.y;
    camera.position.z = pos.z;
    return camera;
  }

  createControls(camera, mount) {
    const controls = new OrbitControls(camera, mount);
    controls.target = camera.target;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.1;
    return controls;
  }

  onWindowResize(camera, renderer) {
    return () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
  }

  animate(renderer, scene, camera, controls, entities, pointLights, lastTime) {
    const currentTime = +new Date();
    const timeDelta = currentTime - lastTime;
    entities.forEach(e => {
      e.time += timeDelta / 1000;
      if (e.material.uniforms.uViewVector) {
        e.material.uniforms.uViewVector.value.set(camera.position);
      }
    });
    requestAnimationFrame(() => {
      this.animate(
        renderer,
        scene,
        camera,
        controls,
        entities,
        pointLights,
        currentTime
      );
    });
    if (this.focusTarget && this.focusTarget.getLookAtPositions) {
      const [
        targetX,
        targetY,
        targetZ,
        cameraX,
        cameraY,
        cameraZ
      ] = this.focusTarget.getLookAtPositions(this.props.cameraElevation);
      camera.position.set(cameraX, cameraY, cameraZ);
      controls.target.set(targetX, targetY, targetZ);
    }
    controls.update();
    renderer.render(scene, camera);
  }

  focusObject(target) {
    this.focusTarget = target;
  }

  render() {
    return <canvas ref={c => (this.canvas = c)} />;
  }
}

export default Simulation;
