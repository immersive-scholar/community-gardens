export default (document, container, sidebarWidth = 0) => {
  const canvas = document.createElement("canvas");
  canvas.id = "three-canvas";
  container.appendChild(canvas);

  function resizeCanvas() {
    canvas.style.width = `calc(100% - ${sidebarWidth}px)`;
    canvas.style.height = "100vh";

    canvas.width = canvas.offsetWidth - sidebarWidth;
    canvas.height = canvas.offsetHeight;

    // sceneManager.onWindowResize();
  }

  function getDimensions() {
    return {
      width: canvas.width - sidebarWidth,
      height: canvas.height
    };
  }

  return { canvas, resizeCanvas, getDimensions };
};
