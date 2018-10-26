// a high emotional health score is good
const EmotionalHealth = d => {
  let emotionalHealth = 0;

  let feelsCheerful = parseInt(d.Q33_Cheerful, 10);
  if (feelsCheerful === 99) feelsCheerful = 3;

  // the formula is the same for all these questions
  // range is 1 (always) to 6 (never)
  // 1 gives 2 points,
  // 2 gives 1 points,
  // 3 gives 0 points,
  // 4 gives -1 points,
  // 5 gives -2 points,
  // 6 gives -3 points,
  emotionalHealth += 3 - feelsCheerful;

  let feelsCalm = parseInt(d.Q33_Calm, 10);
  if (feelsCalm === 99) feelsCalm = 3;
  emotionalHealth += 3 - feelsCalm;

  let feelsActive = parseInt(d.Q33_Active, 10);
  if (feelsActive === 99) feelsActive = 3;
  emotionalHealth += 3 - feelsActive;

  let feelsRested = parseInt(d.Q33_Rested, 10);
  if (feelsRested === 99) feelsRested = 3;
  emotionalHealth += 3 - feelsRested;

  let feelsInterest = parseInt(d.Q33_Interest, 10);
  if (feelsInterest === 99) feelsInterest = 3;
  emotionalHealth += 3 - feelsInterest;

  return emotionalHealth;
};

export default EmotionalHealth;
