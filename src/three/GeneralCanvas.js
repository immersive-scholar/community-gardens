export default (document, container) => {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100vh";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // sceneManager.onWindowResize();
    // postprocessing.composer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  }

  function getDimensions() {
    return {
      width: canvas.width,
      height: canvas.height
    };
  }

  return { canvas, resizeCanvas, getDimensions };
};
