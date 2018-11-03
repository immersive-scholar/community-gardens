import {
  _Math,
  Box3,
  BufferGeometry,
  DoubleSide,
  FontLoader,
  GeometryUtils,
  Group,
  Mesh,
  MeshLambertMaterial,
  PlaneBufferGeometry,
  TextGeometry,
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

    // start location
    this.group.position.y = 5;
    this.group.rotation.x = Math.PI / 2;
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
      fog: true,
      side: DoubleSide,
      transparent: true,
      opacity: 1
    });
    var plane = new Mesh(planeGeometry, planeMaterial);
    // plane.rotation.x = -Math.PI / 2;
    plane.position.y = camera.position.y;
    return plane;
  }

  createPlate({ text = "!", color = 0xff9900, size = 0.2, offsetY = 0 }) {
    const loader = new FontLoader();
    let geometry,
      height = 0.05;

    loader.load(
      //   `${process.env.PUBLIC_URL}/fonts/helvetiker_regular.typeface.json`,
      `${process.env.PUBLIC_URL}/fonts/droid/droid_serif_regular.typeface.json`,
      font => {
        geometry = new TextGeometry(text, {
          font: font,
          size,
          height,
          curveSegments: 12
        });

        geometry.computeBoundingBox();
        geometry.computeVertexNormals();

        var triangleAreaHeuristics = 0.1 * (height * size);
        for (var i = 0; i < geometry.faces.length; i++) {
          var face = geometry.faces[i];
          if (face.materialIndex == 1) {
            for (var j = 0; j < face.vertexNormals.length; j++) {
              face.vertexNormals[j].z = 0;
              face.vertexNormals[j].normalize();
            }
            var va = geometry.vertices[face.a];
            var vb = geometry.vertices[face.b];
            var vc = geometry.vertices[face.c];
            var s = GeometryUtils.triangleArea(va, vb, vc);
            if (s > triangleAreaHeuristics) {
              for (var j = 0; j < face.vertexNormals.length; j++) {
                face.vertexNormals[j].copy(face.normal);
              }
            }
          }
        }

        var centerOffset =
          -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

        const bufferGeometry = new BufferGeometry().fromGeometry(geometry);

        const material = new MeshLambertMaterial({
          color,
          reflectivity: 50,
          emissive: 0x000000,
          wireframe: true
        });
        let mesh = new Mesh(bufferGeometry, material);
        mesh.position.x = -centerOffset;
        mesh.position.y = offsetY;
        mesh.rotation.y = Math.PI;
        mesh.position.z = -0.01;

        this.textGroup.add(mesh);

        this.linesOfText.push(mesh);

        if (this.textGroup.children.length === this.textArray.length) {
          this.resolve();
        }

        // this.centerText();
      }
    );
  }

  //   centerText() {
  //     // center the text
  //     let boundingBox = new Box3().setFromObject(this.textGroup);
  //     let center = new Vector3();
  //     boundingBox.getCenter(center);
  //     console.log("center ", center);
  //     this.textGroup.position.y = -center.y + 1;
  //   }

  clean() {
    this.tween && this.tween.kill(null, this);
    this.tween2 && this.tween2.kill(null, this);

    if (this.plane) {
      this.plane.geometry.dispose();
      this.plane.material.dispose();
      this.group.remove(this.plane);
      this.plane = undefined;
    }

    for (let i = 0, iL = this.linesOfText.length, line; i < iL; i++) {
      line = this.linesOfText[i];
      if (line) {
        line.geometry.dispose();
        line.material.dispose();
        this.textGroup.remove(line);
        line = undefined;
      }
    }
    this.linesOfText = [];

    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      this.group.remove(this.mesh);
      this.mesh = undefined;
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
    this.tween3 && this.tween3.kill(null, this);

    this.group.visible = true;

    return new Promise((resolve, reject) => {
      if (animated) {
        // this.tween = TweenMax.to(this.group.position, duration, {
        //   y: 0.5,
        //   ease: Power2.easeOut,
        //   delay,
        //   onComplete: () => resolve()
        // });
        // this.tween2 = TweenMax.to(this.group.rotation, duration, {
        //   x: 0,
        //   ease: Power2.easeOut,
        //   delay
        // });
        this.tween3 = TweenMax.to(this.plane.material, duration, {
          opacity: 1,
          ease: Power2.easeOut,
          delay,
          onComplete: () => {
            resolve();
          }
        });
      } else {
        this.group.position.y = 0.5;
        this.group.rotation.x = 0;
        this.visible = true;

        this.timeoutID && clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => resolve(), 1000);
      }
    });
  }

  animateOut({ duration = 5, delay = 0 } = {}) {
    return new Promise((resolve, reject) => {
      this.tween && this.tween.kill(null, this);
      this.tween2 && this.tween2.kill(null, this);
      this.tween3 && this.tween3.kill(null, this);

      //   this.tween = TweenMax.to(this.group.position, duration, {
      //     y: 5,
      //     ease: Power2.easeOut,
      //     delay,
      //     onComplete: () => {
      //       resolve();
      //       this.group.visible = false;
      //     }
      //   });

      //   this.tween2 = TweenMax.to(this.group.rotation, duration, {
      //     x: Math.PI / 2,
      //     ease: Power2.easeOut,
      //     delay
      //   });

      this.tween3 = TweenMax.to(this.plane.material, duration, {
        opacity: 0,
        ease: Power2.easeOut,
        delay,
        onComplete: () => {
          resolve();
          this.group.visible = false;
        }
      });
    });
  }
}

export default ChapterPlate;
