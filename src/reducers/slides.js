import find from "lodash/find";
import size from "lodash/size";

import { FOCUS_SLIDE, NEXT_SLIDE, PREV_SLIDE } from "constants/Constants";

import IntroSlide from "pages/Presentation/slides/IntroSlide";
import MeSlide from "pages/Presentation/slides/MeSlide";
import NoControlSlide from "pages/Presentation/slides/NoControlSlide";
import GenerativeSlide from "pages/Presentation/slides/GenerativeSlide";
import HistorySlide from "pages/Presentation/slides/HistorySlide";
import ProcessingSlide from "pages/Presentation/slides/ProcessingSlide";
import InspirationSlide from "pages/Presentation/slides/InspirationSlide";
import GenerativeArtSlide from "pages/Presentation/slides/GenerativeArtSlide";
import EquationSlide from "pages/Presentation/slides/EquationSlide";
import AnticipationSlide from "pages/Presentation/slides/AnticipationSlide";
import CollaborateSlide from "pages/Presentation/slides/CollaborateSlide";
import DataDrivenSlide from "pages/Presentation/slides/DataDrivenSlide";
import NinePointSixSlide from "pages/Presentation/slides/NinePointSixSlide";
import ColorSlide from "pages/Presentation/slides/ColorSlide";
import AmbientDataSlide from "pages/Presentation/slides/AmbientDataSlide";
import SolomonsSealSlide from "pages/Presentation/slides/SolomonsSealSlide";

const queryString = require("query-string");

let index = 0;
const node = {
  intro: { index: index++, id: "intro", slideClass: IntroSlide },
  me: { index: index++, id: "me", slideClass: MeSlide },
  generative: { index: index++, id: "generative", slideClass: GenerativeSlide },
  noControl: { index: index++, id: "noControl", slideClass: NoControlSlide },
  equation: {
    index: index++,
    id: "equation",
    slideClass: EquationSlide,
  },
  history: {
    index: index++,
    id: "history",
    slideClass: HistorySlide,
  },
  processing: {
    index: index++,
    id: "processing",
    slideClass: ProcessingSlide,
  },
  inspiration: {
    index: index++,
    id: "inspiration",
    slideClass: InspirationSlide,
  },
  anticipation: {
    index: index++,
    id: "anticipation",
    slideClass: AnticipationSlide,
  },
  collaborate: {
    index: index++,
    id: "collaborate",
    slideClass: CollaborateSlide,
  },
  generativeArt: {
    index: index++,
    id: "generativeArt",
    slideClass: GenerativeArtSlide,
  },
  ambientData: {
    index: index++,
    id: "ambientData",
    slideClass: AmbientDataSlide,
  },
  dataDriven: {
    index: index++,
    id: "dataDriven",
    slideClass: DataDrivenSlide,
  },
  ninePointSix: {
    index: index++,
    id: "ninePointSix",
    slideClass: NinePointSixSlide,
  },
  intro2: { index: index++, id: "intro2", slideClass: IntroSlide },
  color: { index: index++, id: "color", slideClass: ColorSlide },
  solomonsSeal: {
    index: index++,
    id: "solomonsSeal",
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
      searchParams.set("slide", index);
      window.history.pushState(
        null,
        "",
        window.location.pathname + "?" + searchParams.toString()
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
      searchParams.set("slide", nextIndex);
      window.history.pushState(
        null,
        "",
        window.location.pathname + "?" + searchParams.toString()
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
      searchParams.set("slide", prevIndex);
      window.history.pushState(
        null,
        "",
        window.location.pathname + "?" + searchParams.toString()
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
