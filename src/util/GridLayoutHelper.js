const GridLayoutHelper = ({ group, rows, columns, rowWidth, columnHeight }) => {
  let mesh;

  // center the group
  group.position.x = (-rows >> 1) * rowWidth;
  group.position.z = (-columns >> 1) * columnHeight;

  for (let x = 0, i = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      mesh = group.children[i];
      if (!mesh) {
        console.error(
          "GridLayoutHelper expects group to have more children than it does."
        );
        return;
      }
      mesh.position.x = x * rowWidth;
      mesh.position.z = y * columnHeight;
      i++;
    }
  }
};

export default GridLayoutHelper;
