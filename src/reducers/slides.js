import find from 'lodash/find';
import size from 'lodash/size';

import { FOCUS_SLIDE, NEXT_SLIDE, PREV_SLIDE } from 'constants/Constants';

// import AmbientDataSlide from "pages/Presentation/slides/AmbientDataSlide";
// import AnticipationSlide from "pages/Presentation/slides/AnticipationSlide";
// import CollaborateSlide from "pages/Presentation/slides/CollaborateSlide";
import ColorSlide from 'pages/Presentation/slides/ColorSlide';
import CommunityGardensTitleSlide from 'pages/Presentation/slides/CommunityGardensTitleSlide';
import DataDrivenSlide from 'pages/Presentation/slides/DataDrivenSlide';
import DefinitionTitleSlide from 'pages/Presentation/slides/DefinitionTitleSlide';
import EquationSlide from 'pages/Presentation/slides/EquationSlide';
import GenerativeArtSlide from 'pages/Presentation/slides/GenerativeArtSlide';
import GenerativeSlide from 'pages/Presentation/slides/GenerativeSlide';
import GoalsSlide from 'pages/Presentation/slides/GoalsSlide';
import HistorySlide from 'pages/Presentation/slides/HistorySlide';
import HistoryTitleSlide from 'pages/Presentation/slides/HistoryTitleSlide';
import InBrowserSlide from 'pages/Presentation/slides/InBrowserSlide';
import InspirationSlide from 'pages/Presentation/slides/InspirationSlide';
import IntroSlide from 'pages/Presentation/slides/IntroSlide';
import MeSlide from 'pages/Presentation/slides/MeSlide';
// import NinePointSixSlide from "pages/Presentation/slides/NinePointSixSlide";
import NoControlSlide from 'pages/Presentation/slides/NoControlSlide';
import PersonalHistoryTitleSlide from 'pages/Presentation/slides/PersonalHistoryTitleSlide';
import ProcessingSlide from 'pages/Presentation/slides/ProcessingSlide';
// import DemoSlide from 'pages/Presentation/slides/DemoSlide';
import SolomonsSealSlide from 'pages/Presentation/slides/SolomonsSealSlide';

const queryString = require('query-string');

let index = 0;
const node = {
	intro: { index: index++, id: 'intro', slideClass: IntroSlide },
	me: { index: index++, id: 'me', slideClass: MeSlide },
	generative: { index: index++, id: 'generative', slideClass: GenerativeSlide },
	definitionTitle: {
		index: index++,
		id: 'definitionTitle',
		slideClass: DefinitionTitleSlide,
	},
	noControl: { index: index++, id: 'noControl', slideClass: NoControlSlide },
	equation: {
		index: index++,
		id: 'equation',
		slideClass: EquationSlide,
	},
	historyTitle: {
		index: index++,
		id: 'historyTitle',
		slideClass: HistoryTitleSlide,
	},
	history: {
		index: index++,
		id: 'history',
		slideClass: HistorySlide,
	},
	processing: {
		index: index++,
		id: 'processing',
		slideClass: ProcessingSlide,
	},
	inspiration: {
		index: index++,
		id: 'inspiration',
		slideClass: InspirationSlide,
	},
	// anticipation: {
	//   index: index++,
	//   id: "anticipation",
	//   slideClass: AnticipationSlide,
	// },
	// collaborate: {
	//   index: index++,
	//   id: "collaborate",
	//   slideClass: CollaborateSlide,
	// },
	personalHistoryTitle: {
		index: index++,
		id: 'personalHistoryTitle',
		slideClass: PersonalHistoryTitleSlide,
	},
	generativeArt: {
		index: index++,
		id: 'generativeArt',
		slideClass: GenerativeArtSlide,
	},
	// processTitle: {
	//   index: index++,
	//   id: "processTitle",
	//   slideClass: DemoSlide,
	// },
	communityGardensTitle: {
		index: index++,
		id: 'communityGardensTitle',
		slideClass: CommunityGardensTitleSlide,
	},
	goals: {
		index: index++,
		id: 'goals',
		slideClass: GoalsSlide,
	},
	// ambientData: {
	//   index: index++,
	//   id: "ambientData",
	//   slideClass: AmbientDataSlide,
	// },
	dataDriven: {
		index: index++,
		id: 'dataDriven',
		slideClass: DataDrivenSlide,
	},
	inBrowser: {
		index: index++,
		id: 'inBrowser',
		slideClass: InBrowserSlide,
	},
	colorSlide: {
		index: index++,
		id: 'colorSlide',
		slideClass: ColorSlide,
	},
	// ninePointSix: {
	//   index: index++,
	//   id: "ninePointSix",
	//   slideClass: NinePointSixSlide,
	// },
	// intro2: { index: index++, id: "intro2", slideClass: IntroSlide },
	solomonsSeal: {
		index: index++,
		id: 'solomonsSeal',
		slideClass: SolomonsSealSlide,
	},
};

const location = window.location;
const parsed = queryString.parse(location.search);
const slide = parseInt(parsed.slide, 10) || 0;
let selectedID = find(node, n => n.index === slide).id;

const initialState = {
	selectedID,
	node,
};

const searchParams = new URLSearchParams(window.location.search);

export default (state = initialState, action) => {
	let currentSlide = state.node[state.selectedID];
	let currentIndex = currentSlide.index;
	let slideCount = size(state.node);

	switch (action.type) {
		case FOCUS_SLIDE:
			let id = action.payload.data.id;

			// push index to url
			let index = state.node[id].index;
			searchParams.set('slide', index);
			window.history.pushState(
				null,
				'',
				window.location.pathname + '?' + searchParams.toString()
			);

			return {
				...state,
				selectedID: id,
			};
		case NEXT_SLIDE:
			let nextIndex = Math.min(currentIndex + 1, slideCount - 1);
			let nextSlide = find(state.node, s => s.index === nextIndex);
			let nextID = nextSlide.id;

			// push index to url
			searchParams.set('slide', nextIndex);
			window.history.pushState(
				null,
				'',
				window.location.pathname + '?' + searchParams.toString()
			);

			return {
				...state,
				selectedID: nextID,
			};
		case PREV_SLIDE:
			let prevIndex = Math.max(currentIndex - 1, 0);
			let prevSlide = find(state.node, s => s.index === prevIndex);
			let prevID = prevSlide.id;

			// push index to url
			searchParams.set('slide', prevIndex);
			window.history.pushState(
				null,
				'',
				window.location.pathname + '?' + searchParams.toString()
			);

			return {
				...state,
				selectedID: prevID,
			};
		default:
			return state;
	}
};

// need a more explicit dictionary of urls to chapters.
// this is too easy to make a mistake with.
export const getSelectedSlide = state => {
	const key = state.selectedID;
	return state.node[key];
};
