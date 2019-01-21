import {
  SET_TIME_MULTIPLIER,
  SET_QUANTITY_MULTIPLIER,
  SET_RANDOM_SEED,
  SET_DPR,
  SET_ANTI_ALIAS,
  SET_DEBUG,
  SET_PLAYING,
  SET_INIT_COMPLETE,
  SET_OPTIONS_OPEN,
  SET_ABOUT_MODAL_OPEN,
} from "constants/Constants";

const settings = {};

settings.setTimeMultiplier = timeMultiplier => ({
  type: SET_TIME_MULTIPLIER,
  payload: { data: { timeMultiplier } },
});

settings.setQuantityMultiplier = quantityMultiplier => ({
  type: SET_QUANTITY_MULTIPLIER,
  payload: { data: { quantityMultiplier } },
});

settings.setRandomSeed = seed => ({
  type: SET_RANDOM_SEED,
  payload: { data: { seed } },
});

settings.setDPR = dpr => ({
  type: SET_DPR,
  payload: { data: { dpr } },
});

settings.setAntiAlias = antiAlias => ({
  type: SET_ANTI_ALIAS,
  payload: { data: { antiAlias } },
});

settings.setDebug = debug => ({
  type: SET_DEBUG,
  payload: { data: { debug } },
});

settings.setPlaying = playing => ({
  type: SET_PLAYING,
  payload: { data: { playing } },
});

settings.setInitComplete = initComplete => ({
  type: SET_INIT_COMPLETE,
  payload: { data: { initComplete } },
});

settings.setOptionsOpen = optionsOpen => ({
  type: SET_OPTIONS_OPEN,
  payload: { data: { optionsOpen } },
});

settings.setAboutModalOpen = aboutModalOpen => ({
  type: SET_ABOUT_MODAL_OPEN,
  payload: { data: { aboutModalOpen } },
});

export default settings;
