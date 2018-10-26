// a high personalScarcity score is bad
const PersonalScarcity = d => {
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
};

export default PersonalScarcity;
