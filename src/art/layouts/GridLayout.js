import { LAYOUT_FLOOR, LAYOUT_WALL } from "art/layouts/LayoutConstants";
import { Vector3 } from "three-full";

const GridLayoutHelper = ({
  group,
  rows,
  columns,
  rowWidth,
  columnHeight,
  layoutAxis = LAYOUT_FLOOR,
  position = new Vector3()
}) => {
  let mesh;

  rows = rows || Math.floor(Math.sqrt(group.children.length));
  columns = columns || Math.floor(Math.sqrt(group.children.length));
  console.log("rows ", rows, columns, group.children.length);

  // center the group
  switch (layoutAxis) {
    case LAYOUT_WALL:
      group.position.x = position.x + (-rows / 2) * rowWidth + rowWidth / 2;
      group.position.y =
        position.y + (-columns / 2) * columnHeight + columnHeight / 2;
      break;
    case LAYOUT_FLOOR:
    default:
      group.position.x = position.x + (-rows / 2) * rowWidth + rowWidth / 2;
      group.position.z =
        position.z + (-columns / 2) * columnHeight + columnHeight / 2;
      break;
  }

  for (let x = 0, i = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      console.log("i ", i, x, y);
      mesh = group.children[i];
      if (!mesh) {
        console.error(
          "GridLayoutHelper expects group to have more children than it does."
        );
        return;
      }
      switch (layoutAxis) {
        case LAYOUT_WALL:
          mesh.position.x = x * rowWidth;
          mesh.position.y = y * columnHeight;
          break;
        case LAYOUT_FLOOR:
        default:
          mesh.position.x = x * rowWidth;
          mesh.position.z = y * columnHeight;
          break;
      }
      i++;
    }
  }
};

export default GridLayoutHelper;
