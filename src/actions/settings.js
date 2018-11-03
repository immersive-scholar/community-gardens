import {
  SET_TIME_MULTIPLIER,
  SET_QUANTITY_MULTIPLIER,
  SET_RANDOM_SEED
} from "constants/Constants";

const settings = {};

settings.setTimeMultiplier = timeMultiplier => ({
  type: SET_TIME_MULTIPLIER,
  payload: { data: { timeMultiplier } }
});

settings.setQuantityMultiplier = quantityMultiplier => ({
  type: SET_QUANTITY_MULTIPLIER,
  payload: { data: { quantityMultiplier } }
});

settings.setRandomSeed = seed => ({
  type: SET_RANDOM_SEED,
  payload: { data: { seed } }
});

export default settings;
