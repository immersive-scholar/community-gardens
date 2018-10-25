import {
  PlaneBufferGeometry,
  Mesh,
  CanvasTexture,
  MeshBasicMaterial,
  ClampToEdgeWrapping,
  ImprovedNoise,
  Vector3,
  FrontSide,
  Color,
  Group
} from "three-full";
import ColorFactory from "util/ColorFactory";

const Ground = ({ camera, color = ColorFactory.getRandomColor() } = {}) => {
  const group = new Group();
  const worldWidth = 64,
    worldDepth = 64;
  const data = generateHeight(worldWidth, worldDepth);
  //   camera.position.y = data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;
  const geometry = new PlaneBufferGeometry(
    32,
    32,
    worldWidth - 1,
    worldDepth - 1
  );
  geometry.rotateX(-Math.PI / 2);
  const vertices = geometry.attributes.position.array;
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 1] = data[i] * 0.5;
  }
  const texture = new CanvasTexture(
    generateTexture(data, worldWidth, worldDepth, color)
  );
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  const mesh = new Mesh(
    geometry,
    new MeshBasicMaterial({
      map: texture,
      color,
      //   side: FrontSide,
      flatShading: true
    })
  );
  mesh.rotation.y = -Math.PI / 2;
  group.add(mesh);

  const wireframe = new Mesh(
    geometry,
    new MeshBasicMaterial({
      color,
      wireframe: true,
      //   side: FrontSide,
      flatShading: true
    })
  );
  wireframe.rotation.y = -Math.PI / 2;
  wireframe.position.z = -0.001;

  group.add(wireframe);

  function generateHeight(width, height) {
    let size = width * height,
      data = new Uint8Array(size),
      perlin = new ImprovedNoise(),
      quality = 1,
      z = Math.random();
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < size; i++) {
        let x = i % width,
          y = ~~(i / width);
        data[i] += Math.abs(
          perlin.noise(x / quality, y / quality, z) * quality
        );
      }
      quality *= 5;
    }
    return data;
  }
  function generateTexture(data, width, height, hexColor) {
    let color = new Color(hexColor),
      hsl = new Color();
    hsl = color.getHSL(hsl);
    let canvas, canvasScaled, context, image, imageData, vector3, sun, shade;
    vector3 = new Vector3(0, 0, 0);
    sun = new Vector3(0, 1, 0);
    sun.normalize();
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);
    image = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData = image.data;
    for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
      vector3.x = data[j - 2] - data[j + 2];
      vector3.y = 2;
      vector3.z = data[j - width * 2] - data[j + width * 2];
      vector3.normalize();
      shade = vector3.dot(sun);
      color.setHSL(hsl.h, data[j], data[j]);
      //   imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
      //   imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
      //   imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
      //   color.setHSL(hsl.h, 1, 1);
      imageData[i] = color.r * data[j] * 25;
      imageData[i + 1] = color.g * data[j] * 25;
      imageData[i + 2] = color.b * data[j] * 25;
    }
    context.putImageData(image, 0, 0);
    // Scaled 4x
    canvasScaled = document.createElement("canvas");
    canvasScaled.width = width * 4;
    canvasScaled.height = height * 4;
    context = canvasScaled.getContext("2d");
    context.scale(4, 4);
    context.drawImage(canvas, 0, 0);
    image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
    imageData = image.data;
    for (let i = 0, l = imageData.length; i < l; i += 4) {
      let v = ~~(Math.random() * 5);
      imageData[i] += v;
      imageData[i + 1] += v;
      imageData[i + 2] += v;
    }
    context.putImageData(image, 0, 0);
    return canvasScaled;
  }

  return { mesh: group };
};

export default Ground;
