class InsecurityCalculator {
  static async parse(data) {
    return new Promise(resolve => {
      for (var i in data) {
        data[i].resourcesIncoming = this.calculateResourcesIncoming(data[i]);
        data[i].energyOutgoing = this.calculateEnergyOutgoing(data[i]);
        data[i].communityFitness = this.calculateCommunityFitness(data[i]);
        data[i].personalScarcity = this.calculatePersonalScarcity(data[i]);
        data[i].health = this.calculateHealth(data[i]);
        console.log(data[i].resourcesIncoming);
      }
      resolve(data);
    });
  }

  static calculateResourcesIncoming(d) {
    let resourcesIncoming = 0;

    // how does the user pay for their schooling?
    resourcesIncoming += d.workstudy ? 3 : 0;
    resourcesIncoming += d.otherjob ? 2 : 0;
    resourcesIncoming += d.Pell ? 3 : 0;
    resourcesIncoming += d.grants ? 3 : 0;
    resourcesIncoming += d.scholar ? 3 : 0;
    resourcesIncoming +=
      d.Q5_other && d.Q5_other.indexOf("college") > -1 ? 3 : 0;
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

    const sleep = d.sleep ? parseInt(d.sleep, 10) : 0;
    switch (true) {
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
      case sleep === 0:
        break;
      default:
        console.log("unknown sleep ", sleep);
        break;
    }

    if (resourcesIncoming < 0) {
      console.log(d);
    }

    return resourcesIncoming;
  }
  static calculateEnergyOutgoing(d) {
    const energyOutgoing = 1;
    return energyOutgoing;
  }
  static calculateCommunityFitness(d) {
    const communityFitness = 1;
    return communityFitness;
  }
  static calculatePersonalScarcity(d) {
    const personalScarcity = 1;
    return personalScarcity;
  }
  static calculateHealth(d) {
    const health =
      d.resourcesIncoming -
      d.energyOutgoing +
      d.communityFitness -
      d.personalScarcity;
    return health;
  }
}

export default InsecurityCalculator;
