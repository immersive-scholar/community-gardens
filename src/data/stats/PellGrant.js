import PellGrantFilter from "data/filters/PellGrantFilter";

const PellGrant = data => {
  const count = PellGrantFilter(data).length;

  return {
    id: "pellGrant",
    label: `There are ${count} students who received a Pell Grant.`,
    count
  };
};

export default PellGrant;
