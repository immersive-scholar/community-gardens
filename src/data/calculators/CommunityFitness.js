// a high communityFitness score is good
const CommunityFitness = d => {
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
};

export default CommunityFitness;
