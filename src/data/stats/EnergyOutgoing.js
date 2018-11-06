import map from "lodash/map";
import EnergyOutgoingFilter from "data/filters/EnergyOutgoingFilter";
import { ENERGY_OUTGOING } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const EnergyOutgoing = data => {
  const rows = EnergyOutgoingFilter(data);
  const count = rows.length;
  const ids = map(rows, r => r.ID);

  //   for (let i = 0; i < count; i++) {
  //     rows[i][ENERGY_OUTGOING] = true;
  //   }

  const bgColor = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: ENERGY_OUTGOING,
    label: `${count} students have high energy outgoing.`,
    count,
    ids,
    bgColor,
    color: 0xffffff,
    textArray: [
      { size: 0.1, text: "GARDEN OF STUDENTS", offsetY: 1.4 },
      { size: 0.25, text: "Who need", offsetY: 1 },
      { size: 0.25, text: "More Sleep", offsetY: 0.6 }
    ]
  };
};

export default EnergyOutgoing;
