import {
  SET_TIME_MULTIPLIER,
  SET_QUANTITY_MULTIPLIER,
  SET_RANDOM_SEED,
  SET_DPR,
  SET_ANTI_ALIAS,
  SET_DEBUG,
  PRESENTATION_MODE_DEFAULT,
  PRESENTATION_MODE_EXPLORE,
  SET_PLAYING,
  SET_OPTIONS_OPEN
} from "constants/Constants";
import { TweenMax } from "gsap";
import GPU from "util/GPU";

const queryString = require("query-string");

// 1. Default values
const location = window.location;

let timeMultiplier = 1;
let quantityMultiplier = 1;
let seed = Math.random();
let debug = 0;
let presentationMode = PRESENTATION_MODE_DEFAULT;
let playing = false;
let optionsOpen = false;

// 2. Sniff GPU to derive default performance options
const gpu = new GPU();
const { tierIndex, device } = gpu;
const { antiAlias, dpr } = gpu.config;

const largeDisplay = window.innerWidth > 5200;
if (largeDisplay) {
  timeMultiplier = 0.3;
  presentationMode = PRESENTATION_MODE_EXPLORE;
  playing = true;
}

// 3. Adjust values based on environment app is running within
// fast computer gets many more plants
switch (true) {
  case tierIndex === 3:
    quantityMultiplier = 10;
    break;
  case tierIndex === 2:
    quantityMultiplier = 5;
    break;
  case tierIndex === 1:
    quantityMultiplier = 2;
    break;
  default:
    break;
}

// tierIndex is a little  misleading  on mobile.
// an ihpone 6 is rated 3, but so is a K5000
// downgrade quantityMultiplier for mobile devices.
if (device.mobile) {
  presentationMode = PRESENTATION_MODE_EXPLORE;
  switch (true) {
    case tierIndex === 3:
      quantityMultiplier = 2;
      break;
    case tierIndex === 2:
      quantityMultiplier = 1;
      break;
    case tierIndex === 1:
      quantityMultiplier = 0.5;
      break;
    default:
      break;
  }
}

// 4. override with any query string params
const parsed = queryString.parse(location.search);
quantityMultiplier =
  parseFloat(parsed.quantityMultiplier) || quantityMultiplier;

timeMultiplier = parseFloat(parsed.timeMultiplier) || timeMultiplier;
seed = parseFloat(parsed.seed) || seed;
debug = parseFloat(parsed.debug) === 1 || debug;
// debug = debug || window.location.hostname === "localhost";

const initialState = {
  timeMultiplier,
  quantityMultiplier,
  seed,
  antiAlias,
  dpr,
  debug,
  mobile: device.mobile,
  playing,
  optionsOpen,
  largeDisplay,
  presentationMode
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TIME_MULTIPLIER:
      const { timeMultiplier } = action.payload.data;
      TweenMax.globalTimeScale(timeMultiplier);

      return {
        ...state,
        timeMultiplier
      };
    case SET_QUANTITY_MULTIPLIER:
      const { quantityMultiplier } = action.payload.data;

      return {
        ...state,
        quantityMultiplier
      };
    case SET_RANDOM_SEED:
      const { seed } = action.payload.data;

      return {
        ...state,
        seed
      };
    case SET_DPR:
      const { dpr } = action.payload.data;

      return {
        ...state,
        dpr
      };
    case SET_ANTI_ALIAS:
      const { antiAlias } = action.payload.data;

      return {
        ...state,
        antiAlias
      };
    case SET_DEBUG:
      const { debug } = action.payload.data;

      return {
        ...state,
        debug
      };
    case SET_PLAYING:
      const { playing } = action.payload.data;

      return {
        ...state,
        playing
      };
    case SET_OPTIONS_OPEN:
      const { optionsOpen } = action.payload.data;

      return {
        ...state,
        optionsOpen
      };
    default:
      return state;
  }
};

// export const getSelection = state => state.node[state.selectedId];
