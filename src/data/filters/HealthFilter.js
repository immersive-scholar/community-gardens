const HealthFilter = (data, threshold, gtlt = ">") => {
  const filtered = [];
  for (var i in data) {
    if (gtlt === ">") {
      if (data[i].health >= threshold) {
        filtered.push(data[i]);
      }
    } else if (gtlt === "<") {
      if (data[i].health <= threshold) {
        filtered.push(data[i]);
      }
    }
  }

  return filtered;
};

export default HealthFilter;
