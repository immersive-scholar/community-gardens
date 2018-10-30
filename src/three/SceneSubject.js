import RandomGardenChapter from "chapters/RandomGardenChapter";

const SceneSubject = ({ scene, camera, R, controls, settings }) => {
  function createScene() {
    const chapter1 = new RandomGardenChapter(
      { settings, focusTotal: 1 },
      camera,
      controls,
      R
    );
    scene.add(chapter1.group);
    chapter1.init();
    chapter1.animateIn().then(() => console.log("Chapter 1 done"));
  }

  function update() {}

  return {
    update,
    createScene
  };
};

export default SceneSubject;
