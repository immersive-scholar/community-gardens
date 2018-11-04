import {
  SET_TIME_MULTIPLIER,
  SET_QUANTITY_MULTIPLIER,
  SET_RANDOM_SEED,
  SET_DPR,
  SET_ANTI_ALIAS,
  SET_DEBUG
} from "constants/Constants";
import { TweenMax } from "gsap";
import GPU from "util/GPU";

const version = "0.1.2";

// 1. Derive values from query string if available
const queryString = require("query-string");
const location = window.location;

const parsed = queryString.parse(location.search);
let timeMultiplier = parseFloat(parsed.timeMultiplier) || 1;
let quantityMultiplier = parseFloat(parsed.quantityMultiplier) || 1;
let seed = parseFloat(parsed.seed) || Math.random();
let debug =
  parseFloat(parsed.debug) === 1 || window.location.hostname === "localhost";

// 2. Sniff GPU to derive default performance options
const gpu = new GPU();
const { tier, tierIndex, device } = gpu;
const { antiAlias, dpr } = gpu.config;

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

if (device.mobile) {
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

// override with query string
quantityMultiplier =
  parseFloat(parsed.quantityMultiplier) || quantityMultiplier;

// slow it down on large displays
const width = window.innerWidth;
if (width > 5200) {
  timeMultiplier = 0.3;
}

const initialState = {
  version,
  timeMultiplier,
  quantityMultiplier,
  seed,
  antiAlias,
  dpr,
  debug
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
    default:
      return state;
  }
};

// export const getSelection = state => state.node[state.selectedId];
