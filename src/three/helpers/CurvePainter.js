import {
  Geometry,
  Vector2,
  Color,
  Mesh,
  DoubleSide,
  CanvasTexture,
  TextureLoader,
  RepeatWrapping
} from "three-full";
import { TweenLite, Linear } from "gsap/TweenMax";

import { MeshLine, MeshLineMaterial } from "threejs/helpers/MeshLine";

const CurvePainter = ({
  curve,
  pointCount,
  camera,
  color = 0xff0000,
  lineWidth = 1,
  delay = 0,
  canvasWidth = 1024,
  canvasHeight = 128,
  fogColor = new Color(0xd7cbb1),
  fogDensity = 0.0025,
  imagePath = "/img/stroke.png"
}) => {
  let life = 0;

  // create the geometry
  const points = curve.getPoints(pointCount);
  const geometry = new Geometry();

  for (var i = 0; i < points.length; i++) {
    geometry.vertices.push(points[i].clone());
  }

  // Create the line mesh
  const line = new MeshLine();
  line.setGeometry(geometry, function(p) {
    return p;
  }); // makes width taper

  // var img = new Image();
  // img.src = imagePath;

  // var canvas = document.createElement("canvas");
  // canvas.width = canvasWidth;
  // canvas.height = canvasHeight;
  // var context = canvas.getContext("2d");

  // const strokeTexture = new CanvasTexture(canvas);
  // strokeTexture.wrapS = strokeTexture.wrapT = RepeatWrapping;

  const strokeTexture = new TextureLoader().load(imagePath, texture => {
    const strokeTexture = texture;
    strokeTexture.wrapS = strokeTexture.wrapT = RepeatWrapping;
  });

  // Create the line material
  const resolution = new Vector2(window.innerWidth, window.innerHeight);
  let material = new MeshLineMaterial({
    map: strokeTexture,
    useMap: true,
    color: new Color(color),
    opacity: 1,
    resolution: resolution,
    sizeAttenuation: true,
    lineWidth,
    near: camera.near,
    far: camera.far,
    depthTest: true,
    transparent: true,
    repeat: new Vector2(-1, 1),
    side: DoubleSide,
    fogColor,
    fogDensity,
    revealProgress: life
  });

  const mesh = new Mesh(line.geometry, material);
  mesh.frustumCulled = false;

  const params = {
    life
  };

  TweenLite.to(params, 2, {
    life: 1,
    onUpdate: render,
    ease: Linear.easeNone,
    delay
  });

  function update() {}

  function render() {
    const { life } = params;

    if (material) {
      material.uniforms.revealProgress.value = life;
    }

    // const { life } = params;
    // if (life <= 1) {
    //   context.clearRect(0, 0, canvasWidth, canvasHeight);
    //   context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    //   context.globalCompositeOperation = "source-in";
    //   var grd = context.createLinearGradient(0.01, 0, life * canvasWidth, 0);
    //   grd.addColorStop(life, `rgba(255, 255, 255, ${life})`);
    //   grd.addColorStop(1, "rgba(255, 255, 255, 0)");
    //   context.fillStyle = grd;
    //   context.fillRect(0, 0, life * canvasWidth, canvasHeight);
    //   // reset
    //   context.globalCompositeOperation = "source-over";
    //   strokeTexture.needsUpdate = true;
    // }
    // if (renderFrame < totalFrames) {
    //   geometry.vertices[renderFrame] = points[renderFrame].clone();
    //   // the vertices array has to be the final length of the points array
    //   // so this runs through the points and sets the values of the 'future'
    //   // vertices to the last 'rendered' vertex
    //   for (var i = renderFrame; i < totalFrames; i++) {
    //     geometry.vertices[i] = points[renderFrame].clone();
    //   }
    //   renderFrame++;
    //   line.setGeometry(geometry, function(p) {
    //     return p;
    //   }); // makes width taper
    // }
  }

  return {
    update,
    mesh
  };
};

export default CurvePainter;
