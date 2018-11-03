import {
  BufferGeometry,
  FontLoader,
  GeometryUtils,
  Mesh,
  MeshBasicMaterial,
  TextGeometry
} from "three-full";
import { TweenMax, Power2 } from "gsap";

import BaseRenderable from "art/common/BaseRenderable";

class ChapterTitle extends BaseRenderable {
  constructor(props = {}) {
    super(props);

    const { color = 0xff9900, text = "Text", textArray } = props;

    this.text = text;
    this.color = color;
    this.textArray = textArray;

    // start location
    this.group.position.y = 0;
    this.group.position.z = 1;
    this.group.visible = true;

    this.time = 0;
  }

  createChildren() {
    return new Promise((resolve, reject) => {
      // We need to resolve the animateIn once a bunch of animations have run
      // so we're storing these for later retrieval.
      this.resolve = resolve;
      this.reject = reject;

      const { textArray, color } = this;

      this.linesOfText = [];
      for (let i = 0, iL = textArray.length, t; i < iL; i++) {
        t = textArray[i];
        this.createPlate({
          text: t.text,
          color,
          offsetY: t.offsetY || -i * 0.3,
          size: t.size || 0.2
        });
      }
    });
  }

  createPlate({
    text = "Community Gardens",
    color = 0xff9900,
    size = 0.2,
    offsetY = 0
  }) {
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
          if (face.materialIndex === 1) {
            for (var j = 0; j < face.vertexNormals.length; j++) {
              face.vertexNormals[j].z = 0;
              face.vertexNormals[j].normalize();
            }
            var va = geometry.vertices[face.a];
            var vb = geometry.vertices[face.b];
            var vc = geometry.vertices[face.c];
            var s = GeometryUtils.triangleArea(va, vb, vc);
            if (s > triangleAreaHeuristics) {
              for (j = 0; j < face.vertexNormals.length; j++) {
                face.vertexNormals[j].copy(face.normal);
              }
            }
          }
        }

        var centerOffset =
          -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

        const bufferGeometry = new BufferGeometry().fromGeometry(geometry);

        const material = new MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.25
        });
        let mesh = new Mesh(bufferGeometry, material);
        mesh.position.x = -centerOffset;
        mesh.position.y = offsetY;
        mesh.rotation.y = Math.PI;
        mesh.position.z = -0.01;

        this.group.add(mesh);

        this.linesOfText.push(mesh);

        if (this.group.children.length === this.textArray.length) {
          this.resolve();
        }
      }
    );
  }

  clean() {
    this.tween && this.tween.kill(null, this);

    for (let i = 0, iL = this.linesOfText.length, line; i < iL; i++) {
      line = this.linesOfText[i];
      if (line) {
        line.geometry.dispose();
        line.material.dispose();
        this.group.remove(line);
        line = undefined;
      }
    }
    this.linesOfText = [];
  }

  render() {}

  update() {
    this.render();
    super.update();
  }

  animateIn({ duration = 2, delay = 0, animated = true } = {}) {
    // this.tween && this.tween.kill(null, this);

    this.group.visible = true;

    return new Promise((resolve, reject) => {
      if (animated) {
        this.tween = TweenMax.to(this, duration, {
          time: 1,
          ease: Power2.easeOut,
          delay,
          onUpdate: () => this.onUpdate(),
          onComplete: () => {
            resolve();
          }
        });
      } else {
        this.time = 1;

        this.timeoutID && clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => resolve(), 1000);
      }
    });
  }

  animateOut({ duration = 5, delay = 0 } = {}) {
    return new Promise((resolve, reject) => {
      // this.tween && this.tween.kill(null, this);

      this.tween = TweenMax.to(this, duration, {
        time: 0,
        ease: Power2.easeOut,
        delay,
        onUpdate: () => this.onUpdate(),
        onComplete: () => {
          resolve();
          this.group.visible = false;
        }
      });
    });
  }

  onUpdate() {
    // this.group.position.z = 0.25 - this.time;
    for (let i = 0, iL = this.linesOfText.length, line; i < iL; i++) {
      line = this.linesOfText[i];
      line.material.opacity = this.time;
      line.material.needsUpdate = true;
    }
  }
}

export default ChapterTitle;
