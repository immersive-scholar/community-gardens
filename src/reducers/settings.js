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
  SET_OPTIONS_OPEN,
  IMMERSION,
  ART_WALL,
  COMMONS,
  VISUALIZATION
} from "constants/Constants";
import { TweenMax } from "gsap";
import GPU from "util/GPU";
import Microtiles from "util/Microtiles";

const queryString = require("query-string");

// 1. Default values
let timeMultiplier = 1;
let quantityMultiplier = 1;
let seed = Math.random();
let debug = 0;
let presentationMode = PRESENTATION_MODE_DEFAULT;
let playing = false;
let optionsOpen = false;
let show3DTitles = false;
let showControlBar = true;
let showImmersiveScholarLogo = false;
let showSidebar = false;
let sidebarWidth = 0;
let env, wallDisplay;

// 2. Sniff GPU to derive default performance options
const gpu = new GPU();
const { tierIndex, device } = gpu;
let { antiAlias, dpr } = gpu.config;

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

const location = window.location;
const parsed = queryString.parse(location.search);

switch (parsed.env) {
  case IMMERSION:
    wallDisplay = IMMERSION;
    break;
  case ART_WALL:
    wallDisplay = ART_WALL;
    break;
  case COMMONS:
    wallDisplay = COMMONS;
    break;
  case VISUALIZATION:
    wallDisplay = VISUALIZATION;
    break;
  default:
    break;
}

Microtiles.setEnvironment(wallDisplay);

if (wallDisplay) {
  timeMultiplier = 0.3;
  playing = true;
  presentationMode = PRESENTATION_MODE_EXPLORE;
  show3DTitles = true;
  showControlBar = false;
}

if (wallDisplay === IMMERSION) {
  showSidebar = true;
  sidebarWidth = Microtiles.getWidth(3);
  showImmersiveScholarLogo = true;
}

// 4. override with any query string params
quantityMultiplier =
  parseFloat(parsed.quantityMultiplier) || quantityMultiplier;

timeMultiplier = parseFloat(parsed.timeMultiplier) || timeMultiplier;
seed = parseFloat(parsed.seed) || seed;
debug = parseFloat(parsed.debug) === 1 || debug;
dpr = parseFloat(parsed.dpr) || dpr;
show3DTitles = parseFloat(parsed.show3DTitles) === 0 ? false : show3DTitles;
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
  presentationMode,
  show3DTitles,
  showControlBar,
  showImmersiveScholarLogo,
  showSidebar,
  sidebarWidth,
  env,
  wallDisplay
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
