import {
  Vector3,
  Geometry,
  ExtrudeGeometry,
  Shape,
  CatmullRomCurve3,
  _Math
} from "three-full";
import BaseRenderable from "art/common/BaseRenderable";
import Animation from "./Animation";

const Delaunay = require("util/Delaunay");

class Crystals extends BaseRenderable {
  constructor(props, R) {
    super(props);

    this.R = R;
    this.currentTime = 0;

    this.init(props);
  }

  init = (props = {}) => {
    this.setState(props);

    this.clean();

    const {
      pointCount = 100,
      extrudeAmount = 1,
      splineStepsX = 1,
      splineStepsY = 1
    } = this.state;

    var vertices = [],
      indices,
      i,
      j;

    // 1. generate random points in grid formation with some noise
    var PHI = Math.PI * (3 - Math.sqrt(5));
    var n = pointCount;
    var radius = 10;
    // var noise = 0.04;

    for (let i = 0, t, r, x, y; i <= n; i++) {
      t = i * PHI;
      r = Math.sqrt(i) / Math.sqrt(n);
      //   x = r * Math.cos(t) * (radius - _Math.randFloat(0, noise));
      //   y = r * Math.sin(t) * (radius - _Math.randFloatSpread(0, noise));
      x = r * Math.cos(t) * radius;
      y = r * Math.sin(t) * radius;

      vertices.push([x, y]);
    }

    // 2. generate indices
    indices = Delaunay.triangulate(vertices);

    // 3. create displacement splines
    var pointsX = [];
    var pointsY = [];
    var segmentsX = splineStepsX;
    var segmentsY = splineStepsY;

    for (i = 0; i <= segmentsX; i++) {
      pointsX.push(
        new Vector3(
          _Math.mapLinear(i, 0, segmentsX, -radius, radius),
          0,
          i === 0 || i === segmentsX ? 0 : -_Math.randFloat(8, 9)
        )
      );
    }
    for (i = 0; i <= segmentsY; i++) {
      pointsY.push(
        new Vector3(
          0,
          _Math.mapLinear(i, 0, segmentsY, -radius, radius),
          i === 0 || i === segmentsY ? 0 : -_Math.randFloat(8, 9)
        )
      );
    }

    var splineX = new CatmullRomCurve3(pointsX);
    var splineY = new CatmullRomCurve3(pointsY);

    // 4. generate geometry (maybe find a cheaper way to do this)
    var geometry = new Geometry();
    var shapeScale = 0.95;

    for (i = 0; i < indices.length; i += 3) {
      // build the face
      var v0 = vertices[indices[i]];
      var v1 = vertices[indices[i + 1]];
      var v2 = vertices[indices[i + 2]];

      // calculate centroid
      var cx = (v0[0] + v1[0] + v2[0]) / 3;
      var cy = (v0[1] + v1[1] + v2[1]) / 3;

      // translate, scale, un-translate
      v0 = [(v0[0] - cx) * shapeScale + cx, (v0[1] - cy) * shapeScale + cy];
      v1 = [(v1[0] - cx) * shapeScale + cx, (v1[1] - cy) * shapeScale + cy];
      v2 = [(v2[0] - cx) * shapeScale + cx, (v2[1] - cy) * shapeScale + cy];

      // draw the face to a shape
      var shape = new Shape();
      shape.moveTo(v0[0], v0[1]);
      shape.lineTo(v1[0], v1[1]);
      shape.lineTo(v2[0], v2[1]);

      // use the shape to create a geometry
      var shapeGeometry = new ExtrudeGeometry(shape, {
        depth: extrudeAmount,
        bevelEnabled: false
      });

      // offset z vector components based on the two splines
      for (j = 0; j < shapeGeometry.vertices.length; j++) {
        var v = shapeGeometry.vertices[j];
        var ux = _Math.clamp(
          _Math.mapLinear(v.x, -radius, radius, 0.0, 1.0),
          0.0,
          1.0
        );
        var uy = _Math.clamp(
          _Math.mapLinear(v.y, -radius, radius, 0.0, 1.0),
          0.0,
          1.0
        );

        v.z += splineX.getPointAt(ux).z;
        v.z += splineY.getPointAt(uy).z;
      }

      // merge into the whole
      geometry.merge(shapeGeometry);
    }

    geometry.center();

    // 5. feed the geometry to the animation
    this.animation = new Animation(geometry);
    this.group.add(this.animation);

    // 6. interactivity
    // window.addEventListener("mousemove", e => {
    //   // if (paused) return;

    //   var px = e.clientX / window.innerWidth;
    //   var py = e.clientY / window.innerHeight;
    //   this.animation.material.uniforms["uD"].value = 2.0 + px * 16;
    //   this.animation.material.uniforms["uA"].value = py * 4.0;

    //   this.animation.material.uniforms["roughness"].value = px;
    //   //   this.animation.material.uniforms["metalness"].value = py;
    // });

    this.update();
  };

  clean() {}

  render() {
    this.animation.material.uniforms["uTime"].value = this.currentTime;
  }

  update() {
    this.currentTime += 0.01;
    this.render();

    requestAnimationFrame(() => {
      this.update();
    });
  }
}

export default Crystals;
