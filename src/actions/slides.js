import { FOCUS_SLIDE } from "constants/Constants";

const slides = {};

slides.focusSlide = id => ({
  type: FOCUS_SLIDE,
  payload: { data: { id } }
});
export default slides;
