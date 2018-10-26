import { Box3 } from "three-full";

const getDimensions = mesh => {
  const boundingBox = new Box3().setFromObject(mesh);
  const size = boundingBox.getSize();
  return size;
};
export { getDimensions };
