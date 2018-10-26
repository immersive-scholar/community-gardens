import DidNotEatForADayFilter from "data/filters/DidNotEatForADayFilter";

const DidNotEatForADay = (data, total) => {
  const count = DidNotEatForADayFilter(data).length;
  const pct = Math.round((count / total) * 1000) / 10;

  return {
    id: "didNotEatForADay",
    label: `${pct}% of students do not eat for an entire day during the past month`,
    count
  };
};

export default DidNotEatForADay;
