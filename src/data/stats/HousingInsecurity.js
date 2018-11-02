import map from "lodash/map";
import HousingInsecurityFilter from "data/filters/HousingInsecurityFilter";
import { HOUSING_INSECURITY } from "constants/Stats";

const HousingInsecurity = data => {
  const rows = HousingInsecurityFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][HOUSING_INSECURITY] = true;
  }

  return {
    id: HOUSING_INSECURITY,
    label: `${count} students experienced housing insecurity.`,
    count,
    ids
  };
};

export default HousingInsecurity;
