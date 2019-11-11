import { combineReducers } from 'redux';

import chapters, * as fromChapters from 'reducers/chapters';
import settings from 'reducers/settings';
import slides, * as fromSlides from 'reducers/slides';
import theme, * as fromTheme from 'reducers/theme';
import version from 'reducers/version';

const appReducer = combineReducers({
	chapters,
	settings,
	slides,
	theme,
	version,
});

const rootReducer = (state, action) => {
	let newState = state;
	return appReducer(newState, action);
};

export default rootReducer;

export const getSelectedChapter = state =>
	fromChapters.getSelectedChapter(state.chapters);

export const getSelectedSlide = state =>
	fromSlides.getSelectedSlide(state.slides);

export const getPinkButton = state => fromTheme.getPinkButton(state);
