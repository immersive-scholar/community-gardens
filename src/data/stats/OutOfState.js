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
    label: `${count} students have a low health score.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1 },
      { size: 0.25, text: "Who are Out of State", offsetY: 0.6 }
    ]
  };
};

export default OutOfState;
