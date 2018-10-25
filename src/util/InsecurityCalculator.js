class InsecurityCalculator {
  static async parse(data) {
    return new Promise(resolve => {
      let max = 0,
        min = 0,
        minData,
        maxData;
      for (var i in data) {
        data[i].resourcesIncoming = this.calculateResourcesIncoming(data[i]);
        data[i].energyOutgoing = this.calculateEnergyOutgoing(data[i]);
        data[i].communityFitness = this.calculateCommunityFitness(data[i]);
        data[i].personalScarcity = this.calculatePersonalScarcity(data[i]);
        data[i].health = this.calculateHealth(data[i]);

        if (data[i].health < min) {
          minData = data[i];
          min = data[i].health;
        }

        if (data[i].health > max) {
          maxData = data[i];
          max = data[i].health;
        }
      }
      console.log("min ", min, minData);
      console.log("max ", max, maxData);
      resolve(data);
    });
  }

  // a high resourcesIncoming score is good.
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
  }

  // a high energyOutgoing score is bad
  static calculateEnergyOutgoing(d) {
    let energyOutgoing = 0;

    // if the user is searching for a job, it consumes energy
    const jobSearch = parseInt(d.Job_search, 10);
    if (jobSearch === 1) {
      energyOutgoing += 2;
    }

    // if the student is fulltime, then working more takes more energy
    let workhours = parseInt(d.workhours, 10);
    let workCost = 0;
    switch (true) {
      case workhours > 30:
        workCost += 4;
        break;
      case workhours > 20:
        workCost += 3;
        break;
      case workhours > 10:
        workCost += 2;
        break;
      case workhours > 0:
        workCost += 1;
        break;
      default:
        break;
    }

    // If the individual works full-time, their workhours ‘cost’ twice as much energy as if they are part-time
    const fullTime = parseInt(d.FT_PT, 10) === 1;
    energyOutgoing += fullTime ? workCost * 2 : workCost;

    // some degrees take more energy to pursue than others
    const degree = parseInt(d.Degree, 10);
    switch (true) {
      // Associates
      case degree === 1:
        break;
      // Bachelors
      case degree === 2:
        energyOutgoing += 2;
        break;
      // Masters, Doctoral
      case degree === 3:
        energyOutgoing += 4;
        break;
      default:
        break;
    }

    // any temporary housing, by Month or Year
    const sleptInShelterM = parseInt(d.sleep51, 10) === 1;
    const sleptInShelterY = parseInt(d.sleep52, 10) === 1;
    energyOutgoing += sleptInShelterM * 3 + sleptInShelterY;

    const couchSurfM = parseInt(d.sleep71, 10) === 1;
    const couchSurfY = parseInt(d.sleep72, 10) === 1;
    energyOutgoing += couchSurfM * 3 + couchSurfY;

    const tempHotelM = parseInt(d.sleep81, 10) === 1;
    const tempHotelY = parseInt(d.sleep82, 10) === 1;
    energyOutgoing += tempHotelM * 3 + tempHotelY;

    // if you are sleeping outside you spend a lot of energy
    // just by being alert
    const outdoorsM = parseInt(d.sleep121, 10) === 1;
    const outdoorsY = parseInt(d.sleep122, 10) === 1;
    energyOutgoing += (outdoorsM * 4 + outdoorsY) * 2;

    // if you are sleeping in an inhabitable space you spend a lot of energy
    // hoping you don't die
    const inhabitableSpaceM = parseInt(d.sleep131, 10) === 1;
    const inhabitableSpaceY = parseInt(d.sleep132, 10) === 1;
    energyOutgoing += (inhabitableSpaceM * 4 + inhabitableSpaceY) * 2;

    // if you have children
    const hasChildren = parseInt(d.Children, 10) === 1;
    energyOutgoing += hasChildren ? 4 : 0;

    // if you are a FirstGen, you have to learn everything on your own
    const isFirstGen = d.FirstGen === "Y";
    energyOutgoing = isFirstGen ? 2 : 0;

    return energyOutgoing;
  }

  // a high communityFitness score is good
  static calculateCommunityFitness(d) {
    let communityFitness = 0;

    let servicesUsed = 0;
    servicesUsed += parseInt(d.SNAP, 10) ? 1 : 0;
    servicesUsed += parseInt(d.WIC, 10) ? 1 : 0;
    servicesUsed += parseInt(d.TANF, 10) ? 1 : 0;
    servicesUsed += parseInt(d.SSI, 10) ? 1 : 0;
    servicesUsed += parseInt(d.SSDI, 10) ? 1 : 0;
    servicesUsed += parseInt(d.Medicaid, 10) ? 1 : 0;
    servicesUsed += parseInt(d.foodBank, 10) ? 1 : 0;
    servicesUsed += parseInt(d.subsidy, 10) ? 1 : 0;
    servicesUsed += parseInt(d.unemploymt, 10) ? 1 : 0;
    servicesUsed += parseInt(d.utility, 10) ? 1 : 0;
    servicesUsed += parseInt(d.Section8, 10) ? 1 : 0;
    servicesUsed += parseInt(d.transport, 10) ? 1 : 0;
    servicesUsed += parseInt(d.taxRefund, 10) ? 1 : 0;
    servicesUsed += parseInt(d.EITC, 10) ? 1 : 0;
    servicesUsed += parseInt(d.VetBen, 10) ? 1 : 0;
    communityFitness += servicesUsed;

    // mealplans are good...
    let mealPlan = 0;
    mealPlan += parseInt(d.MealPlan, 10) ? 2 : 0;
    // ...unless they are too expensive...
    mealPlan += parseInt(d.mealplan_4, 10) ? -2 : 0;
    // ...or they make you ineligible for SNAP benefits
    mealPlan += parseInt(d.mealplan_5, 10) ? -2 : 0;
    // if your meal plan is not sufficient
    mealPlan += parseInt(d.mealplan_suf, 10) === 2 ? -1 : 0;
    communityFitness += mealPlan;

    // if someone knows about the pantry, it is a good thing
    let pantry = 0;
    pantry += parseInt(d.pantry, 10) ? 1 : 0;
    communityFitness += pantry;

    let feelsSafe = parseInt(d.FeelSafe, 10);
    switch (true) {
      case feelsSafe === 1:
        communityFitness -= 5;
        break;
      case feelsSafe === 2:
        communityFitness -= 2;
        break;
      case feelsSafe === 3:
        // no change
        break;
      case feelsSafe === 4:
        communityFitness += 1;
        break;
      case feelsSafe === 5:
        communityFitness += 2;
        break;
      default:
        break;
    }

    return communityFitness;
  }

  // a high personalScarcity score is bad
  static calculatePersonalScarcity(d) {
    let personalScarcity = 0;

    personalScarcity += parseInt(d.seekfreefood, 10) ? 1 : 0;
    personalScarcity += parseInt(d.gohungry, 10) ? 2 : 0;
    personalScarcity += parseInt(d.underpay, 10) ? 1 : 0;
    personalScarcity += parseInt(d.evicted, 10) ? 4 : 0;
    personalScarcity += parseInt(d.summons, 10) ? 2 : 0;
    personalScarcity += parseInt(d.gasbill, 10) ? 1 : 0;
    personalScarcity += parseInt(d.borrow, 10) ? 1 : 0;
    personalScarcity += parseInt(d.default, 10) ? 1 : 0;
    personalScarcity += parseInt(d.notknowsleeping, 10) ? 2 : 0;
    personalScarcity += parseInt(d.unsafe, 10) ? 3 : 0;
    personalScarcity += parseInt(d.thrownout, 10) ? 1 : 0;

    // giving
    personalScarcity += parseInt(d.givemoney, 10) ? -1 : 0;
    personalScarcity += parseInt(d.letstay, 10) ? -1 : 0;
    personalScarcity += parseInt(d.givefood, 10) ? -1 : 0;

    // if the user shares meals frequently, it is a sign of
    // a healthy community
    personalScarcity += parseInt(d.sharemeals, 10) === 1 ? 1 : 0;

    // "We worried whether our food would run out before we got money to buy more."
    const worry = parseInt(d.Q36_1, 10);
    switch (true) {
      // 1 is often
      case worry === 1:
        personalScarcity += 2;
        break;
      // 2 is sometimes
      case worry === 2:
        personalScarcity += 1;
        break;
      default:
        break;
    }

    // We worried whether our food would run out before we got money to buy more.
    const last = parseInt(d.Q36_1, 10);
    switch (true) {
      // 1 is often
      case last === 1:
        personalScarcity += 4;
        break;
      // 2 is sometimes
      case last === 2:
        personalScarcity += 2;
        break;
      default:
        break;
    }

    // The food that we bought just didn’t last, and we didn’t have money to get more.
    const foodDidntLast = parseInt(d.Q36_2, 10);
    switch (true) {
      // 1 is often
      case foodDidntLast === 1:
        personalScarcity += 4;
        break;
      // 2 is sometimes
      case foodDidntLast === 2:
        personalScarcity += 2;
        break;
      default:
        break;
    }

    // We couldn’t eat balanced meals because we couldn’t afford it.
    const affordBalancedMeals = parseInt(d.Q36_3, 10);
    switch (true) {
      // 1 is often
      case affordBalancedMeals === 1:
        personalScarcity += 3;
        break;
      // 2 is sometimes
      case affordBalancedMeals === 2:
        personalScarcity += 1;
        break;
      default:
        break;
    }

    // "In the last 30 days, did you or other adults in your household ever cut the size of your meals or skip meals because there wasn’t enough money for food?"
    const cutMealSize = parseInt(d.Q37_1, 10);
    switch (true) {
      // 1 is often
      case cutMealSize === 1:
        personalScarcity += 2;
        break;
      // 2 is sometimes
      case cutMealSize === 2:
        personalScarcity += 1;
        break;
      default:
        break;
    }

    // "In the last 30 days, did you or other adults in your household ever eat less than you felt you should because there wasn’t enough money for food?"
    const eatLess = parseInt(d.Q37_3, 10);
    switch (true) {
      // 1 is often
      case eatLess === 1:
        personalScarcity += 2;
        break;
      // 2 is sometimes
      case eatLess === 2:
        personalScarcity += 1;
        break;
      default:
        break;
    }

    // "In the last 30 days, were you or other adults in your household ever hungry but didn’t eat because there wasn’t enough money for food?"
    const hungry = parseInt(d.Q37_4, 10);
    switch (true) {
      // 1 is often
      case hungry === 1:
        personalScarcity += 2;
        break;
      // 2 is sometimes
      case hungry === 2:
        personalScarcity += 1;
        break;
      default:
        break;
    }

    // "In the last 30 days, did you or other adults in your household lose weight because there wasn’t enough money for food?"
    const loseWeight = parseInt(d.Q37_5, 10);
    switch (true) {
      // 1 is often
      case loseWeight === 1:
        personalScarcity += 4;
        break;
      // 2 is sometimes
      case loseWeight === 2:
        personalScarcity += 2;
        break;
      default:
        break;
    }

    // "In the last 30 days, did you or other adults in your household ever not eat for a whole day because there wasn't enough money for food?"
    const notEatForADay = parseInt(d.Q37_6, 10);
    switch (true) {
      // 1 is often
      case notEatForADay === 1:
        personalScarcity += 6;
        break;
      // 2 is sometimes
      case notEatForADay === 2:
        personalScarcity += 4;
        break;
      default:
        break;
    }

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
