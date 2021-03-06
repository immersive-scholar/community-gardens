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
	SET_INIT_COMPLETE,
	SET_OPTIONS_OPEN,
	SET_ABOUT_MODAL_OPEN,
	IMMERSION,
	ART_WALL,
	COMMONS,
	VISUALIZATION,
	GAMELAB,
} from 'constants/Constants';
import { TweenMax } from 'gsap';
import GPU from 'util/GPU';
import Microtiles from 'util/Microtiles';

const queryString = require('query-string');

// 1. Default values
let timeMultiplier = 1;
let quantityMultiplier = 1;
let seed = Math.random();
let debug = 0;
let presentationMode = PRESENTATION_MODE_DEFAULT;
let playing = false;
let optionsOpen = false;
let aboutModalOpen = false;
let show3DTitles = true;
let showControlBar = true;
let showImmersiveScholarLogo = false;
let showSidebar = false;
let showBurgerButton = true;
let sidebarWidth = 0;
let initComplete = false;
let env, wallDisplay;

// 2. Sniff GPU to derive default performance options
const gpu = new GPU();
const { tierIndex, device } = gpu;
let { antiAlias, dpr } = gpu.config;

// 3. Adjust values based on environment app is running within
// fast computer gets many more plants
switch (true) {
	case tierIndex === 3:
		quantityMultiplier = 7;
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
	show3DTitles = false;

	switch (true) {
		case tierIndex === 3:
			quantityMultiplier = 2;
			break;
		case tierIndex === 2:
			quantityMultiplier = 1.5;
			break;
		case tierIndex === 1:
			quantityMultiplier = 1;
			break;
		default:
			break;
	}
}

const location = window.location;
const parsed = queryString.parse(location.search);

switch (parsed.env) {
	case IMMERSION:
	case IMMERSION.toLowerCase():
		wallDisplay = IMMERSION;
		break;
	case ART_WALL:
	case ART_WALL.toLowerCase():
		wallDisplay = ART_WALL;
		break;
	case COMMONS:
	case COMMONS.toLowerCase():
		wallDisplay = COMMONS;
		break;
	case VISUALIZATION:
	case VISUALIZATION.toLowerCase():
		wallDisplay = VISUALIZATION;
		break;
	case GAMELAB:
	case GAMELAB.toLowerCase():
		wallDisplay = GAMELAB;
		break;
	default:
		break;
}

Microtiles.setEnvironment(wallDisplay);

if (wallDisplay) {
	timeMultiplier = 0.3;
	playing = true;
	presentationMode = PRESENTATION_MODE_EXPLORE;
	showControlBar = false;
	show3DTitles = true;
	showBurgerButton = false;
	quantityMultiplier = 8;
}

if (wallDisplay === IMMERSION) {
	showSidebar = true;
	sidebarWidth = Microtiles.getWidth(3);
	showImmersiveScholarLogo = true;
}

if (wallDisplay === COMMONS) {
	// COMMONS has an older CPU that sometimes takes too long to render text.
	show3DTitles = false;
}

if (wallDisplay === GAMELAB) {
	show3DTitles = true;
	showSidebar = false;
	// sidebarWidth = Microtiles.getWidth(3);
	// showImmersiveScholarLogo = true;
	showControlBar = true;
	showBurgerButton = true;
}

// 4. override with any query string params
quantityMultiplier =
	parseFloat(parsed.quantityMultiplier) || quantityMultiplier;

playing = parseFloat(parsed.playing) === 1 ? true : playing;
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
	aboutModalOpen,
	presentationMode,
	show3DTitles,
	showControlBar,
	showImmersiveScholarLogo,
	showSidebar,
	showBurgerButton,
	sidebarWidth,
	env,
	wallDisplay,
	initComplete,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TIME_MULTIPLIER:
			const { timeMultiplier } = action.payload.data;
			TweenMax.globalTimeScale(timeMultiplier);

			return {
				...state,
				timeMultiplier,
			};
		case SET_QUANTITY_MULTIPLIER:
			const { quantityMultiplier } = action.payload.data;

			return {
				...state,
				quantityMultiplier,
			};
		case SET_RANDOM_SEED:
			const { seed } = action.payload.data;

			return {
				...state,
				seed,
			};
		case SET_DPR:
			const { dpr } = action.payload.data;

			return {
				...state,
				dpr,
			};
		case SET_ANTI_ALIAS:
			const { antiAlias } = action.payload.data;

			return {
				...state,
				antiAlias,
			};
		case SET_DEBUG:
			const { debug } = action.payload.data;

			return {
				...state,
				debug,
			};
		case SET_PLAYING:
			const { playing } = action.payload.data;

			return {
				...state,
				playing,
			};
		case SET_INIT_COMPLETE:
			const { initComplete } = action.payload.data;

			return {
				...state,
				initComplete: initComplete,
			};
		case SET_OPTIONS_OPEN:
			const { optionsOpen } = action.payload.data;

			return {
				...state,
				optionsOpen,
			};
		case SET_ABOUT_MODAL_OPEN:
			const { aboutModalOpen } = action.payload.data;

			return {
				...state,
				aboutModalOpen,
			};
		default:
			return state;
	}
};

// export const getSelection = state => state.node[state.selectedId];
