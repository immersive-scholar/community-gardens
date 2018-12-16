import map from "lodash/map";
import OutOfStateFilter from "data/filters/OutOfStateFilter";
import { OUT_OF_STATE } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const OutOfState = data => {
  const rows = OutOfStateFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][OUT_OF_STATE] = true;
  }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.SUMMER,
    ColorFactory.SKY
  );

  // const color = ColorFactory.getRandomColor(
  //   ColorFactory.WINTER,
  //   ColorFactory.SKY
  // );

  const color = 0xffffff;

  return {
    id: OUT_OF_STATE,
    label: `${count} students are out of state.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [{ size: 0.35, text: "OUT OF STATE", offsetY: 1 }],
  };
};

export default OutOfState;
