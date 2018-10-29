import { SET_TIME_MULTIPLIER } from "constants/Constants";

const settings = {};

settings.setTimeMultiplier = timeMultiplier => ({
  type: SET_TIME_MULTIPLIER,
  payload: { data: { timeMultiplier } }
});

export default settings;
