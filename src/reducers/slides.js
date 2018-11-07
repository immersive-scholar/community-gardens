import { FOCUS_SLIDE } from "constants/Constants";
import addCollectionToNode from "util/AddCollectionToNode";

import IntroSlide from "pages/Presentation/slides/IntroSlide";
import GenerativeSlide from "pages/Presentation/slides/GenerativeSlide";

const initialState = {
  selectedId: "intro",
  node: {
    intro: { index: 0, id: "intro", slideClass: IntroSlide },
    generative: { index: 1, id: "generative", slideClass: GenerativeSlide }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FOCUS_SLIDE:
      let id = action.payload.data.id;
      return {
        ...state,
        selectedID: id
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
