const SleptOutside = data => {
  let count = 0;
  for (var i in data) {
    count += parseInt(data[i]["sleep121"], 10) === 1 ? 1 : 0;
  }

  return {
    id: "sleptOutside",
    label: `Last month, ${count} students slept outside on the street.`,
    count
  };
};

export default SleptOutside;
