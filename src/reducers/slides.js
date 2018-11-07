import find from "lodash/find";
import size from "lodash/size";

import { FOCUS_SLIDE, NEXT_SLIDE, PREV_SLIDE } from "constants/Constants";
import addCollectionToNode from "util/AddCollectionToNode";

import IntroSlide from "pages/Presentation/slides/IntroSlide";
import MeSlide from "pages/Presentation/slides/MeSlide";
import GenerativeSlide from "pages/Presentation/slides/GenerativeSlide";
import GenerativeSlide2 from "pages/Presentation/slides/GenerativeSlide2";

const initialState = {
  selectedID: "intro",
  node: {
    intro: { index: 0, id: "intro", slideClass: IntroSlide },
    me: { index: 1, id: "me", slideClass: MeSlide },
    generative: { index: 2, id: "generative", slideClass: GenerativeSlide },
    generative2: { index: 3, id: "generative2", slideClass: GenerativeSlide2 }
  }
};

export default (state = initialState, action) => {
  let currentSlide = state.node[state.selectedID];
  let currentIndex = currentSlide.index;
  let slideCount = size(state.node);

  switch (action.type) {
    case FOCUS_SLIDE:
      let id = action.payload.data.id;
      return {
        ...state,
        selectedID: id
      };
    case NEXT_SLIDE:
      let nextIndex = Math.min(currentIndex + 1, slideCount - 1);
      let nextSlide = find(state.node, s => s.index === nextIndex);
      let nextID = nextSlide.id;
      return {
        ...state,
        selectedID: nextID
      };
    case PREV_SLIDE:
      let prevIndex = Math.max(currentIndex - 1, 0);
      let prevSlide = find(state.node, s => s.index === prevIndex);
      let prevID = prevSlide.id;
      return {
        ...state,
        selectedID: prevID
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
