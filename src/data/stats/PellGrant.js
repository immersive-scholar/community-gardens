const PellGrant = data => {
  let count = 0;
  for (var i in data) {
    count += parseInt(data[i]["Pell"], 10) === 1 ? 1 : 0;
  }

  return {
    id: "pellGrant",
    label: `There are ${count} students who received a Pell Grant.`,
    count
  };
};

export default PellGrant;
