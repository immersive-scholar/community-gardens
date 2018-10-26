import map from "lodash/map";
import PellGrantFilter from "data/filters/PellGrantFilter";

const PellGrant = data => {
  const rows = PellGrantFilter(data);
  const count = rows.length;
  const ids = map(rows, row => row.ID);

  return {
    id: "pellGrant",
    label: `There are ${count} students who received a Pell Grant.`,
    count,
    ids
  };
};

export default PellGrant;
