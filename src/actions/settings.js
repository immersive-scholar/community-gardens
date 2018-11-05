import {
  SET_TIME_MULTIPLIER,
  SET_QUANTITY_MULTIPLIER,
  SET_RANDOM_SEED,
  SET_DPR,
  SET_ANTI_ALIAS,
  SET_DEBUG,
  SET_PLAYING
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

settings.setDPR = dpr => ({
  type: SET_DPR,
  payload: { data: { dpr } }
});

settings.setAntiAlias = antiAlias => ({
  type: SET_ANTI_ALIAS,
  payload: { data: { antiAlias } }
});

settings.setDebug = debug => ({
  type: SET_DEBUG,
  payload: { data: { debug } }
});

settings.setPlaying = playing => ({
  type: SET_PLAYING,
  payload: { data: { playing } }
});

export default settings;
