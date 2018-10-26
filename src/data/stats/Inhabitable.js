const Inhabitable = data => {
  let count = 0;
  for (var i in data) {
    count += parseInt(data[i]["sleep132"], 10) === 1 ? 1 : 0;
  }

  return {
    id: "inhabitable",
    label: `Last year, ${count} students lived in a place not intended for human habitation.`,
    count
  };
};

export default Inhabitable;
