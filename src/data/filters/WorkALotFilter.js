const WorkALotFilter = data => {
  const filtered = [];
  for (var i in data) {
    // more than 30 hours
    if (parseInt(data[i].workhours, 10) >= 3) {
      filtered.push(data[i]);
    }
  }
  return filtered;
};

export default WorkALotFilter;
