export default (document, container) => {
  const canvas = document.createElement("canvas");
  canvas.id = "three-canvas";
  container.appendChild(canvas);

  function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100vh";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // sceneManager.onWindowResize();
  }

  function getDimensions() {
    return {
      width: canvas.width,
      height: canvas.height
    };
  }

  return { canvas, resizeCanvas, getDimensions };
};
