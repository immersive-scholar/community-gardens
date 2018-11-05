import { FOCUS_CHAPTER } from "constants/Constants";

const chapters = {};

chapters.focusChapter = id => ({
  type: FOCUS_CHAPTER,
  payload: { data: { id } }
});
export default chapters;
