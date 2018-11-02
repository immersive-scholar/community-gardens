import {
  Box3,
  BufferGeometry,
  DoubleSide,
  FontLoader,
  GeometryUtils,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PlaneBufferGeometry,
  TextGeometry,
  Vector3
} from "three-full";
import { TweenMax, Back } from "gsap";

import BaseRenderable from "art/common/BaseRenderable";

class ChapterPlate extends BaseRenderable {
  constructor(props = {}) {
    super(props);

    const {
      color = 0xffffff,
      text = "Text",
      textColor = 0xff9900,
      textArray
    } = props;

    // put off screen
    this.group.position.y = -5;

    const plane = this.createPlane(color);
    this.group.add(plane);

    this.textGroup = new Group();
    this.group.add(this.textGroup);

    this.linesOfText = [];
    for (let i = 0, iL = textArray.length, t; i < iL; i++) {
      t = textArray[i];
      this.linesOfText.push(
        this.createPlate({
          text: t.text,
          color: textColor,
          offsetY: t.offsetY || -i * 0.3,
          size: t.size || 0.2
        })
      );
    }

    // const grid = this.createGrid();
    // grid.position.y = 0.001;
    // this.group.add(grid);
  }

  createPlane(color) {
    var planeGeometry = new PlaneBufferGeometry(4, 2);
    var planeMaterial = new MeshPhongMaterial({
      color,
      wireframe: !true,
      fog: true,
      side: DoubleSide,
      receiveShadow: true
    });
    var plane = new Mesh(planeGeometry, planeMaterial);
    // plane.rotation.x = -Math.PI / 2;
    plane.position.y = 1;
    plane.receiveShadow = true;
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
          flatShading: true
        });
        this.mesh = new Mesh(bufferGeometry, material);
        this.mesh.position.x = -centerOffset;
        this.mesh.position.y = offsetY;
        this.mesh.rotation.y = Math.PI;
        this.mesh.position.z = -0.01;
        this.mesh.castShadow = true;

        this.textGroup.add(this.mesh);

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

    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      this.group.remove(this.mesh);
      this.mesh = undefined;
    }

    for (let i = 0, iL = this.linesOfText.length, line; i < iL; i++) {
      line = this.linesOfText[i];
      i.geometry.dispose();
      i.material.dispose();
      this.group.remove(i);
      i = undefined;
    }

    this.linesOfText = [];
  }

  render() {}

  update() {
    this.render();
    super.update();
  }

  animateIn({ duration = 2, delay = 0 } = {}) {
    this.tween && this.tween.kill(null, this);

    this.tween = TweenMax.to(this.group.position, duration, {
      y: 0,
      ease: Back.easeOut,
      delay
    });
  }
  animateOut({ duration = 2, delay = 0 } = {}) {
    this.tween && this.tween.kill(null, this);

    this.tween = TweenMax.to(this.group.position, duration, {
      y: -5,
      ease: Back.easeIn,
      delay
    });
  }
}

export default ChapterPlate;
