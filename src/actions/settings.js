import {
  SET_TIME_MULTIPLIER,
  SET_QUANTITY_MULTIPLIER
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

export default settings;
