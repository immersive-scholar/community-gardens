import map from "lodash/map";
import PellGrantFilter from "data/filters/PellGrantFilter";
import { PELL_GRANT } from "constants/Stats";

const PellGrant = data => {
  const rows = PellGrantFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  for (let i = 0; i < count; i++) {
    rows[i][PELL_GRANT] = true;
  }

  return {
    id: PELL_GRANT,
    label: `There are ${count} students who received a Pell Grant.`,
    count,
    ids
  };
};

export default PellGrant;
