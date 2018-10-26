import AreHungryFilter from "data/filters/AreHungryFilter";

const ExperienceHunger = (data, total) => {
  const areHungry = AreHungryFilter(data);
  const count = areHungry.length;
  const pct = Math.round((count / total) * 1000) / 10;

  return {
    id: "experienceHunger",
    label: `${pct}% of NCSU students frequently experience hunger.`,
    count
  };
};

export default ExperienceHunger;
