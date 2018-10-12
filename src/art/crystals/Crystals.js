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

const Delaunay = require("./Delaunay");

class Crystals extends BaseRenderable {
  constructor(props, R) {
    super(props);

    this.R = R;

    this.init(props);
  }

  init = (props = {}) => {
    this.setState(props);

    this.clean();

    const {
      pointCount = 1000,
      extrudeAmount = 2.0,
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
    var radius = 100;
    var noise = 4.0;

    for (i = 0; i <= n; i++) {
      var t = i * PHI;
      var r = Math.sqrt(i) / Math.sqrt(n);
      var x = r * Math.cos(t) * (radius - _Math.randFloat(0, noise));
      var y = r * Math.sin(t) * (radius - _Math.randFloatSpread(0, noise));

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
          i === 0 || i === segmentsX ? 0 : -_Math.randFloat(64, 72)
        )
      );
    }
    for (i = 0; i <= segmentsY; i++) {
      pointsY.push(
        new Vector3(
          0,
          _Math.mapLinear(i, 0, segmentsY, -radius, radius),
          i === 0 || i === segmentsY ? 0 : -_Math.randFloat(64, 72)
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
    var animation = new Animation(geometry);
    this.group.add(animation);

    // 6. interactivity
    window.addEventListener("mousemove", function(e) {
      // if (paused) return;

      var px = e.clientX / window.innerWidth;
      var py = e.clientY / window.innerHeight;

      animation.material.uniforms["uD"].value = 2.0 + px * 16;
      animation.material.uniforms["uA"].value = py * 4.0;

      animation.material.uniforms["roughness"].value = px;
      animation.material.uniforms["metalness"].value = py;
    });
  };

  clean() {}

  render() {}

  update() {
    // this.leavesMesh.material.uniforms.time.value = this.currentTime;
  }
}

export default Crystals;
