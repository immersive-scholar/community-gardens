import map from "lodash/map";

import { COMMUNITY_GARDEN } from "constants/Stats";
import ColorFactory from "util/ColorFactory";

const CommunityGarden = (data, count) => {
  for (var i in data) {
    data[i][COMMUNITY_GARDEN] = true;
  }

  const ids = map(data, row => row.ID);

  //   const bgColor = ColorFactory.getRandomColor(
  //     ColorFactory.SUMMER,
  //     ColorFactory.LEAF
  //   );

  const bgColor = 0xed7e28;

  const color = ColorFactory.getRandomColor(
    ColorFactory.WINTER,
    ColorFactory.SKY
  );

  return {
    id: COMMUNITY_GARDEN,
    label: `Community Gardens is a data-driven generative art installation for NCSU.`,
    count,
    ids,
    bgColor,
    color,
    textArray: [
      { size: 0.5, text: "COMMUNITY", offsetY: 1.2 },
      { size: 0.55, text: "GARDENS", offsetY: 0.6 }
    ]
  };
};

export default CommunityGarden;
