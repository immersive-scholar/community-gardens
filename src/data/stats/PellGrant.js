import map from "lodash/map";
import PellGrantFilter from "data/filters/PellGrantFilter";
import { PELL_GRANT } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const PellGrant = data => {
  const rows = PellGrantFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][PELL_GRANT] = true;
  }

  const bgColor = 0xfbd58e;

  const color = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: PELL_GRANT,
    label: `There are ${count} students who received a Pell Grant.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.2 },
      { size: 0.1, text: "Who Earned a", offsetY: 1 },
      { size: 0.3, text: "Pell Grant", offsetY: 0.6 }
    ]
  };
};

export default PellGrant;
