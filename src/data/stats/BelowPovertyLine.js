import map from "lodash/map";
import EarningsFilter from "data/filters/EarningsFilter";
import { BELOW_POVERTY_LINE } from "constants/Stats";

const BelowPovertyLine = (data, total) => {
  const povertyLine = 12140;
  const earningsCap = povertyLine / 12; // poverty * 175% / 12 months
  const rows = EarningsFilter(data, earningsCap, "<");
  const count = rows.length;
  const ids = map(rows, row => row.ID);
  const pct = Math.round((count / total) * 1000) / 10;

  for (let i = 0; i < count; i++) {
    rows[i][BELOW_POVERTY_LINE] = true;
  }

  return {
    id: BELOW_POVERTY_LINE,
    label: `${pct}% of students earn <$${earningsCap}/month and are below the poverty line.`,
    count,
    ids
  };
};

export default BelowPovertyLine;
