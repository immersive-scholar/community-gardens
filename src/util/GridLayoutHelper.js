import { Vector3 } from "three-full";

const GridLayoutHelper = ({
  group,
  rows,
  columns,
  rowWidth,
  columnHeight,
  layoutAxis = GridLayoutHelper.LAYOUT_FLOOR
}) => {
  let mesh;

  // center the group
  switch (layoutAxis) {
    case GridLayoutHelper.LAYOUT_WALL:
      group.position.x = (-rows / 2) * rowWidth + rowWidth / 2;
      group.position.y = (-columns / 2) * columnHeight + columnHeight / 2;
      break;
    case GridLayoutHelper.LAYOUT_FLOOR:
    default:
      group.position.x = (-rows / 2) * rowWidth + rowWidth / 2;
      group.position.z = (-columns / 2) * columnHeight + columnHeight / 2;
      break;
  }

  for (let x = 0, i = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      mesh = group.children[i];
      if (!mesh) {
        console.error(
          "GridLayoutHelper expects group to have more children than it does."
        );
        return;
      }
      switch (layoutAxis) {
        case GridLayoutHelper.LAYOUT_WALL:
          mesh.position.x = x * rowWidth;
          mesh.position.y = y * columnHeight;
          break;
        case GridLayoutHelper.LAYOUT_FLOOR:
        default:
          mesh.position.x = x * rowWidth;
          mesh.position.z = y * columnHeight;
          break;
      }
      i++;
    }
  }
};

GridLayoutHelper.LAYOUT_FLOOR = new Vector3(1, 0, 1);
GridLayoutHelper.LAYOUT_WALL = new Vector3(1, 1, 0);

export default GridLayoutHelper;
