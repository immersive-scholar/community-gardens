// a high resourcesIncoming score is good.
const ResourcesIncoming = d => {
  let resourcesIncoming = 0;

  // how does the user pay for their schooling?
  resourcesIncoming += d.workstudy ? 3 : 0;
  resourcesIncoming += d.otherjob ? 2 : 0;
  resourcesIncoming += d.Pell ? 3 : 0;
  resourcesIncoming += d.grants ? 3 : 0;
  resourcesIncoming += d.scholar ? 3 : 0;
  resourcesIncoming += d.Q5_other && d.Q5_other.indexOf("college") > -1 ? 3 : 0;
  resourcesIncoming += d.loans ? 1 : 0;
  resourcesIncoming += d.fam_friends ? 2 : 0;
  resourcesIncoming += d.savings ? 2 : 0;
  resourcesIncoming += d.credit_card ? 1 : 0;
  resourcesIncoming += d.employer ? 3 : 0;

  // Salary. More than 1k/month is 2 points, otherwise 1 point
  const salary = parseInt(d.Salary, 10);
  switch (true) {
    case salary > 1000:
      resourcesIncoming += 3;
      break;
    case salary > 500:
      resourcesIncoming += 2;
      break;
    case salary:
      resourcesIncoming += 1;
      break;
    default:
      break;
  }

  // depending on how much sleep is obtained,
  const sleep = d.sleep ? parseInt(d.sleep, 10) : 0;
  switch (true) {
    case sleep === 0:
      break;
    case sleep <= 4:
      resourcesIncoming += -4;
      break;
    case sleep === 5:
      resourcesIncoming += -2;
      break;
    case sleep === 6:
      resourcesIncoming += 0;
      break;
    case sleep === 7:
      resourcesIncoming += 2;
      break;
    case sleep === 8:
      resourcesIncoming += 3;
      break;
    case sleep === 9:
      resourcesIncoming += 3;
      break;
    case sleep >= 10:
      resourcesIncoming += 2;
      break;
    default:
      console.log("unknown sleep ", sleep);
      break;
  }

  return resourcesIncoming;
};

export default ResourcesIncoming;
