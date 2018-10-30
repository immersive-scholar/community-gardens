import { LAYOUT_FLOOR, LAYOUT_WALL } from "art/layouts/LayoutConstants";
import { Vector3 } from "three-full";

const GridLayoutHelper = ({
  group,
  instances,
  rows,
  columns,
  layoutType = LAYOUT_FLOOR,
  bounds = new Vector3(1, 1, 1),
  position = new Vector3()
}) => {
  let mesh;

  rows = rows || Math.floor(Math.sqrt(instances.length));
  columns = columns || Math.floor(Math.sqrt(instances.length));

  let rowWidth, columnHeight;

  switch (layoutType) {
    case LAYOUT_WALL:
      rowWidth = bounds.x / rows;
      columnHeight = bounds.y / columns;
      break;
    case LAYOUT_FLOOR:
    default:
      rowWidth = bounds.x / rows;
      columnHeight = bounds.z / columns;
      break;
  }

  group.position.copy(position);

  for (let x = 0, i = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      mesh = instances[i];
      if (!mesh) {
        console.error(
          "GridLayoutHelper expects group to have more children than it does."
        );
        return;
      }
      switch (layoutType) {
        case LAYOUT_WALL:
          mesh.group.position.x = x * rowWidth;
          mesh.group.position.y = y * columnHeight;
          break;
        case LAYOUT_FLOOR:
        default:
          mesh.group.position.x = x * rowWidth;
          mesh.group.position.z = y * columnHeight;
          break;
      }
      i++;
    }
  }
};

export default GridLayoutHelper;
