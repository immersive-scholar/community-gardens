import { FOCUS_SLIDE, NEXT_SLIDE, PREV_SLIDE } from "constants/Constants";

const slides = {};

slides.focusSlide = id => ({
  type: FOCUS_SLIDE,
  payload: { data: { id } }
});

slides.next = id => ({
  type: NEXT_SLIDE
});

slides.prev = id => ({
  type: PREV_SLIDE
});
export default slides;
