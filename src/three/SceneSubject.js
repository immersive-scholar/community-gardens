import RandomGardenChapter from "chapters/RandomGardenChapter";

const SceneSubject = ({ scene, camera, R, controls, settings }) => {
  function createScene() {
    const chapter1 = new RandomGardenChapter({ settings }, camera, controls, R);
    chapter1.init();
    scene.add(chapter1.group);
  }

  function update() {}

  return {
    update,
    createScene
  };
};

export default SceneSubject;
