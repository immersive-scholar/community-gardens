const ResourcesFilter = (data, threshold = 1) => {
  const filtered = [];
  for (var i in data) {
    if (data[i].resourcesIncoming >= threshold) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

export default ResourcesFilter;
